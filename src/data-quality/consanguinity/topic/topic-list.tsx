import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_ARGUMENT_LIST} from '../commands';
import {
	ExecutionCommandArgument,
	ExecutionCommandPrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable
} from '../../widgets/cli/widgets';
import {getTopicName} from '../../utils';
import {ExecutionDelegate} from '../../widgets/cli/execution-delegate';
import React, {useEffect, useState} from 'react';
import {DemoTopics} from '../../../services/mock/tuples/mock-data-topics';

export const isTopicListCommand = (content: ExecutionContent) => {
	const {command} = content;
	if (command.length < 2) {
		return false;
	}
	return command[1].text?.trim()?.toLowerCase() === CMD_ARGUMENT_LIST;
};

export const TopicList = (props: { content: ExecutionContent }) => {
	const {content} = props;

	const [result, setResult] = useState<any>();
	useEffect(() => {
		const computeResult = () => {
			return <ExecutionResultItemTable>
				{DemoTopics.map((topic, index) => {
					return <ExecutionResultClickableItem key={topic.topicId}>
						{index + 1}. {getTopicName(topic)}
					</ExecutionResultClickableItem>;
				})}
			</ExecutionResultItemTable>;
		};
		setResult(computeResult());
	}, [content]);

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandPrimary>/topic</ExecutionCommandPrimary>
		<ExecutionCommandArgument>list</ExecutionCommandArgument>
	</>} result={result}/>;
};