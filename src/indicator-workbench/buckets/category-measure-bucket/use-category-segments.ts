import {
	Bucket,
	BucketSegment,
	CategorySegment,
	CategorySegmentsHolder,
	OtherCategorySegmentValue
} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEffect} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';

export const useCategorySegments = (holder: CategorySegmentsHolder) => {
	const {on, off} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSegmentAddedOrChangedOrRemoved = (bucket: Bucket, segment: BucketSegment) => {
			if (holder !== bucket) {
				return;
			}

			const categorySegment = segment as CategorySegment;

			if (categorySegment.value.length === 1 && categorySegment.value[0] === OtherCategorySegmentValue) {
				forceUpdate();
			}
		};
		on(BucketEventTypes.SEGMENT_ADDED, onSegmentAddedOrChangedOrRemoved);
		on(BucketEventTypes.SEGMENT_CHANGED, onSegmentAddedOrChangedOrRemoved);
		on(BucketEventTypes.SEGMENT_REMOVED, onSegmentAddedOrChangedOrRemoved);
		return () => {
			off(BucketEventTypes.SEGMENT_ADDED, onSegmentAddedOrChangedOrRemoved);
			off(BucketEventTypes.SEGMENT_CHANGED, onSegmentAddedOrChangedOrRemoved);
			off(BucketEventTypes.SEGMENT_REMOVED, onSegmentAddedOrChangedOrRemoved);
		};
	}, [on, off, holder, forceUpdate]);
};