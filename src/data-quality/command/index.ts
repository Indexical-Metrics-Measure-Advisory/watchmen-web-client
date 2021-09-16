import {Command, CommandPublishedBehaviorType} from './types';

export const CMD_CLEAR = '/clear';
export const CMD_ARGUMENT_CLEAR_SCREEN = 'screen';

export const CMD_HELP = '/help';

export const CMD_ARGUMENT_LIST = 'list';
export const CMD_ARGUMENT_VIEW = 'view';
export const CMD_ARGUMENT_INSPECT = 'inspect';

const ClearScreenCmd: Command = {
	label: 'Screen',
	command: CMD_ARGUMENT_CLEAR_SCREEN,
	reminder: 'Press "enter" to clear screen.',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [],
	executableOnNoTrail: true
};
export const ClearCmd: Command = {
	label: 'Clear',
	command: CMD_CLEAR,
	reminder: 'Press "enter" to clear command line; or "screen" to clear screen',
	published: {type: CommandPublishedBehaviorType.CLEAR_ALL},
	trails: [ClearScreenCmd],
	executableOnNoTrail: true
};
export const isClearCommand = (command: Command) => command.command === CMD_CLEAR;
export const isClearScreenCommand = (command: Command) => command.command === CMD_ARGUMENT_CLEAR_SCREEN;

export const createHelpCmd = (commands: Array<Command>): Command => {
	return {
		label: 'Help',
		command: CMD_HELP,
		reminder: 'Press "enter" to show cli help; or command name to view specific',
		published: {type: CommandPublishedBehaviorType.KEEP},
		trails: commands,
		executableOnNoTrail: true
	};
};
export const isHelpCommand = (command: Command) => command.command === CMD_HELP;

export const isFirstCommand = (command: Command) => command.command.startsWith('/');
