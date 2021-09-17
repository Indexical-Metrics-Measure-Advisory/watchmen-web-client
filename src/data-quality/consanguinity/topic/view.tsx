import {TopicRelation} from '@/services/data/pipeline/pipeline-relations';
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
import {buildViewPipelineCommand} from '../pipeline/commands';
import {FactorName, FactorNotUsedReason, NotUsedFactorsGroup, PipelineGroup, PipelineName, TopicName} from './widgets';

const TopicView = (props: { relation: TopicRelation }) => {
	const {relation} = props;
	const {topic, trigger, readMe, writeMe, notUsedFactors} = relation;

	const {fire} = useCliEventBus();
	const onPipelineClicked = (pipeline: Pipeline) => () => {
		fire(CliEventTypes.SUGGEST_COMMAND, buildViewPipelineCommand(pipeline));
	};

	return <ExecutionResultItemTable>
		<TopicName>{getTopicName(topic)}</TopicName>
		<PipelineGroup>Trigger By Me</PipelineGroup>
		{trigger.map((pipeline) => {
			return <PipelineName onClick={onPipelineClicked(pipeline)} key={pipeline.pipelineId}>
				{getPipelineName(pipeline)}
			</PipelineName>;
		})}
		<PipelineGroup>Read Me</PipelineGroup>
		{readMe.map((pipeline) => {
			return <PipelineName onClick={onPipelineClicked(pipeline)} key={pipeline.pipelineId}>
				{getPipelineName(pipeline)}
			</PipelineName>;
		})}
		<PipelineGroup>Write Me</PipelineGroup>
		{writeMe.map((pipeline) => {
			return <PipelineName onClick={onPipelineClicked(pipeline)} key={pipeline.pipelineId}>
				{getPipelineName(pipeline)}
			</PipelineName>;
		})}
		<NotUsedFactorsGroup>Factors Not Used In Pipeline</NotUsedFactorsGroup>
		{notUsedFactors.map(({factor, written}) => {
			return <Fragment key={factor.factorId}>
				<FactorName>{factor.name || 'Noname Factor'}</FactorName>
				<FactorNotUsedReason>{written ? 'Never Read' : 'Never Read/Write'}</FactorNotUsedReason>
			</Fragment>;
		})}
	</ExecutionResultItemTable>;
};

export const TopicViewExecution = (props: { content: ExecutionContent }) => {
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
				let found: Topic | undefined = data.maps.topics[text]?.topic;
				if (!found) {
					found = data.topics.find(topic => topic.name.trim() === text);
				}
				if (!found) {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData>No matched topic found.</ExecutionResultNoData>
					</ExecutionResultItemTable>);
				} else {
					const relation = data.relations.topics[found.topicId];
					setResult(<TopicView relation={relation}/>);
				}
			} else {
				setResult(<ExecutionResultItemTable>
					<ExecutionResultNoData>No matched topic found.</ExecutionResultNoData>
				</ExecutionResultItemTable>);
			}
			fire(CliEventTypes.COMMAND_EXECUTED);
		};
	});
	useDataQualityCacheData({onDataRetrieved});

	return <ExecutionDelegate content={content}
	                          commandLine={<>
		                          <ExecutionCommandLinePrimary>/topic</ExecutionCommandLinePrimary>
		                          <ExecutionCommandLineArgument>view</ExecutionCommandLineArgument>
		                          <ExecutionCommandLineArgument>"{text}"</ExecutionCommandLineArgument>
	                          </>}
	                          result={result}/>;
};