import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import React, {ReactNode} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentNameCell} from './segment-name-cell';
import {SegmentButton, SegmentPropLabel, SegmentRowContainer} from './widgets';

export const SegmentRow = <B extends Bucket, S extends BucketSegment>(props: { bucket: B; segment: S; cells: (segment: S) => ReactNode; }) => {
	const {bucket, segment, cells} = props;

	const {fire} = useBucketEventBus();

	const onDeleteClicked = () => {
		const index = bucket.segments.indexOf(segment);
		bucket.segments.splice(index, 1);
		fire(BucketEventTypes.SEGMENT_REMOVED, bucket, segment);
	};

	return <SegmentRowContainer>
		<SegmentPropLabel><span>#{bucket.segments.indexOf(segment) + 1}</span></SegmentPropLabel>
		<SegmentNameCell bucket={bucket} segment={segment}/>
		{cells(segment)}
		<SegmentButton ink={ButtonInk.DANGER} onClick={onDeleteClicked}>
			{Lang.ACTIONS.DELETE}
		</SegmentButton>
	</SegmentRowContainer>;
};