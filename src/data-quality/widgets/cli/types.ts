import {Dayjs} from 'dayjs';
import {Command} from '../../command/types';

export interface MatchedCommand {
	command?: Command;
	// left text which
	// 1. cannot match command or
	// 2. not ends with a space (in not greedy mode)
	left: string;
}

export interface MatchedCommands {
	commands: Array<Command>;
	// left text which
	// 1. cannot match command or
	// 2. not ends with a space (in not greedy mode)
	left: string;
}

export interface ExecutionContent {
	id: string;
	commands: Array<Command>;
	time: Dayjs;
	locked: boolean;
}