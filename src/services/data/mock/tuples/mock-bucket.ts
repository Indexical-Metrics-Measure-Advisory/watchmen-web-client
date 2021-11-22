import {TuplePage} from '../../query/tuple-page';
import {Bucket, BucketId, BucketType, NumericValueBucket, RangeBucketValueIncluding} from '../../tuples/bucket-types';
import {QueryBucket} from '../../tuples/query-bucket-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';
import {DemoBuckets, DemoQueryBuckets} from './mock-data-buckets';

export const listMockBuckets = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryBucket>> => {
	const {pageNumber = 1, pageSize = 9} = options;
	return new Promise<TuplePage<QueryBucket>>((resolve) => {
		setTimeout(() => {
			resolve({
				data: DemoQueryBuckets,
				itemCount: DemoQueryBuckets.length,
				pageNumber,
				pageSize,
				pageCount: 3
			});
		}, 1000);
	});
};

export const fetchMockBucket = async (bucketId: BucketId): Promise<{ bucket: Bucket }> => {
	let bucket: Bucket;

	// eslint-disable-next-line
	const found = DemoBuckets.find(({bucketId: id}) => id == bucketId);
	if (found) {
		bucket = JSON.parse(JSON.stringify(found));
	} else {
		bucket = {
			bucketId,
			name: 'Mock Bucket',
			type: BucketType.VALUE,
			include: RangeBucketValueIncluding.INCLUDE_MIN,
			segments: [],
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		} as NumericValueBucket;
	}
	return {bucket};
};

let newBucketId = 10000;
export const saveMockBucket = async (bucket: Bucket): Promise<void> => {
	return new Promise<void>((resolve) => {
		if (isFakedUuid(bucket)) {
			bucket.bucketId = `${newBucketId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const fetchMockBucketsForIndicatorValue = async (search: string): Promise<Array<QueryBucket>> => {
	return new Promise<Array<QueryBucket>>((resolve) => {
		setTimeout(() => {
			const text = (search || '').toUpperCase();
			resolve(DemoQueryBuckets
				.filter(bucket => bucket.type === BucketType.VALUE)
				.filter(bucket => bucket.name.toUpperCase().includes(text))
			);
		}, 1000);
	});
};
