import {ExecutionContent} from '../../widgets/cli/types';
import {CMD_PIPELINE} from '../commands';
import {isPipelineListCommand, PipelineList} from './pipeline-list';

const Commands = [
	{accept: isPipelineListCommand, painter: PipelineList}
];

export const isPipelineCommand = (content: ExecutionContent) => {
	const {command} = content;
	if (command.length < 1) {
		return false;
	}
	if (command[0].command !== CMD_PIPELINE) {
		return false;
	}

	return isPipelineListCommand(content);
};

export const PipelineCommand = (props: { content: ExecutionContent }) => {
	const {content} = props;

	const Command = Commands.find(({accept}) => accept(content))?.painter;

	if (Command) {
		return <Command content={content}/>;
	} else {
		return null;
	}
};