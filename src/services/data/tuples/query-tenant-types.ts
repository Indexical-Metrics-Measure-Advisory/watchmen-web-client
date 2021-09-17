import {Tenant} from './tenant-types';
import {QueryTuple, QueryTupleForHolder} from './tuple-types';

export interface QueryTenant extends Pick<Tenant, 'tenantId' | 'name' | 'createTime' | 'lastModified'>, QueryTuple {
}

export interface QueryTenantForHolder extends Tenant, QueryTupleForHolder {
}