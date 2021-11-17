import {NumericSegmentsHolder, NumericValueSegment} from '@/services/data/tuples/bucket-types';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentNameCell} from './segment-name-cell';
import {SegmentValueCell} from './segment-value-cell';
import {SegmentButton, SegmentPropLabel, SegmentRowContainer} from './widgets';

export const SegmentRow = (props: { holder: NumericSegmentsHolder, segment: NumericValueSegment }) => {
	const {holder, segment} = props;

	const {fire} = useBucketEventBus();

	const onDeleteClicked = () => {
		const index = holder.segments.indexOf(segment);
		holder.segments.splice(index, 1);
		fire(BucketEventTypes.NUMERIC_SEGMENT_REMOVED, holder, segment);
	};

	return <SegmentRowContainer>
		<SegmentPropLabel><span>#{holder.segments.indexOf(segment) + 1}</span></SegmentPropLabel>
		<SegmentNameCell bucket={holder} segment={segment}/>
		<SegmentValueCell holder={holder} segment={segment} index={0}/>
		<SegmentValueCell holder={holder} segment={segment} index={1}/>
		<SegmentButton ink={ButtonInk.DANGER} onClick={onDeleteClicked}>
			{Lang.ACTIONS.DELETE}
		</SegmentButton>
	</SegmentRowContainer>;
};