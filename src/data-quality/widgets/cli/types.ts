import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Dayjs} from 'dayjs';

/**
 * behaviour of command sender when command published to executor
 */
export enum CommandPublishedBehaviour {
	CLEAR_ALL = 'clear-all',
	CLEAR_ARGUMENT = 'clear-argument',
	KEEP = 'keep'
}
export interface Command {
	// label in command shortcut popup
	label: string;
	// icon in command shortcut popup
	icon?: IconProp;
	// command syntax
	command: string;
	// placeholder in command input when this command is the last one of picked commands queue
	// to remind user
	reminder?: string;
	// is standalone. true means picked commands and arguments will be cleared when this command is picked
	standalone: boolean;

	published: CommandPublishedBehaviour
}

export interface ExecutionCommandPart {
	command?: string;
	text?: string;
}

export type ExecutionCommand = Array<ExecutionCommandPart>;

export interface ExecutionContent {
	id: string;
	command: ExecutionCommand;
	time: Dayjs;
}