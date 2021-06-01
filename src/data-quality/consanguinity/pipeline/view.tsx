import {ExecutionContent} from '../../widgets/cli/types';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import React, {useState} from 'react';
import {DataQualityCacheData} from '../../../local-persist/types';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {
	ExecutionCommandLineArgument,
	ExecutionCommandLinePrimary,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import {Topic} from '../../../services/tuples/topic-types';
import {getPipelineName, getTopicName} from '../../utils';
import {
	ComputedParameter,
	Parameter,
	ParameterJoint,
	TopicFactorParameter
} from '../../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isExpressionParameter,
	isJointParameter,
	isTopicFactorParameter
} from '../../../services/tuples/parameter-utils';
import {
	isAlarmAction,
	isInsertRowAction,
	isMergeRowAction,
	isReadTopicAction,
	isWriteFactorAction,
	isWriteTopicAction
} from '../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {FactorName, PipelineName, TopicGroup, TopicName} from './widgets';
import {Factor} from '../../../services/tuples/factor-types';
import {buildViewTopicCommand} from '../topic/commands';

const findOnTopicFactorParameter = (parameter: TopicFactorParameter, result: { [key in string]: Array<string> }) => {
	let factors = result[parameter.topicId];
	if (!factors) {
		factors = [];
		result[parameter.topicId] = factors;
	}
	factors.push(parameter.factorId);
};
const findOnComputedParameter = (parameter: ComputedParameter, result: { [key in string]: Array<string> }) => {
	parameter.parameters.forEach(parameter => {
		if (parameter.conditional && parameter.on) {
			findOnCondition(parameter.on, result);
		}
		findOnParameter(parameter, result);
	});
};
const findOnParameter = (parameter: Parameter, result: { [key in string]: Array<string> }) => {
	if (!parameter) {
		return;
	}
	if (isTopicFactorParameter(parameter)) {
		findOnTopicFactorParameter(parameter, result);
	} else if (isComputedParameter(parameter)) {
		findOnComputedParameter(parameter, result);
	}
};
const findOnCondition = (condition: ParameterJoint, result: { [key in string]: Array<string> }) => {
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

const PipelineView = (props: { pipeline: Pipeline, topics: Array<Topic> }) => {
	const {pipeline, topics} = props;

	const {fire} = useCliEventBus();
	const onTopicClicked = (topic: Topic) => () => {
		fire(CliEventTypes.SUGGEST_COMMAND, buildViewTopicCommand(topic));
	};
	const topicMap: { [key in string]: Topic } = topics.reduce((map, topic) => {
		map[topic.topicId] = topic;
		return map;
	}, {} as { [key in string]: Topic });

	const triggerTopic = topicMap[pipeline.topicId];
	const triggerFactorIds: Array<string> = [];
	if (pipeline.conditional && pipeline.on) {
		findOnCondition(pipeline.on, {[pipeline.topicId]: triggerFactorIds});
	}

	const readFactorIds: { [key in string]: Array<string> } = {};
	const writeFactorIds: { [key in string]: Array<string> } = {};
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

	const triggerFactors = [...new Set([...triggerFactorIds, ...(readFactorIds[pipeline.topicId] || [])])];
	// noinspection DuplicatedCode
	const readFactors = Object.keys(readFactorIds).filter(topicId => topicId)
		.map(topicId => {
			const topic = topicMap[topicId];
			return {topic, factors: readFactorIds[topicId]};
		})
		.filter(({factors}) => factors && factors.length > 0)
		.sort((x1, x2) => {
			return getTopicName(x1.topic).toLowerCase().localeCompare(getTopicName(x2.topic));
		});
	// noinspection DuplicatedCode
	const writeFactors = Object.keys(writeFactorIds).filter(topicId => topicId)
		.map(topicId => {
			const topic = topicMap[topicId];
			return {topic, factors: writeFactorIds[topicId]};
		})
		.filter(({factors}) => factors && factors.length > 0)
		.sort((x1, x2) => {
			return getTopicName(x1.topic).toLowerCase().localeCompare(getTopicName(x2.topic));
		});

	const factorMap = [...new Set([triggerTopic.topicId, ...Object.keys(readFactorIds), ...Object.keys(writeFactorIds)])]
		.reduce((map, topicId) => {
			const topic = topicMap[topicId];
			if (topic) {
				topic.factors.forEach(factor => map[factor.factorId] = factor);
			}
			return map;
		}, {} as { [key in string]: Factor });

	return <ExecutionResultItemTable>
		<PipelineName>{getPipelineName(pipeline)}</PipelineName>
		<TopicGroup>Trigger By</TopicGroup>
		<TopicName onClick={onTopicClicked(triggerTopic)}>{getTopicName(triggerTopic)}</TopicName>
		{triggerFactors.map(factorId => <FactorName key={factorId}>
			{factorMap[factorId]?.name || 'Noname Factor'}
		</FactorName>)}
		<TopicGroup>Read From</TopicGroup>
		{readFactors.map(({topic, factors}) => {
			return <>
				<TopicName onClick={onTopicClicked(topic)}>{getTopicName(topic)}</TopicName>
				{factors.map(factorId => <FactorName key={factorId}>
					{factorMap[factorId]?.name || 'Noname Factor'}
				</FactorName>)}
			</>;
		})}
		<TopicGroup>Write To</TopicGroup>
		{writeFactors.map(({topic, factors}) => {
			return <>
				<TopicName onClick={onTopicClicked(topic)}>{getTopicName(topic)}</TopicName>
				{factors.map(factorId => <FactorName key={factorId}>
					{factorMap[factorId]?.name || 'Noname Factor'}
				</FactorName>)}
			</>;
		})}
	</ExecutionResultItemTable>;
};

export const PipelineViewExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;

	const [, , whichCmd] = commands;
	const text = whichCmd.command.trim();

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DataQualityCacheData) => {
			if (data) {
				// assume text is id first
				let found = data.pipelines.find(pipeline => pipeline.pipelineId === text);
				if (!found) {
					found = data.pipelines.find(pipeline => pipeline.name.trim() === text);
				}
				if (!found) {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData>No matched pipeline found.</ExecutionResultNoData>
					</ExecutionResultItemTable>);
				} else {
					setResult(<PipelineView pipeline={found} topics={data.topics}/>);
				}
			} else {
				setResult(<ExecutionResultItemTable>
					<ExecutionResultNoData>No matched pipeline found.</ExecutionResultNoData>
				</ExecutionResultItemTable>);
			}
			fire(CliEventTypes.COMMAND_EXECUTED);
		};
	});
	useDataQualityCacheData({onDataRetrieved});

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandLinePrimary>/pipeline</ExecutionCommandLinePrimary>
		<ExecutionCommandLineArgument>view</ExecutionCommandLineArgument>
		<ExecutionCommandLineArgument>"{text}"</ExecutionCommandLineArgument>
	</>} executeAt={content.time} result={result}/>;
};