import {ExecutionCommand} from './types';

export enum CliEventTypes {
	EXECUTE_COMMAND = 'execute-command',

	COMMAND_EXECUTED = 'command-executed'
}

export interface CliEventBus {
	fire(type: CliEventTypes.EXECUTE_COMMAND, command: ExecutionCommand): this;
	on(type: CliEventTypes.EXECUTE_COMMAND, listener: (command: ExecutionCommand) => void): this;
	off(type: CliEventTypes.EXECUTE_COMMAND, listener: (command: ExecutionCommand) => void): this;

	fire(type: CliEventTypes.COMMAND_EXECUTED): this;
	on(type: CliEventTypes.COMMAND_EXECUTED, listener: () => void): this;
	off(type: CliEventTypes.COMMAND_EXECUTED, listener: () => void): this;
}