import {
	BucketType,
	CategorySegment,
	CategorySegmentsHolder,
	NumericValueBucket,
	RangeBucketValueIncluding
} from '@/services/data/tuples/bucket-types';
import {defendNumericValueSegmentsHolder} from '@/services/data/tuples/bucket-utils';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';

export const createBucket = (): NumericValueBucket => {
	const bucket = {
		bucketId: generateUuid(),
		name: '',
		type: BucketType.VALUE,
		include: RangeBucketValueIncluding.INCLUDE_MIN,
		segments: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
	defendNumericValueSegmentsHolder(bucket);
	return bucket as NumericValueBucket;
};

// noinspection JSUnusedLocalSymbols
export const createCategorySegment = (holder: CategorySegmentsHolder): CategorySegment => {
	return {name: '', value: []};
};
