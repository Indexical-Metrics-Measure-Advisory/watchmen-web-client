import { Tuple } from './tuple-types';

export interface Enum extends Tuple {
	enumId: string;
	name: string;
	description?: string;
	parentEnumId?: string;
}
