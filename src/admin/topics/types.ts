import {QueryEnumForHolder} from '../../services/tuples/query-enum-types';
import {HoldByTuple} from '../widgets/tuple-workbench/tuple-event-bus-types';

export interface HoldByTopic extends HoldByTuple {
    enums?: Array<QueryEnumForHolder>;
}