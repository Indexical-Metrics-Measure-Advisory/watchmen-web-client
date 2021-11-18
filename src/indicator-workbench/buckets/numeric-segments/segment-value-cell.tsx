import {NumericSegmentsHolder, NumericValueSegment} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentPropInput} from '../segments/widgets';
import {SegmentValueCellContainer} from './widgets';

export const SegmentValueCell = (props: { holder: NumericSegmentsHolder, segment: NumericValueSegment, index: 0 | 1 }) => {
	const {holder, segment, index} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;

		index === 0 ? (segment.value.min = value) : (segment.value.max = value);
		forceUpdate();
		fire(BucketEventTypes.SEGMENT_CHANGED, holder, segment);
	};

	return <SegmentValueCellContainer>
		<SegmentPropInput value={(index === 0 ? segment.value.min : segment.value.max) ?? ''} onChange={onValueChange}/>
	</SegmentValueCellContainer>;
};