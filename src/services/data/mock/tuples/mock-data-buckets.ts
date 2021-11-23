import {
	BucketType,
	EnumMeasureBucket,
	NumericValueBucket,
	NumericValueMeasureBucket,
	RangeBucketValueIncluding
} from '../../tuples/bucket-types';
import {MeasureMethod} from '../../tuples/indicator-types';
import {getCurrentTime} from '../../utils';
import {MOCK_ENUM_CITY_ID} from './mock-enum';

export const BUCKET_FLOOR_ID = '1';
export const BUCKET_CITIES_ID = '2';
export const BUCKET_AMOUNT_ID = '3';
export const BUCKET_CITIES_ISLAND_ID = '4';

export const Floor: NumericValueMeasureBucket = {
	bucketId: BUCKET_FLOOR_ID,
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
	bucketId: BUCKET_CITIES_ID,
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
export const Amounts: NumericValueBucket = {
	bucketId: BUCKET_AMOUNT_ID,
	name: 'Amounts',
	type: BucketType.VALUE,
	include: RangeBucketValueIncluding.INCLUDE_MIN,
	segments: [
		{name: 'Small Order', value: {max: '10000'}},
		{name: 'Typical Order', value: {min: '10000', max: '100000'}},
		{name: 'VIP Order', value: {min: '100000'}}
	],
	description: '',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};
export const CitiesIsland: EnumMeasureBucket = {
	bucketId: BUCKET_CITIES_ISLAND_ID,
	name: 'Cities of Island or not',
	type: BucketType.ENUM_MEASURE,
	measure: MeasureMethod.ENUM,
	enumId: MOCK_ENUM_CITY_ID,
	segments: [
		{name: 'Island', value: ['005']},
		{name: 'Others', value: ['&others']}
	],
	description: 'Island and others',
	createTime: getCurrentTime(),
	lastModified: getCurrentTime()
};

export const DemoBuckets = [Floor, Cities, Amounts, CitiesIsland];
export const DemoQueryBuckets = DemoBuckets;