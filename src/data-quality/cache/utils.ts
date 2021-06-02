import {
	ComputedParameter,
	Parameter,
	ParameterJoint,
	TopicFactorParameter
} from '../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isExpressionParameter,
	isJointParameter,
	isTopicFactorParameter
} from '../../services/tuples/parameter-utils';
import {Pipeline} from '../../services/tuples/pipeline-types';
import {Topic} from '../../services/tuples/topic-types';
import {
	DQCCacheData,
	FactorsMap,
	MappedTopic,
	PipelineRelation,
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from './types';
import {
	isAlarmAction,
	isInsertRowAction,
	isMergeRowAction,
	isReadTopicAction,
	isWriteFactorAction,
	isWriteTopicAction
} from '../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {getTopicName} from '../utils';
import {Factor} from '../../services/tuples/factor-types';

// key is topicId, value is array of factorId
type UsedFactors = { [key in string]: Array<string> }

const findOnTopicFactorParameter = (parameter: TopicFactorParameter, result: UsedFactors) => {
	let factors = result[parameter.topicId];
	if (!factors) {
		factors = [];
		result[parameter.topicId] = factors;
	}
	factors.push(parameter.factorId);
};
const findOnComputedParameter = (parameter: ComputedParameter, result: UsedFactors) => {
	parameter.parameters.forEach(parameter => {
		if (parameter.conditional && parameter.on) {
			findOnCondition(parameter.on, result);
		}
		findOnParameter(parameter, result);
	});
};
const findOnParameter = (parameter: Parameter, result: UsedFactors) => {
	if (!parameter) {
		return;
	}
	if (isTopicFactorParameter(parameter)) {
		findOnTopicFactorParameter(parameter, result);
	} else if (isComputedParameter(parameter)) {
		findOnComputedParameter(parameter, result);
	}
};
const findOnCondition = (condition: ParameterJoint, result: UsedFactors) => {
	if (!condition) {
		return;
	}
	condition.filters.forEach(sub => {
		if (isExpressionParameter(sub)) {
			const {left, right} = sub;
			findOnParameter(left, result);
			findOnParameter(right, result);
		} else if (isJointParameter(sub)) {
			findOnCondition(sub, result);
		}
	});
};

const buildPipelineRelation = (options: { pipeline: Pipeline; topicsMap: TopicsMap }): PipelineRelation => {
	const {pipeline, topicsMap} = options;

	const findFactorsByTrigger = (pipeline: Pipeline, topicsMap: TopicsMap): { topic?: Topic; factorIds: Array<string> } => {
		const triggerFactorIds: Array<string> = [];
		const triggerTopic = topicsMap[pipeline.topicId]?.topic;
		if (triggerTopic) {
			// obviously, only when trigger topic existed
			if (pipeline.conditional && pipeline.on) {
				findOnCondition(pipeline.on, {[pipeline.topicId]: triggerFactorIds});
			}
		}
		return {topic: triggerTopic, factorIds: triggerFactorIds};
	};
	const trigger = findFactorsByTrigger(pipeline, topicsMap);

	const readFactorIds: UsedFactors = {};
	const writeFactorIds: UsedFactors = {};

	pipeline.stages.forEach(stage => {
		if (stage.conditional && stage.on) {
			findOnCondition(stage.on, readFactorIds);
		}
		stage.units.forEach(unit => {
			if (unit.conditional && unit.on) {
				findOnCondition(unit.on, readFactorIds);
			}
			unit.do.forEach(action => {
				if (isAlarmAction(action) && action.conditional && action.on) {
					findOnCondition(action.on, readFactorIds);
				} else if (isReadTopicAction(action)) {
					findOnCondition(action.by, readFactorIds);
				} else if (isWriteTopicAction(action)) {
					const topicId = action.topicId;
					let factors = writeFactorIds[topicId];
					if (!factors) {
						factors = [];
						writeFactorIds[topicId] = factors;
					}
					if (isInsertRowAction(action)) {
						action.mapping.forEach(mapping => {
							writeFactorIds[topicId].push(mapping.factorId);
							findOnParameter(mapping.source, readFactorIds);
						});
					} else if (isWriteFactorAction(action)) {
						findOnCondition(action.by, readFactorIds);
						findOnParameter(action.source, readFactorIds);
						writeFactorIds[topicId].push(action.factorId);
					} else if (isMergeRowAction(action)) {
						findOnCondition(action.by, readFactorIds);
						action.mapping.forEach(mapping => {
							writeFactorIds[topicId].push(mapping.factorId);
							findOnParameter(mapping.source, readFactorIds);
						});
					}
				}
			});
		});
	});

	const redressFactors = (factors: UsedFactors, topicFilter: (topicId: string) => boolean) => {
		return Object.keys(factors)
			.filter(topicFilter)
			.map(topicId => {
				const topic = topicsMap[topicId];
				return {topic, factors: factors[topicId]};
			})
			.filter(({factors}) => factors && factors.length > 0)
			.sort((x1, x2) => {
				return getTopicName(x1.topic.topic).toLowerCase().localeCompare(getTopicName(x2.topic.topic));
			}).map(item => {
				const topic = item.topic.topic;
				return {
					topic,
					factors: item.factors.map(factorId => {
						const mappedTopic = topicsMap[topic.topicId] as MappedTopic;
						return mappedTopic?.factors[factorId];
					}).filter(x => !!x) as Array<Factor>
				};
			});
	};

	console.log(pipeline.pipelineId)
	console.log('read', redressFactors(readFactorIds, topicId => !!(topicId && topicId != pipeline.topicId)));
	console.log('write', redressFactors(writeFactorIds, () => true));

	return {
		pipeline,
		trigger: !!trigger.topic ? {
			topic: trigger.topic,
			factors: [...new Set([...trigger.factorIds, ...(readFactorIds[pipeline.topicId] || [])])].map(factorId => {
				const mappedTopic = topicsMap[trigger.topic?.topicId || ''] as MappedTopic;
				return mappedTopic?.factors[factorId];
			}).filter(x => !!x) as Array<Factor>
		} : (void 0),
		// eslint-disable-next-line
		incoming: redressFactors(readFactorIds, topicId => !!(topicId && topicId != pipeline.topicId)),
		outgoing: redressFactors(writeFactorIds, () => true)
	};
};

const buildTopicsMap = (topics: Array<Topic>): TopicsMap => {
	return topics.reduce((map, topic) => {
		map[topic.topicId] = {
			topic,
			factors: topic.factors.reduce((map, factor) => {
				map[factor.factorId] = factor;
				return map;
			}, {} as FactorsMap)
		};
		return map;
	}, {} as TopicsMap);
};

const buildPipelinesMap = (pipelines: Array<Pipeline>): PipelinesMap => {
	return pipelines.reduce((map, pipeline) => {
		map[pipeline.pipelineId] = pipeline;
		return map;
	}, {} as PipelinesMap);
};

export const buildRelations = (options: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
}): DQCCacheData => {
	const {pipelines, topics} = options;

	const topicsMap = buildTopicsMap(topics);
	const pipelinesMap = buildPipelinesMap(pipelines);
	const pipelineRelations = pipelines.reduce((relations, pipeline) => {
		relations[pipeline.pipelineId] = buildPipelineRelation({pipeline, topicsMap});
		return relations;
	}, {} as PipelineRelationMap);
	const topicsRelations = topics.reduce((relations, topic) => {
		relations[topic.topicId] = {
			topic,
			trigger: Object.values(pipelineRelations)
				.filter(relation => relation.trigger?.topic === topic)
				.map(relation => relation.pipeline),
			readMe: Object.values(pipelineRelations)
				.filter(relation => relation.incoming.some(({topic: read}) => read === topic))
				.map(relation => relation.pipeline),
			writeMe: Object.values(pipelineRelations)
				.filter(relation => relation.outgoing.some(({topic: read}) => read === topic))
				.map(relation => relation.pipeline)
		};
		return relations;
	}, {} as TopicRelationMap);

	return {
		pipelines, topics,
		maps: {pipelines: pipelinesMap, topics: topicsMap},
		relations: {pipelines: pipelineRelations, topics: topicsRelations}
	};
};
