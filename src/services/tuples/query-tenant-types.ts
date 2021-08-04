import {QueryTuple} from './tuple-types';
import {Tenant} from './tenant-types';

export interface QueryTenant extends Pick<Tenant, 'tenantId' | 'name' | 'createTime' | 'lastModified'>, QueryTuple {
}
