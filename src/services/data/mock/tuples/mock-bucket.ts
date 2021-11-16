import {DemoBuckets, DemoQueryBuckets} from '@/services/data/mock/tuples/mock-data-buckets';
import {TuplePage} from '@/services/data/query/tuple-page';
import {
	Bucket,
	BucketId,
	BucketType,
	NumericValueBucket,
	RangeBucketValueIncluding
} from '@/services/data/tuples/bucket-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';

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
		const {bucketId, name, type, description, createTime, lastModified} = found;
		bucket = {bucketId, name, type, description, createTime, lastModified};
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
