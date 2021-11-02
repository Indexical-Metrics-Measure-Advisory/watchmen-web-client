import {Tuple} from './tuple-types';

export type TenantId = string;

export interface Tenant extends Tuple {
	tenantId: TenantId;
	name: string;
}