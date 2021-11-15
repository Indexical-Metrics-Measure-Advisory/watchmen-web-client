import {QueryDataSourceForHolder} from '@/services/data/tuples/query-data-source-types';
import {QueryEnumForHolder} from '@/services/data/tuples/query-enum-types';
import {HoldByTuple} from '@/widgets/tuple-workbench/tuple-event-bus-types';

export interface HoldByTopic extends HoldByTuple {
	enums?: Array<QueryEnumForHolder>;
	dataSources?: Array<QueryDataSourceForHolder>;
}