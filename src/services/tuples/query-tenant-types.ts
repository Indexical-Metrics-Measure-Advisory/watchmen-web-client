import {QueryTuple, QueryTupleForHolder} from './tuple-types';
import {Tenant} from './tenant-types';

export interface QueryTenant extends Pick<Tenant, 'tenantId' | 'name' | 'createTime' | 'lastModified'>, QueryTuple {
}

export interface QueryTenantForHolder extends Tenant, QueryTupleForHolder {
}