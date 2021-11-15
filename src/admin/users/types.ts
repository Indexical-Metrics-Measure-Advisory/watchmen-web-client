import {QueryTenant} from '@/services/data/tuples/query-tenant-types';
import {QueryUserGroupForHolder} from '@/services/data/tuples/query-user-group-types';
import {HoldByTuple} from '@/widgets/tuple-workbench/tuple-event-bus-types';

export interface HoldByUser extends HoldByTuple {
	groups?: Array<QueryUserGroupForHolder>;
	tenants?: Array<QueryTenant>;
}