import {ExecutionContent} from '../../widgets/cli/types';
import React from 'react';
import {CMD_PIPELINE} from './commands';
import {PipelineListExecution} from './list';
import {PipelineFindExecution} from './find';
import {PipelineViewExecution} from './view';
import {CMD_ARGUMENT_INSPECT, CMD_ARGUMENT_LIST, CMD_ARGUMENT_VIEW} from '../../command';
import {PipelineInspectExecution} from './inspect';

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