import {Tuple} from './tuple-types';

export interface Tenant extends Tuple {
	tenantId: string;
	name: string;
}