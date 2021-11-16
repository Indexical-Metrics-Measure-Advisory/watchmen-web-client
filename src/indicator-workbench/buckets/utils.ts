import {
	BucketType,
	NumericSegment,
	NumericSegmentsHolder,
	NumericValueBucket,
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

export const createNumericSegment = (holder: NumericSegmentsHolder): NumericSegment => {
	const segments = holder.segments;
	if (segments.length === 0) {
		return [null, null];
	} else {
		return [segments[segments.length - 1][1], null];
	}
};
