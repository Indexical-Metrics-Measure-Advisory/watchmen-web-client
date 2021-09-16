import {QueryEnumForHolder} from '@/services/tuples/query-enum-types';
import {HoldByTuple} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {QueryDataSourceForHolder} from '@/services/tuples/query-data-source-types';

export interface HoldByTopic extends HoldByTuple {
	enums?: Array<QueryEnumForHolder>;
	dataSources?: Array<QueryDataSourceForHolder>;
}