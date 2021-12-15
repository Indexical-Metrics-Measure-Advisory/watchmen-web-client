import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type NavigationId = string;

export interface NavigationIndicator {
	indicatorId: string;
}

export interface Navigation extends Tuple {
	navigationId: NavigationId;
	name: string;
	description?: string;
	indicators: Array<NavigationIndicator>;
	tenantId?: TenantId;
}
