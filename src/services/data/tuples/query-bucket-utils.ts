import {MeasureMethod} from './indicator-types';
import {QueryByBucketMethod, QueryByEnumMethod, QueryByMeasureMethod} from './query-bucket-types';

export const isQueryByEnum = (method: QueryByBucketMethod): method is QueryByEnumMethod => {
	return method.method === MeasureMethod.ENUM;
};
export const isQueryByMeasure = (method: QueryByBucketMethod): method is QueryByMeasureMethod => {
	return method.method !== MeasureMethod.ENUM;
};