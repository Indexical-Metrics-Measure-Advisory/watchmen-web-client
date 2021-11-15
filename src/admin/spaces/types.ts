import {QueryTopicForHolder} from '@/services/data/tuples/query-topic-types';
import {QueryUserGroupForHolder} from '@/services/data/tuples/query-user-group-types';
import {HoldByTuple} from '@/widgets/tuple-workbench/tuple-event-bus-types';

export interface HoldBySpace extends HoldByTuple {
	topics?: Array<QueryTopicForHolder>;
	groups?: Array<QueryUserGroupForHolder>;
}