import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ReactNode, useEffect} from 'react';
import {v4} from 'uuid';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentRow} from './segment-row';
import {SegmentsTableBodyContainer} from './widgets';

export const SegmentsTableBody = <B extends Bucket, S extends BucketSegment>(props: {
	bucket: B;
	cells: (segment: S, index: number) => ReactNode;
	cellsWidth: string;
	canDelete?: (segment: S, index: number) => boolean;
}) => {
	const {bucket, cells, cellsWidth, canDelete} = props;

	const {on, off} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSegmentAdded = () => forceUpdate();
		const onSegmentSorted = () => forceUpdate();
		const onSegmentRemoved = () => forceUpdate();

		on(BucketEventTypes.SEGMENT_ADDED, onSegmentAdded);
		on(BucketEventTypes.SEGMENT_SORTED, onSegmentSorted);
		on(BucketEventTypes.SEGMENT_REMOVED, onSegmentRemoved);
		return () => {
			off(BucketEventTypes.SEGMENT_ADDED, onSegmentAdded);
			off(BucketEventTypes.SEGMENT_SORTED, onSegmentSorted);
			off(BucketEventTypes.SEGMENT_REMOVED, onSegmentRemoved);
		};
	}, [on, off, forceUpdate, bucket]);

	return <SegmentsTableBodyContainer>
		{(bucket.segments ?? []).map((segment, index) => {
			return <SegmentRow bucket={bucket} segment={segment as S}
			                   cells={(segment) => cells(segment, index)} cellsWidth={cellsWidth}
			                   canDelete={(segment) => canDelete == null ? true : canDelete(segment, index)}
			                   key={v4()}/>;
		})}
	</SegmentsTableBodyContainer>;
};