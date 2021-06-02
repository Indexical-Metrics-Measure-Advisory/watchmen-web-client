import {ExecutionContent} from '../../widgets/cli/types';
import {
	buildViewTopicCommand,
	CMD_ARGUMENT_AGGREGATE,
	CMD_ARGUMENT_BIZ,
	CMD_ARGUMENT_DISTINCT,
	CMD_ARGUMENT_RATIO,
	CMD_ARGUMENT_RAW,
	CMD_ARGUMENT_SYSTEM,
	CMD_ARGUMENT_TIME
} from './commands';
import {
	ExecutionCommandLineArgument,
	ExecutionCommandLinePrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/execution/widgets';
import {getTopicName} from '../../utils';
import {ExecutionDelegate} from '../../widgets/cli/execution/execution-delegate';
import React, {useState} from 'react';
import {DataQualityCacheData} from '../../../local-persist/types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {CliEventTypes} from '../../widgets/cli/events/cli-event-bus-types';
import {useCliEventBus} from '../../widgets/cli/events/cli-event-bus';
import {Topic, TopicKind, TopicType} from '../../../services/tuples/topic-types';
import {Command} from '../../command/types';

const buildFilter = (command: Command) => {
	if (!command) {
		return () => true;
	}

	switch (command.command) {
		case CMD_ARGUMENT_SYSTEM:
			return (topic: Topic) => topic.kind === TopicKind.SYSTEM;
		case CMD_ARGUMENT_BIZ:
			return (topic: Topic) => topic.kind === TopicKind.BUSINESS;
		case CMD_ARGUMENT_RAW:
			return (topic: Topic) => topic.type === TopicType.RAW;
		case CMD_ARGUMENT_DISTINCT:
			return (topic: Topic) => topic.type === TopicType.DISTINCT;
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

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandLinePrimary>/topic</ExecutionCommandLinePrimary>
		<ExecutionCommandLineArgument>list</ExecutionCommandLineArgument>
	</>} executeAt={content.time} result={result}/>;
};
export {TopicHelpCmd} from './help';