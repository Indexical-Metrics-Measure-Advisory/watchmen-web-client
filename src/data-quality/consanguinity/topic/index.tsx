import React from 'react';
import {CMD_ARGUMENT_LIST, CMD_ARGUMENT_VIEW} from '../../command';
import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_TOPIC} from './commands';
import {TopicFindExecution} from './find';
import {TopicListExecution} from './list';
import {TopicViewExecution} from './view';

export const isTopicExecution = (content: ExecutionContent) => {
	const {commands} = content;
	return commands.length > 1 && commands[0].command === CMD_TOPIC;
};

export const TopicExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;

	const cmd = commands[1];

	if (cmd.command === CMD_ARGUMENT_LIST) {
		return <TopicListExecution content={content}/>;
	} else if (cmd.command === CMD_ARGUMENT_VIEW) {
		return <TopicViewExecution content={content}/>;
	} else {
		return <TopicFindExecution content={content}/>;
	}
};