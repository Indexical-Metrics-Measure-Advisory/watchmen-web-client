import {NumericSegmentsHolder, NumericValueSegment} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentPropInput, SegmentValueCellContainer} from '../segments/widgets';

export const SegmentValueCell = (props: { holder: NumericSegmentsHolder, segment: NumericValueSegment, index: 0 | 1 }) => {
	const {holder, segment, index} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;

		try {
			if (value === '') {
				segment.value[index] = null;
			} else {
				segment.value[index] = Number(value);
			}
		} catch {
			// force set
			// @ts-ignore
			segment[index] = value;
		}

		forceUpdate();
		fire(BucketEventTypes.SEGMENT_CHANGED, holder, segment);
	};

	return <SegmentValueCellContainer>
		<SegmentPropInput value={segment.value[index] == null ? '' : `${segment.value[index]}`}
		                  onChange={onValueChange}/>
	</SegmentValueCellContainer>;
};