import {Topic, TopicType} from '@/services/data/tuples/topic-types';
import {
	isBusinessTopic,
	isDistinctTopic,
	isMetaTopic,
	isRawTopic,
	isSystemTopic
} from '@/services/data/tuples/topic-utils';
import {DataQualityCacheData} from '@/services/local-persist/types';
import React, {useState} from 'react';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {Command} from '../../command/types';
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
import {
	buildViewTopicCommand,
	CMD_ARGUMENT_AGGREGATE,
	CMD_ARGUMENT_BIZ,
	CMD_ARGUMENT_DISTINCT,
	CMD_ARGUMENT_META,
	CMD_ARGUMENT_RATIO,
	CMD_ARGUMENT_RAW,
	CMD_ARGUMENT_SYSTEM,
	CMD_ARGUMENT_TIME
} from './commands';

const buildFilter = (command: Command) => {
	if (!command) {
		return () => true;
	}

	switch (command.command) {
		case CMD_ARGUMENT_SYSTEM:
			return (topic: Topic) => isSystemTopic(topic);
		case CMD_ARGUMENT_BIZ:
			return (topic: Topic) => isBusinessTopic(topic);
		case CMD_ARGUMENT_RAW:
			return (topic: Topic) => isRawTopic(topic);
		case CMD_ARGUMENT_META:
			return (topic: Topic) => isMetaTopic(topic);
		case CMD_ARGUMENT_DISTINCT:
			return (topic: Topic) => isDistinctTopic(topic);
		case CMD_ARGUMENT_AGGREGATE:
			return (topic: Topic) => topic.type === TopicType.AGGREGATE;
		case CMD_ARGUMENT_TIME:
			return (topic: Topic) => topic.type === TopicType.TIME;
		case CMD_ARGUMENT_RATIO:
			return (topic: Topic) => topic.type === TopicType.RATIO;
		default:
			return () => true;
	}
};
export const TopicListExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;

	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DataQualityCacheData) => {
			const onTopicClicked = (topic: Topic) => () => {
				fire(CliEventTypes.SUGGEST_COMMAND, buildViewTopicCommand(topic));
			};
			if (data) {
				const filter1 = buildFilter(commands[2]);
				const filter2 = buildFilter(commands[3]);
				const found = data.topics.filter(topic => filter1(topic) && filter2(topic));

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
					<ExecutionResultNoData/>
				</ExecutionResultItemTable>);
			}
			fire(CliEventTypes.COMMAND_EXECUTED);
		};
	});
	useDataQualityCacheData({onDataRetrieved});

	return <ExecutionDelegate content={content}
	                          commandLine={<>
		                          <ExecutionCommandLinePrimary>/topic</ExecutionCommandLinePrimary>
		                          <ExecutionCommandLineArgument>list</ExecutionCommandLineArgument>
	                          </>}
	                          result={result}/>;
};