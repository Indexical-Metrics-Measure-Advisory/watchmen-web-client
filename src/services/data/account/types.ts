import {TenantId} from '../tuples/tenant-types';

export interface SessionAccount {
	name: string;
	admin: boolean;
	super: boolean;
	tenantId?: TenantId;
}