import {QueryTuple} from '../tuples/tuple-types';
import {Page} from '../types';

export interface TuplePage<T extends QueryTuple> extends Page<T> {
}
