import {IconProp} from '@fortawesome/fontawesome-svg-core';

export interface CommandShortcut {
	label: string;
	command: string;
	icon?: IconProp;
	reminder?: string;
	standalone: boolean;
}

export interface ExecutionCommandPart {
	command?: string;
	text?: string;
}

export type ExecutionCommand = Array<ExecutionCommandPart>;

export interface ExecutionContent {
	id: string;
	command: ExecutionCommand;
}