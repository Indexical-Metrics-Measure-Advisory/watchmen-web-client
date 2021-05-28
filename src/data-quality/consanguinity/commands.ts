import {Command, CommandPublishedBehaviour} from '../widgets/cli/types';
import {ICON_PIPELINE, ICON_TOPIC} from '../../basic-widgets/constants';

export const CMD_PIPELINE = '/pipeline';
export const CMD_PICK_PIPELINE = '/pick-pipeline';
export const CMD_TOPIC = '/topic';
export const CMD_PICK_TOPIC = '/pick-topic';

export const CMD_ARGUMENT_LIST = 'list';

export const CONSANGUINITY_COMMANDS: Array<Readonly<Command>> = [
	{
		label: 'Find Pipeline',
		command: CMD_PIPELINE,
		icon: ICON_PIPELINE,
		reminder: 'A text to match name, or "list" to list all',
		standalone: true,
		published: CommandPublishedBehaviour.CLEAR_ARGUMENT
	},
	{
		label: 'Find Topic',
		command: CMD_TOPIC,
		icon: ICON_TOPIC,
		reminder: 'A text to match name, or "list" to list all.',
		standalone: true,
		published: CommandPublishedBehaviour.CLEAR_ARGUMENT
	}
];

export const PICK_PIPELINE: Readonly<Command> = {
	label: 'Pick Pipeline',
	command: CMD_PICK_PIPELINE,
	reminder: 'Number of pipeline in list',
	standalone: true,
	published: CommandPublishedBehaviour.CLEAR_ARGUMENT
};

export const PICK_TOPIC: Readonly<Command> = {
	label: 'Pick Topic',
	command: CMD_PICK_TOPIC,
	reminder: 'Number of topic in list',
	standalone: true,
	published: CommandPublishedBehaviour.CLEAR_ARGUMENT
};