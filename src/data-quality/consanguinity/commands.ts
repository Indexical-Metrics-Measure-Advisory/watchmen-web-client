import {Command, CommandPublishedBehaviour} from '../widgets/cli/types';
import {ICON_PIPELINE, ICON_TOPIC} from '../../basic-widgets/constants';
import {Pipeline} from '../../services/tuples/pipeline-types';
import {getPipelineName} from '../utils';

export const CMD_PIPELINE = '/pipeline';
export const CMD_TOPIC = '/topic';

export const CMD_ARGUMENT_LIST = 'list';

export const CONSANGUINITY_COMMANDS: Array<Readonly<Command>> = [
	{
		label: 'Find Pipeline',
		command: CMD_PIPELINE,
		icon: ICON_PIPELINE,
		reminder: 'A text to match name, or "list" to list all',
		standalone: true,
		published: CommandPublishedBehaviour.CLEAR_ARGUMENT,
		isValid: text => text.trim().length !== 0
	},
	{
		label: 'Find Topic',
		command: CMD_TOPIC,
		icon: ICON_TOPIC,
		reminder: 'A text to match name, or "list" to list all.',
		standalone: true,
		published: CommandPublishedBehaviour.CLEAR_ARGUMENT,
		isValid: text => text.trim().length !== 0
	}
];

export const WITH_PIPELINE: Readonly<Command> = {
	label: 'With Pipeline',
	command: CMD_PIPELINE,
	standalone: true,
	published: CommandPublishedBehaviour.CLEAR_ARGUMENT,
	isValid: text => text.trim().length !== 0
};

export const buildWithPipelineCommand = (pipeline: Pipeline): Array<Readonly<Command>> => {
	return [WITH_PIPELINE, {
		label: getPipelineName(pipeline),
		command: pipeline.pipelineId,
		reminder: '"list" for list all relations, or "list topic" for list related topics only, etc.',
		standalone: true,
		published: CommandPublishedBehaviour.CLEAR_ARGUMENT,
		isValid: text => text.trim().length !== 0
	}];
};

export const WITH_TOPIC: Readonly<Command> = {
	label: 'With Topic',
	command: CMD_TOPIC,
	standalone: true,
	published: CommandPublishedBehaviour.CLEAR_ARGUMENT,
	isValid: text => text.trim().length !== 0
};