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
import {buildViewTopicCommand} from './commands';

const TopicView = (props: { topic: Topic, pipelines: Array<Pipeline> }) => {
	// const {topic, topics} = props;
	//
	// const {fire} = useCliEventBus();
	// const onTopicClicked = (topic: Topic) => () => {
	// 	fire(CliEventTypes.SUGGEST_COMMAND, buildViewTopicCommand(topic));
	// };

	// return <ExecutionResultItemTable>
	// 	<PipelineName>{getTopicName(topic)}</PipelineName>
	// 	<TopicGroup>Trigger By</TopicGroup>
	// 	<TopicName onClick={onTopicClicked(triggerTopic)}>{getTopicName(triggerTopic)}</TopicName>
	// 	{triggerFactors.map(factorId => <FactorName key={factorId}>
	// 		{factorMap[factorId]?.name || 'Noname Factor'}
	// 	</FactorName>)}
	// 	<TopicGroup>Read From</TopicGroup>
	// 	{readFactors.map(({topic, factors}) => {
	// 		return <>
	// 			<TopicName onClick={onTopicClicked(topic)}>{getTopicName(topic)}</TopicName>
	// 			{factors.map(factorId => <FactorName key={factorId}>
	// 				{factorMap[factorId]?.name || 'Noname Factor'}
	// 			</FactorName>)}
	// 		</>;
	// 	})}
	// 	<TopicGroup>Write To</TopicGroup>
	// 	{writeFactors.map(({topic, factors}) => {
	// 		return <>
	// 			<TopicName onClick={onTopicClicked(topic)}>{getTopicName(topic)}</TopicName>
	// 			{factors.map(factorId => <FactorName key={factorId}>
	// 				{factorMap[factorId]?.name || 'Noname Factor'}
	// 			</FactorName>)}
	// 		</>;
	// 	})}
	// </ExecutionResultItemTable>;
};

export const TopicViewExecution = (props: { content: ExecutionContent }) => {
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
				let found = data.topics.find(topic => topic.topicId === text);
				if (!found) {
					found = data.topics.find(topic => topic.name.trim() === text);
				}
				if (!found) {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData>No matched topic found.</ExecutionResultNoData>
					</ExecutionResultItemTable>);
				} else {
					// setResult(<TopicView topic={found} pipelines={data.pipelines}/>);
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

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandLinePrimary>/topic</ExecutionCommandLinePrimary>
		<ExecutionCommandLineArgument>view</ExecutionCommandLineArgument>
		<ExecutionCommandLineArgument>"{text}"</ExecutionCommandLineArgument>
	</>} executeAt={content.time} result={result}/>;
};