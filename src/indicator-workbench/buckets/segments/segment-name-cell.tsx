import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentNameCellContainer, SegmentPropInput} from './widgets';

export const SegmentNameCell = (props: { bucket: Bucket, segment: BucketSegment }) => {
	const {bucket, segment} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;

		segment.name = value;

		forceUpdate();
		fire(BucketEventTypes.SEGMENT_NAME_CHANGED, bucket, segment);
	};

	return <SegmentNameCellContainer>
		<SegmentPropInput value={segment.name ?? ''} onChange={onNameChange}/>
	</SegmentNameCellContainer>;
};