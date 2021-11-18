import {NumericSegmentsHolder, NumericValueSegment} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentPropInput} from '../segments/widgets';
import {SegmentValueCellContainer} from './widgets';

export const SegmentValueCell = (props: { holder: NumericSegmentsHolder, segment: NumericValueSegment, index: 0 | 1 }) => {
	const {holder, segment, index} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;

		try {
			if (value.trim() === '' || isNaN(value.trim() as any)) {
				index === 0 ? (delete segment.value.min) : (delete segment.value.max);
			} else {
				index === 0 ? (segment.value.min = Number(value.trim())) : (segment.value.max = Number(value.trim()));
			}
		} catch {
			// ignore
		}

		forceUpdate();
		fire(BucketEventTypes.SEGMENT_CHANGED, holder, segment);
	};

	const value = index === 0 ? segment.value.min : segment.value.max;

	return <SegmentValueCellContainer>
		<SegmentPropInput value={value ?? ''} onChange={onValueChange}/>
	</SegmentValueCellContainer>;
};