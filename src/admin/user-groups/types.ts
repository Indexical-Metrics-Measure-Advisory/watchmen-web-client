import {QuerySpaceForHolder} from '../../services/tuples/query-space-types';
import {QueryUserForHolder} from '../../services/tuples/query-user-types';
import {HoldByTuple} from '../widgets/tuple-workbench/tuple-event-bus-types';

export interface HoldByUserGroup extends HoldByTuple {
    users?: Array<QueryUserForHolder>;
    spaces?: Array<QuerySpaceForHolder>
}