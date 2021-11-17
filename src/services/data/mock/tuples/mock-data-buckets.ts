import {BucketType, NumericValueMeasureBucket, RangeBucketValueIncluding} from '../../tuples/bucket-types';
import {MeasureMethod} from '../../tuples/indicator-types';
import {getCurrentTime} from '../../utils';

export const Floor: NumericValueMeasureBucket = {
	bucketId: '1',
	name: 'Floor',
	type: BucketType.VALUE_MEASURE,
	measure: MeasureMethod.FLOOR,
	include: RangeBucketValueIncluding.INCLUDE_MIN,
	segments: [
		{name: 'Ground', value: [void 0, 1]},
		{name: 'Low Floor', value: [1, 7]},
		{name: 'High Floor', value: [7, 21]},
		{name: 'Sky Floor', value: [21, void 0]}
	],
	description: 'Floor of apartment',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

export const DemoBuckets = [Floor];
export const DemoQueryBuckets = DemoBuckets;