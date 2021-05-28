import {ExecutionCommand} from '../widgets/cli/types';

export enum ConsanguinityEventTypes {
	EXECUTE_COMMAND = 'execute-command',

	COMMAND_EXECUTED = 'command-executed'
}

export interface ConsanguinityEventBus {
	fire(type: ConsanguinityEventTypes.EXECUTE_COMMAND, command: ExecutionCommand): this;
	on(type: ConsanguinityEventTypes.EXECUTE_COMMAND, listener: (command: ExecutionCommand) => void): this;
	off(type: ConsanguinityEventTypes.EXECUTE_COMMAND, listener: (command: ExecutionCommand) => void): this;

	fire(type: ConsanguinityEventTypes.COMMAND_EXECUTED): this;
	on(type: ConsanguinityEventTypes.COMMAND_EXECUTED, listener: () => void): this;
	off(type: ConsanguinityEventTypes.COMMAND_EXECUTED, listener: () => void): this;
}