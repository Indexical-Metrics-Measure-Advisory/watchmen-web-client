import {
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterJoint,
	TopicFactorParameter,
	VariablePredefineFunctions
} from '../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isConstantParameter,
	isExpressionParameter,
	isJointParameter,
	isTopicFactorParameter
} from '../../services/tuples/parameter-utils';
import {Pipeline} from '../../services/tuples/pipeline-types';
import {Topic, TopicType} from '../../services/tuples/topic-types';
import {
	DQCCacheData,
	FactorsMap,
	MappedTopic,
	NotUsedFactor,
	PipelineRelation,
	PipelineRelationMap,
	PipelinesMap,
	TopicRelationMap,
	TopicsMap
} from './types';
import {
	isAlarmAction,
	isCopyToMemoryAction,
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
const findOnComputedParameter = (parameter: ComputedParameter, result: UsedFactors, variables: Array<string>, triggerTopic?: Topic) => {
	parameter.parameters.forEach(parameter => {
		if (parameter.conditional && parameter.on) {
			findOnCondition(parameter.on, result, variables, triggerTopic);
		}
		findOnParameter(parameter, result, variables, triggerTopic);
	});
};
const findOnConstantParameter = (parameter: ConstantParameter, result: UsedFactors, variables: Array<string>, triggerTopic?: Topic) => {
	// variable in constant can be from trigger topic, variables in memory or predefined syntax
	// we collect factors of trigger topic only, therefore it is ignored when trigger topic not exists
	if (!triggerTopic) {
		return;
	}

	const statement = parameter.value?.trim() || '';
	if (statement.length === 0) {
		return;
	}

	const segments = statement.match(/([^{]*({[^}]+})?)/g);
	if (segments == null) {
		// no variable
		return;
	}
	const matchVariable = (variable: string) => {
		const index = variable.lastIndexOf('.&');
		if (index !== -1) {
			variable = variable.substring(0, index);
		}
		const factor = triggerTopic.factors.find(factor => factor.name === variable);
		if (factor) {
			let factors = result[triggerTopic.topicId];
			if (!factors) {
				factors = [];
				result[triggerTopic.topicId] = factors;
			}
			factors.push(factor.factorId);
		}
	};
	const findVariable = (variable: string) => {
		if (variable.startsWith(VariablePredefineFunctions.FROM_PREVIOUS_TRIGGER_DATA)) {
			matchVariable(variable.substring(VariablePredefineFunctions.FROM_PREVIOUS_TRIGGER_DATA.length + 1));
		} else if (variables.includes(variable)) {
			// from memory variables, ignored
		} else {
			// from trigger data
			matchVariable(variable);
		}
	};
	segments.filter(x => !!x).forEach(segment => {
		const braceStartIndex = segment.indexOf('{');
		if (braceStartIndex === -1) {
			// do nothing, no variable here
		} else if (braceStartIndex === 0) {
			findVariable(segment.substring(1, segment.length - 1).trim());
		} else {
			findVariable(segment.substring(braceStartIndex + 1, segment.length - 1).trim());
		}
	});
};

const findOnParameter = (parameter: Parameter, result: UsedFactors, variables: Array<string>, triggerTopic?: Topic) => {
	if (!parameter) {
		return;
	}
	if (isTopicFactorParameter(parameter)) {
		findOnTopicFactorParameter(parameter, result);
	} else if (isComputedParameter(parameter)) {
		findOnComputedParameter(parameter, result, variables, triggerTopic);
	} else if (isConstantParameter(parameter)) {
		findOnConstantParameter(parameter, result, variables, triggerTopic);
	}
};
const findOnCondition = (condition: ParameterJoint, result: UsedFactors, variables: Array<string>, triggerTopic?: Topic) => {
	if (!condition) {
		return;
	}
	condition.filters.forEach(sub => {
		if (isExpressionParameter(sub)) {
			const {left, right} = sub;
			findOnParameter(left, result, variables, triggerTopic);
			findOnParameter(right, result, variables, triggerTopic);
		} else if (isJointParameter(sub)) {
			findOnCondition(sub, result, variables, triggerTopic);
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
				// no variables are defined now
				findOnCondition(pipeline.on, {[pipeline.topicId]: triggerFactorIds}, []);
			}
		}
		return {topic: triggerTopic, factorIds: triggerFactorIds};
	};
	const trigger = findFactorsByTrigger(pipeline, topicsMap);

	const variables: Array<string> = [];
	const readFactorIds: UsedFactors = {};
	const writeFactorIds: UsedFactors = {};

	pipeline.stages.forEach(stage => {
		if (stage.conditional && stage.on) {
			findOnCondition(stage.on, readFactorIds, variables, trigger.topic);
		}
		stage.units.forEach(unit => {
			if (unit.conditional && unit.on) {
				findOnCondition(unit.on, readFactorIds, variables, trigger.topic);
			}
			unit.do.forEach(action => {
				if (isAlarmAction(action) && action.conditional && action.on) {
					findOnCondition(action.on, readFactorIds, variables, trigger.topic);
				} else if (isCopyToMemoryAction(action)) {
					findOnParameter(action.source, readFactorIds, variables, trigger.topic);
					variables.push(action.variableName?.trim() || '');
				} else if (isReadTopicAction(action)) {
					findOnCondition(action.by, readFactorIds, variables, trigger.topic);
					variables.push(action.variableName?.trim() || '');
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
							findOnParameter(mapping.source, readFactorIds, variables, trigger.topic);
						});
					} else if (isWriteFactorAction(action)) {
						findOnCondition(action.by, readFactorIds, variables, trigger.topic);
						findOnParameter(action.source, readFactorIds, variables, trigger.topic);
						writeFactorIds[topicId].push(action.factorId);
					} else if (isMergeRowAction(action)) {
						findOnCondition(action.by, readFactorIds, variables, trigger.topic);
						action.mapping.forEach(mapping => {
							writeFactorIds[topicId].push(mapping.factorId);
							findOnParameter(mapping.source, readFactorIds, variables, trigger.topic);
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
				return {topic, factors: [...new Set(factors[topicId].filter(x => !!x))]};
			})
			.filter(({topic, factors}) => topic != null && factors && factors.length > 0)
			.sort((x1, x2) => {
				return getTopicName(x1.topic.topic).toLowerCase().localeCompare(getTopicName(x2.topic.topic));
			}).map(item => {
				const topic = item.topic.topic;
				return {
					topic,
					factors: [...new Set(item.factors)].map(factorId => {
						const mappedTopic = topicsMap[topic.topicId] as MappedTopic;
						return mappedTopic?.factors[factorId];
					}).filter(x => !!x) as Array<Factor>
				};
			});
	};

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
		const part = {
			topic,
			trigger: Object.values(pipelineRelations)
				.filter(relation => relation.trigger?.topic === topic)
				.map(relation => relation.pipeline),
			readMe: Object.values(pipelineRelations)
				.filter(relation => relation.incoming.some(({topic: read}) => read === topic))
				.map(relation => relation.pipeline),
			writeMe: Object.values(pipelineRelations)
				.filter(relation => relation.outgoing.some(({topic: write}) => write === topic))
				.map(relation => relation.pipeline)
		};
		const alwaysWritten = topic.type === TopicType.RAW;
		relations[topic.topicId] = {
			...part,
			notUsedFactors: topic.factors.map(factor => {
				const read = part.trigger.some(pipeline => {
					const relation = pipelineRelations[pipeline.pipelineId];
					// in trigger or in incoming, means read
					return relation.trigger?.factors.includes(factor);
				}) || part.readMe.some(pipeline => {
					const relation = pipelineRelations[pipeline.pipelineId];
					// in trigger or in incoming, means read
					return relation.incoming.some(({factors}) => factors.includes(factor));
				});
				// always written or in outgoing
				const write = alwaysWritten || part.writeMe.some(pipeline => {
					const relation = pipelineRelations[pipeline.pipelineId];
					return relation.outgoing.some(({factors}) => factors.includes(factor));
				});

				return (!read) ? {factor, written: write} : null;
			}).filter(x => !!x).sort((x1, x2) => {
				return (x1?.factor.name.toLowerCase() || '').localeCompare(x2?.factor.name.toLowerCase() || '');
			}) as Array<NotUsedFactor>
		};
		return relations;
	}, {} as TopicRelationMap);

	return {
		pipelines, topics,
		maps: {pipelines: pipelinesMap, topics: topicsMap},
		relations: {pipelines: pipelineRelations, topics: topicsRelations}
	};
};
