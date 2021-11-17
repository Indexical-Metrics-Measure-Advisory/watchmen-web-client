import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_ADD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';

export const SegmentAddButton = <B extends Bucket, S extends BucketSegment>(props: { bucket: B; createSegment: (bucket: B) => S; }) => {
	const {bucket, createSegment} = props;

	const {fire} = useBucketEventBus();

	const onFactorAddClicked = () => {
		const segment = createSegment(bucket);
		bucket.segments.push(segment);
		fire(BucketEventTypes.SEGMENT_ADDED, bucket, segment);
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onFactorAddClicked}>
		<FontAwesomeIcon icon={ICON_ADD}/>
		<span>{Lang.INDICATOR_WORKBENCH.BUCKET.ADD_SEGMENT}</span>
	</DwarfButton>;
};