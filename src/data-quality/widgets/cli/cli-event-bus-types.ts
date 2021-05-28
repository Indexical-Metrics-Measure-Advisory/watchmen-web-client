import {Command, ExecutionCommand} from './types';

export enum CliEventTypes {
	EXECUTE_COMMAND = 'execute-command',
	COMMAND_EXECUTED = 'command-executed',
	SUGGEST_COMMAND = 'suggest-command'
}

export interface CliEventBus {
	fire(type: CliEventTypes.EXECUTE_COMMAND, command: ExecutionCommand): this;
	on(type: CliEventTypes.EXECUTE_COMMAND, listener: (command: ExecutionCommand) => void): this;
	off(type: CliEventTypes.EXECUTE_COMMAND, listener: (command: ExecutionCommand) => void): this;

	fire(type: CliEventTypes.COMMAND_EXECUTED): this;
	on(type: CliEventTypes.COMMAND_EXECUTED, listener: () => void): this;
	off(type: CliEventTypes.COMMAND_EXECUTED, listener: () => void): this;

	fire(type: CliEventTypes.SUGGEST_COMMAND, commands: Array<Command>, argument?: string): this;
	on(type: CliEventTypes.SUGGEST_COMMAND, listener: (commands: Array<Command>, argument?: string) => void): this;
	off(type: CliEventTypes.SUGGEST_COMMAND, listener: (commands: Array<Command>, argument?: string) => void): this;
}