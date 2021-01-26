import { Tuple } from './tuple-types';

export interface Report extends Tuple {
	reportId: string;
	name: string;
	description?: string;
	predefined: boolean;
}
