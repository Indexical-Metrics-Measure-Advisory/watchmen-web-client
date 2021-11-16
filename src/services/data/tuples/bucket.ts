import {findAccount} from '@/services/data/account';
import {Apis, get, page, post} from '@/services/data/apis';
import {fetchMockBucket, listMockBuckets, saveMockBucket} from '@/services/data/mock/tuples/mock-bucket';
import {TuplePage} from '@/services/data/query/tuple-page';
import {Bucket, BucketId} from '@/services/data/tuples/bucket-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {isMockService} from '@/services/data/utils';

export const listBuckets = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryBucket>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockBuckets(options);
	} else {
		return await page({api: Apis.BUCKET_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const fetchBucket = async (bucketId: BucketId): Promise<{ bucket: Bucket }> => {
	if (isMockService()) {
		return fetchMockBucket(bucketId);
	} else {
		const bucket = await get({api: Apis.BUCKET_GET, search: {bucketId}});
		return {bucket};
	}
};

export const saveBucket = async (bucket: Bucket): Promise<void> => {
	bucket.tenantId = findAccount()?.tenantId;
	if (isMockService()) {
		return saveMockBucket(bucket);
	} else if (isFakedUuid(bucket)) {
		const data = await post({api: Apis.BUCKET_CREATE, data: bucket});
		bucket.bucketId = data.bucketId;
		bucket.tenantId = data.tenantId;
		bucket.lastModified = data.lastModified;
	} else {
		const data = await post({api: Apis.BUCKET_SAVE, search: {bucketId: bucket.bucketId}, data: bucket});
		bucket.tenantId = data.tenantId;
		bucket.lastModified = data.lastModified;
	}
};
