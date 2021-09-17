import React from 'react';
import {CMD_ARGUMENT_INSPECT, CMD_ARGUMENT_LIST, CMD_ARGUMENT_VIEW} from '../../command';
import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_PIPELINE} from './commands';
import {PipelineFindExecution} from './find';
import {PipelineInspectExecution} from './inspect';
import {PipelineListExecution} from './list';
import {PipelineViewExecution} from './view';

export const isPipelineExecution = (content: ExecutionContent) => {
	const {commands} = content;
	return commands.length > 1 && commands[0].command === CMD_PIPELINE;
};

export const PipelineExecution = (props: { content: ExecutionContent }) => {
	const {content} = props;
	const {commands} = content;

	const cmd = commands[1];

	if (cmd.command === CMD_ARGUMENT_LIST) {
		return <PipelineListExecution content={content}/>;
	} else if (cmd.command === CMD_ARGUMENT_VIEW) {
		return <PipelineViewExecution content={content}/>;
	} else if (cmd.command === CMD_ARGUMENT_INSPECT) {
		return <PipelineInspectExecution content={content}/>;
	} else {
		return <PipelineFindExecution content={content}/>;
	}
};