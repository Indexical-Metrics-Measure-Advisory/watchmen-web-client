import {Command, ExecutionCommand} from '../types';

export enum CliEventTypes {
	SELECT_COMMAND = 'select-command',
	SEND_COMMAND = 'send-command',
	SUGGEST_COMMAND = 'suggest-command',

	COMMAND_SOLVABLE_CHANGED = 'command-solvable-changed',

	EXECUTE_COMMAND = 'execute-command',
	COMMAND_EXECUTED = 'command-executed',

	CLEAR_SCREEN = 'clear-screen',
}

export interface CliEventBus {
	fire(type: CliEventTypes.SELECT_COMMAND, command: Command): this;
	on(type: CliEventTypes.SELECT_COMMAND, listener: (command: Command) => void): this;
	off(type: CliEventTypes.SELECT_COMMAND, listener: (command: Command) => void): this;

	fire(type: CliEventTypes.SEND_COMMAND): this;
	on(type: CliEventTypes.SEND_COMMAND, listener: () => void): this;
	off(type: CliEventTypes.SEND_COMMAND, listener: () => void): this;

	fire(type: CliEventTypes.SUGGEST_COMMAND, commands: Array<Command>, argument?: string): this;
	on(type: CliEventTypes.SUGGEST_COMMAND, listener: (commands: Array<Command>, argument?: string) => void): this;
	off(type: CliEventTypes.SUGGEST_COMMAND, listener: (commands: Array<Command>, argument?: string) => void): this;

	fire(type: CliEventTypes.COMMAND_SOLVABLE_CHANGED, solvable: boolean): this;
	on(type: CliEventTypes.COMMAND_SOLVABLE_CHANGED, listener: (solvable: boolean) => void): this;
	off(type: CliEventTypes.COMMAND_SOLVABLE_CHANGED, listener: (solvable: boolean) => void): this;

	fire(type: CliEventTypes.EXECUTE_COMMAND, command: ExecutionCommand): this;
	on(type: CliEventTypes.EXECUTE_COMMAND, listener: (command: ExecutionCommand) => void): this;
	off(type: CliEventTypes.EXECUTE_COMMAND, listener: (command: ExecutionCommand) => void): this;

	fire(type: CliEventTypes.COMMAND_EXECUTED): this;
	on(type: CliEventTypes.COMMAND_EXECUTED, listener: () => void): this;
	off(type: CliEventTypes.COMMAND_EXECUTED, listener: () => void): this;

	fire(type: CliEventTypes.CLEAR_SCREEN): this;
	on(type: CliEventTypes.CLEAR_SCREEN, listener: () => void): this;
	off(type: CliEventTypes.CLEAR_SCREEN, listener: () => void): this;
}