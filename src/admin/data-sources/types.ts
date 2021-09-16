import {HoldByTuple} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {QueryTenantForHolder} from '@/services/tuples/query-tenant-types';

export interface HoldByDataSource extends HoldByTuple {
	tenants?: Array<QueryTenantForHolder>;
}