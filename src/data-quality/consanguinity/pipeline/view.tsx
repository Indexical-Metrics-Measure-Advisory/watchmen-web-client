import {PipelineRelation} from '@/services/data/pipeline/pipeline-relations';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {Fragment, useState} from 'react';
import {DQCCacheData} from '../../cache/types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {getPipelineName, getTopicName} from '../../utils';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import {
	ExecutionCommandLineArgument,
	ExecutionCommandLinePrimary,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {ExecutionContent} from '../../widgets/cli/types';
import {buildViewTopicCommand} from '../topic/commands';
import {FactorName, PipelineName, TopicGroup, TopicName} from './widgets';

const PipelineView = (props: { relation: PipelineRelation }) => {
	const {relation} = props;
	const {pipeline, trigger, incoming, outgoing} = relation;

	const {fire} = useCliEventBus();
	const onTopicClicked = (topic: Topic) => () => {
		fire(CliEventTypes.SUGGEST_COMMAND, buildViewTopicCommand(topic));
	};

	// noinspection JSIncompatibleTypesComparison
	return <ExecutionResultItemTable>
		<PipelineName>{getPipelineName(pipeline)}</PipelineName>
		<TopicGroup>Trigger By</TopicGroup>
		{trigger != null
			? <>
				<TopicName onClick={onTopicClicked(trigger.topic)}>{getTopicName(trigger.topic)}</TopicName>
				{trigger.factors.map(({factorId, name}) => <FactorName key={factorId}>
					{name || 'Noname Factor'}
				</FactorName>)}
			</>
			: <TopicName>Not matched.</TopicName>}
		<TopicGroup>Read From</TopicGroup>
		{incoming.map(({topic, factors}) => {
			return <Fragment key={topic.topicId}>
				<TopicName onClick={onTopicClicked(topic)}>{getTopicName(topic)}</TopicName>
				{factors.map(({factorId, name}) => <FactorName key={factorId}>
					{name || 'Noname Factor'}
				</FactorName>)}
			</Fragment>;
		})}
		<TopicGroup>Write To</TopicGroup>
		{outgoing.map(({topic, factors}) => {
			return <Fragment key={topic.topicId}>
				<TopicName onClick={onTopicClicked(topic)}>{getTopicName(topic)}</TopicName>
				{factors.map(({factorId, name}) => <FactorName key={factorId}>
					{name || 'Noname Factor'}
				</FactorName>)}
			</Fragment>;
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
		return (data?: DQCCacheData) => {
			if (data) {
				// assume text is id first
				let found: Pipeline | undefined = data.maps.pipelines[text];
				if (!found) {
					found = data.pipelines.find(pipeline => pipeline.name.trim() === text);
				}
				if (!found) {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData>No matched pipeline found.</ExecutionResultNoData>
					</ExecutionResultItemTable>);
				} else {
					const relation = data.relations.pipelines[found.pipelineId];
					setResult(<PipelineView relation={relation}/>);
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

	return <ExecutionDelegate content={content}
	                          commandLine={<>
		                          <ExecutionCommandLinePrimary>/pipeline</ExecutionCommandLinePrimary>
		                          <ExecutionCommandLineArgument>view</ExecutionCommandLineArgument>
		                          <ExecutionCommandLineArgument>"{text}"</ExecutionCommandLineArgument>
	                          </>}
	                          result={result}/>;
};