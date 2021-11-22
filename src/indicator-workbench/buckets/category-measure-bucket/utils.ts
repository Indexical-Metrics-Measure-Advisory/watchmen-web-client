import {CategorySegment, CategorySegmentsHolder, OtherCategorySegmentValue} from '@/services/data/tuples/bucket-types';
import {createCategorySegment} from '../utils';

export const create = (bucket: CategorySegmentsHolder) => {
	const segment = createCategorySegment(bucket);
	bucket.segments.push(segment);
	return segment;
};

export const sortSegments = (s1: CategorySegment, s2: CategorySegment): number => {
	if (s1.value.includes(OtherCategorySegmentValue)) {
		if (!s2.value.includes(OtherCategorySegmentValue)) {
			return 1;
		}
	} else if (s2.value.includes(OtherCategorySegmentValue)) {
		return -1;
	}
	return s1.name.localeCompare(s2.name, void 0, {sensitivity: 'base', caseFirst: 'upper', numeric: true});
};

export const sortSegmentValues = (segment: CategorySegment, compare: (value1: string, value2: string) => number): ((value1: string, value2: string) => number) => {
	return (v1, v2) => {
		if (v1 === OtherCategorySegmentValue) {
			if (v2 !== OtherCategorySegmentValue) {
				return 1;
			}
		} else if (v2 === OtherCategorySegmentValue) {
			return -1;
		}
		return compare(v1, v2);
	};
};