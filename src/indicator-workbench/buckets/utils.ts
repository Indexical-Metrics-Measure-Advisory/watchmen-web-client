import {BucketType, NumericValueBucket, RangeBucketValueIncluding} from '@/services/data/tuples/bucket-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';

export const createBucket = (): NumericValueBucket => {
	return {
		bucketId: generateUuid(),
		name: '',
		type: BucketType.VALUE,
		include: RangeBucketValueIncluding.INCLUDE_MIN,
		segments: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};
