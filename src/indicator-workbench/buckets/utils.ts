import {
	BucketType,
	CategorySegment,
	CategorySegmentsHolder,
	NumericSegmentsHolder,
	NumericValueBucket,
	NumericValueSegment,
	RangeBucketValueIncluding
} from '@/services/data/tuples/bucket-types';
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

export const createNumericSegment = (holder: NumericSegmentsHolder): NumericValueSegment => {
	const segments = holder.segments;
	if (segments.length === 0) {
		return {name: '', value: [null, null]};
	} else {
		return {name: '', value: [segments[segments.length - 1].value[1], null]};
	}
};

// noinspection JSUnusedLocalSymbols
export const createCategorySegment = (holder: CategorySegmentsHolder): CategorySegment => {
	return {name: '', value: []};
};
