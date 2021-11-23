import {findAccount} from '../account';
import {Apis, get, page, post} from '../apis';
import {
	fetchMockBucket,
	fetchMockBucketsByIds,
	fetchMockBucketsByMethods,
	fetchMockBucketsForIndicatorValue,
	listMockBuckets,
	saveMockBucket
} from '../mock/tuples/mock-bucket';
import {TuplePage} from '../query/tuple-page';
import {isMockService} from '../utils';
import {Bucket, BucketId} from './bucket-types';
import {QueryBucket, QueryByBucketMethod} from './query-bucket-types';
import {isFakedUuid} from './utils';

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

export const fetchBucketsForIndicatorValue = async (search: string): Promise<Array<QueryBucket>> => {
	if (isMockService()) {
		return await fetchMockBucketsForIndicatorValue(search.trim());
	} else {
		return await get({api: Apis.BUCKET_LIST_FOR_INDICATOR_VALUE, search: {search}});
	}
};

export const fetchBucketsByIds = async (bucketIds: Array<BucketId>): Promise<Array<QueryBucket>> => {
	if (isMockService()) {
		return await fetchMockBucketsByIds(bucketIds);
	} else {
		return await get({api: Apis.BUCKET_LIST_BY_IDS, search: {bucketIds: bucketIds.join(',')}});
	}
};

export const fetchBucketsByMethods = async (methods: Array<QueryByBucketMethod>): Promise<Array<QueryBucket>> => {
	if (isMockService()) {
		return await fetchMockBucketsByMethods(methods);
	} else {
		return await post({api: Apis.BUCKET_LIST_BY_METHODS, data: {methods}});
	}
};
