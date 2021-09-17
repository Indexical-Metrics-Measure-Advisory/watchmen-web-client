import {Topic} from '@/services/data/tuples/topic-types';
import {DataQualityCacheData} from '@/services/local-persist/types';
import React, {useState} from 'react';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {getTopicName} from '../../utils';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import {
	ExecutionCommandLineArgument,
	ExecutionCommandLinePrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {ExecutionContent} from '../../widgets/cli/types';
import {buildViewTopicCommand} from './commands';

export const TopicFindExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;
	const text = commands[1].command.trim();

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DataQualityCacheData) => {
			const onTopicClicked = (topic: Topic) => () => {
				fire(CliEventTypes.SUGGEST_COMMAND, buildViewTopicCommand(topic));
			};
			if (data) {
				// assume text is id first
				let found = data.topics.filter(topic => topic.topicId === text);
				if (found.length === 0) {
					const find = text.toLowerCase();
					found = data.topics.filter(topic => topic.name.toLowerCase().includes(find));
				}
				if (found.length === 0) {
					setResult(<ExecutionResultItemTable>
						<ExecutionResultNoData>No matched topic found.</ExecutionResultNoData>
					</ExecutionResultItemTable>);
				} else {
					setResult(<ExecutionResultItemTable>
						{found.map((topic, index) => {
							return <ExecutionResultClickableItem onClick={onTopicClicked(topic)}
							                                     key={topic.topicId}>
								{index + 1}. {getTopicName(topic)}
							</ExecutionResultClickableItem>;
						})}
					</ExecutionResultItemTable>);
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
		                          <ExecutionCommandLineArgument>"{text}"</ExecutionCommandLineArgument>
	                          </>}
	                          result={result}/>;
};