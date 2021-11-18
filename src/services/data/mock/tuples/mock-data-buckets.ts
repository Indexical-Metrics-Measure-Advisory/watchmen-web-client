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
		{name: 'Ground', value: {max: '1'}},
		{name: 'Low Floor', value: {min: '1', max: '7'}},
		{name: 'High Floor', value: {min: '7', max: '21'}},
		{name: 'Sky Floor', value: {min: '21'}}
	],
	description: 'Floor of apartment',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

export const DemoBuckets = [Floor];
export const DemoQueryBuckets = DemoBuckets;