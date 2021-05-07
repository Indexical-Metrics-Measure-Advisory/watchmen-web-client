import {QueryTopicForHolder} from '../../services/tuples/query-topic-types';
import {QueryUserGroupForHolder} from '../../services/tuples/query-user-group-types';
import {HoldByTuple} from '../widgets/tuple-workbench/tuple-event-bus-types';

export interface HoldBySpace extends HoldByTuple {
    topics?: Array<QueryTopicForHolder>;
    groups?: Array<QueryUserGroupForHolder>
}