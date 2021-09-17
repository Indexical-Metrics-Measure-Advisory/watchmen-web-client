import {QueryTuple} from '../tuples/tuple-types';

export interface DataPage<T extends QueryTuple> {
	data: Array<T>;
	itemCount: number;
	pageNumber: number;
	pageSize: number;
	pageCount: number;
}
