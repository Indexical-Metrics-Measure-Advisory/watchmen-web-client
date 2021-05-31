import {Dayjs} from 'dayjs';
import {Command} from '../../command/types';

export interface ExecutionContent {
	id: string;
	commands: Array<Command>;
	time: Dayjs;
}