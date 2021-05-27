import {ExecutionContent} from '../widgets/cli/types';
import {CMD_ARGUMENT_LIST, CMD_TOPIC} from './commands';
import {
	ExecutionCommandArgument,
	ExecutionCommandPrimary,
	ExecutionResultClickableItem,
	ExecutionResultItemTable
} from '../widgets/cli/widgets';
import {getTopicName} from '../utils';
import {ExecutionDelegate} from '../widgets/cli/execution-delegate';
import React, {useEffect, useState} from 'react';
import {DemoTopics} from '../../services/mock/tuples/mock-data-topics';

const ignore = (content: ExecutionContent) => {
	if (content.command.length < 2) {
		return true;
	}
	if (content.command[0].command !== CMD_TOPIC) {
		return true;
	}
	if (content.command[1].text?.trim()?.toLowerCase() !== CMD_ARGUMENT_LIST) {
		return true;
	}
};

export const TopicList = (props: { content: ExecutionContent }) => {
	const {content} = props;

	const [result, setResult] = useState<any>();
	useEffect(() => {
		if (ignore(content)) {
			return;
		}
		const computeResult = () => {
			return <ExecutionResultItemTable>
				{DemoTopics.map(topic => {
					return <ExecutionResultClickableItem key={topic.topicId}>
						{getTopicName(topic)}
					</ExecutionResultClickableItem>;
				})}
			</ExecutionResultItemTable>;
		};
		setResult(computeResult());
	}, [content]);

	if (ignore(content)) {
		return null;
	}

	return <ExecutionDelegate commandLine={<>
		<ExecutionCommandPrimary>/topic</ExecutionCommandPrimary>
		<ExecutionCommandArgument>list</ExecutionCommandArgument>
	</>} result={result}/>;
};