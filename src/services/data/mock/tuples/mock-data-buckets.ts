import {
	BucketType,
	EnumMeasureBucket,
	NumericValueMeasureBucket,
	RangeBucketValueIncluding
} from '../../tuples/bucket-types';
import {MeasureMethod} from '../../tuples/indicator-types';
import {getCurrentTime} from '../../utils';
import {MOCK_ENUM_CITY_ID} from './mock-enum';

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
export const Cities: EnumMeasureBucket = {
	bucketId: '2',
	name: 'Cities',
	type: BucketType.ENUM_MEASURE,
	measure: MeasureMethod.ENUM,
	enumId: MOCK_ENUM_CITY_ID,
	segments: [
		{name: 'NY', value: ['001']},
		{name: 'Others', value: ['&others']}
	],
	description: 'New York and others',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

export const DemoBuckets = [Floor, Cities];
export const DemoQueryBuckets = DemoBuckets;