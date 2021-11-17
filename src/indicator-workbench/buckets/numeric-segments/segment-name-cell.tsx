import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentPropInput, SegmentValueCellContainer} from './widgets';

export const SegmentNameCell = (props: { bucket: Bucket, segment: BucketSegment }) => {
	const {bucket, segment} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;

		segment.name = value;

		forceUpdate();
		fire(BucketEventTypes.SEGMENT_NAME_CHANGED, bucket, segment);
	};

	return <SegmentValueCellContainer>
		<SegmentPropInput value={segment.name ?? ''} onChange={onNameChange}/>
	</SegmentValueCellContainer>;
};