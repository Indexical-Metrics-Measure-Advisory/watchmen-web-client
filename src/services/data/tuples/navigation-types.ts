import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type NavigationId = string;

export interface Navigation extends Tuple {
	navigationId: NavigationId;
	name: string;
	description?: string;
	tenantId?: TenantId;
}
