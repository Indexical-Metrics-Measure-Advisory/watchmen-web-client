import {CategorySegment, CategorySegmentsHolder} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';

export const useCategorySegmentValue = (holder: CategorySegmentsHolder, segment: CategorySegment) => {
	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	return (value: string) => () => {
		const index = segment.value.indexOf(value);
		if (index !== -1) {
			segment.value.splice(index, 1);
			forceUpdate();
			fire(BucketEventTypes.CATEGORY_SEGMENT_VALUE_REMOVED, holder, segment, value);
			fire(BucketEventTypes.SEGMENT_CHANGED, holder, segment);
		}
	};
};