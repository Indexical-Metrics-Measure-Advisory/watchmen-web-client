import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_ARGUMENT_LIST, PICK_TOPIC} from '../commands';
import {
	ExecutionCommandArgument,
	ExecutionCommandPrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable,
	ExecutionResultNoData
} from '../../widgets/cli/widgets';
import {getTopicName} from '../../utils';
import {ExecutionDelegate} from '../../widgets/cli/execution-delegate';
import React, {useState} from 'react';
import {DataQualityCacheData} from '../../../local-persist/types';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {CliEventTypes} from '../../widgets/cli/cli-event-bus-types';
import {useCliEventBus} from '../../widgets/cli/cli-event-bus';

export const isTopicListCommand = (content: ExecutionContent) => {
	const {command} = content;
	if (command.length < 2) {
		return false;
	}
	return command[1].text?.trim()?.toLowerCase() === CMD_ARGUMENT_LIST;
};

// noinspection JSUnusedLocalSymbols
export const TopicList = (props: { content: ExecutionContent }) => {
	const {fire} = useCliEventBus();
	const [result, setResult] = useState<any>();
	const [onDataRetrieved] = useState(() => {
		return (data?: DataQualityCacheData) => {
			if (data) {
				setResult(<ExecutionResultItemTable>
					{data.topics.map((topic, index) => {
						return <ExecutionResultClickableItem key={topic.topicId}>
							{index + 1}. {getTopicName(topic)}
						</ExecutionResultClickableItem>;
					})}
				</ExecutionResultItemTable>);
			} else {
				setResult(<ExecutionResultItemTable>
					<ExecutionResultNoData/>
				</ExecutionResultItemTable>);
			}
			fire(CliEventTypes.COMMAND_EXECUTED);
			fire(CliEventTypes.SUGGEST_COMMAND, [PICK_TOPIC], '1');
		};
	});
	useDataQualityCacheData({onDataRetrieved});

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandPrimary>/topic</ExecutionCommandPrimary>
		<ExecutionCommandArgument>list</ExecutionCommandArgument>
	</>} result={result}/>;
};