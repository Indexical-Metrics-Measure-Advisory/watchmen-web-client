import {Command, CommandPublishedBehaviour} from '../widgets/cli/types';
import {ICON_PIPELINE, ICON_TOPIC} from '../../basic-widgets/constants';

export const CMD_PIPELINE = '/pipeline';
export const CMD_PIPELINE_LIST = 'list';
export const CMD_TOPIC = '/topic';

export const CONSANGUINITY_COMMANDS: Array<Command> = [
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
