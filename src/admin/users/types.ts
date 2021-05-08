import {QueryUserGroupForHolder} from '../../services/tuples/query-user-group-types';
import {HoldByTuple} from '../widgets/tuple-workbench/tuple-event-bus-types';

export interface HoldByUser extends HoldByTuple {
    groups?: Array<QueryUserGroupForHolder>;
}