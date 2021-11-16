import {NumericSegmentsHolder} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {v4} from 'uuid';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentRow} from './segment-row';
import {SegmentsTableBodyContainer} from './widgets';

export const SegmentsTableBody = (props: { holder: NumericSegmentsHolder }) => {
	const {holder} = props;

	const {on, off} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSegmentAdded = () => forceUpdate();
		const onSegmentSorted = () => forceUpdate();
		const onSegmentRemoved = () => forceUpdate();

		on(BucketEventTypes.NUMERIC_SEGMENT_ADDED, onSegmentAdded);
		on(BucketEventTypes.NUMERIC_SEGMENT_SORTED, onSegmentSorted);
		on(BucketEventTypes.NUMERIC_SEGMENT_REMOVED, onSegmentRemoved);
		return () => {
			off(BucketEventTypes.NUMERIC_SEGMENT_ADDED, onSegmentAdded);
			off(BucketEventTypes.NUMERIC_SEGMENT_SORTED, onSegmentSorted);
			off(BucketEventTypes.NUMERIC_SEGMENT_REMOVED, onSegmentRemoved);
		};
	}, [on, off, forceUpdate, holder]);

	return <SegmentsTableBodyContainer>
		{(holder.segments ?? []).map(segment => {
			return <SegmentRow holder={holder} segment={segment} key={v4()}/>;
		})}
	</SegmentsTableBodyContainer>;
};