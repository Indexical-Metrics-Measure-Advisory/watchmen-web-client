import {Bucket, EnumMeasureBucket} from '@/services/data/tuples/bucket-types';
import {useEffect, useState} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes, SortType} from '../bucket-event-bus-types';

export const useSortType = (bucket: EnumMeasureBucket) => {
	const {on, off} = useBucketEventBus();
	const [sortType, setSortType] = useState<SortType>(SortType.NAME);
	useEffect(() => {
		const onSegmentSorted = (aBucket: Bucket, toSortType: SortType) => {
			if (aBucket !== bucket || sortType === toSortType) {
				return;
			}
			setSortType(toSortType);
		};
		on(BucketEventTypes.SEGMENT_SORTED, onSegmentSorted);
		return () => {
			off(BucketEventTypes.SEGMENT_SORTED, onSegmentSorted);
		};
	}, [on, off, bucket, sortType]);

	return sortType;
};