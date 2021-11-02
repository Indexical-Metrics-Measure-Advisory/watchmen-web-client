import {TenantId} from '../tuples/tenant-types';

export interface Account {
	name?: string;
	credential?: string;
}

export interface LoginResponse {
	pass: boolean;
	admin: boolean;
	super: boolean;
	tenantId?: TenantId;
	error?: string;
}
