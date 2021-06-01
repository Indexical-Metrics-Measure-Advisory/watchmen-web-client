import {Command} from '../../../command/types';

export enum CliEventTypes {
	SELECT_COMMAND = 'select-command',
	SUGGEST_COMMAND = 'suggest-command',
	REMOVE_LAST_COMMAND = 'remove-last-command',
	CLEAR_COMMAND = 'clear-command',
	SEND_COMMAND = 'send-command',

	EXECUTE_COMMAND = 'execute-command',
	COMMAND_EXECUTED = 'command-executed',

	WORKBENCH_CHANGED = 'workbench-changed',
	CLEAR_SCREEN = 'clear-screen',
}

export interface CliEventBus {
	fire(type: CliEventTypes.SELECT_COMMAND, command: Command): this;
	on(type: CliEventTypes.SELECT_COMMAND, listener: (command: Command) => void): this;
	off(type: CliEventTypes.SELECT_COMMAND, listener: (command: Command) => void): this;

	fire(type: CliEventTypes.SUGGEST_COMMAND, commands: Array<Command>, argument?: string): this;
	on(type: CliEventTypes.SUGGEST_COMMAND, listener: (commands: Array<Command>, argument?: string) => void): this;
	off(type: CliEventTypes.SUGGEST_COMMAND, listener: (commands: Array<Command>, argument?: string) => void): this;

	fire(type: CliEventTypes.SEND_COMMAND): this;
	on(type: CliEventTypes.SEND_COMMAND, listener: () => void): this;
	off(type: CliEventTypes.SEND_COMMAND, listener: () => void): this;

	fire(type: CliEventTypes.REMOVE_LAST_COMMAND): this;
	on(type: CliEventTypes.REMOVE_LAST_COMMAND, listener: () => void): this;
	off(type: CliEventTypes.REMOVE_LAST_COMMAND, listener: () => void): this;

	fire(type: CliEventTypes.CLEAR_COMMAND): this;
	on(type: CliEventTypes.CLEAR_COMMAND, listener: () => void): this;
	off(type: CliEventTypes.CLEAR_COMMAND, listener: () => void): this;

	fire(type: CliEventTypes.EXECUTE_COMMAND, commands: Array<Command>, argument?: string): this;
	on(type: CliEventTypes.EXECUTE_COMMAND, listener: (commands: Array<Command>, argument?: string) => void): this;
	off(type: CliEventTypes.EXECUTE_COMMAND, listener: (commands: Array<Command>, argument?: string) => void): this;

	fire(type: CliEventTypes.COMMAND_EXECUTED): this;
	on(type: CliEventTypes.COMMAND_EXECUTED, listener: () => void): this;
	off(type: CliEventTypes.COMMAND_EXECUTED, listener: () => void): this;

	fire(type: CliEventTypes.WORKBENCH_CHANGED, commands: Array<Command>, argument?: string): this;
	on(type: CliEventTypes.WORKBENCH_CHANGED, listener: (commands: Array<Command>, argument?: string) => void): this;
	off(type: CliEventTypes.WORKBENCH_CHANGED, listener: (commands: Array<Command>, argument?: string) => void): this;

	fire(type: CliEventTypes.CLEAR_SCREEN): this;
	on(type: CliEventTypes.CLEAR_SCREEN, listener: () => void): this;
	off(type: CliEventTypes.CLEAR_SCREEN, listener: () => void): this;
}