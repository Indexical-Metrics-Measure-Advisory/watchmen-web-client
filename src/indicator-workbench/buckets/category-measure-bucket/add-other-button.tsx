import {CategorySegmentsHolder, OtherCategorySegmentValue} from '@/services/data/tuples/bucket-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_ADD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {createCategorySegment} from '../utils';

export const AddOtherButton = <B extends CategorySegmentsHolder>(props: { bucket: B }) => {
	const {bucket} = props;

	const {fire} = useBucketEventBus();

	const onAddClicked = () => {
		const segment = createCategorySegment(bucket);
		segment.value.push(OtherCategorySegmentValue);
		bucket.segments.push(segment);
		fire(BucketEventTypes.SEGMENT_ADDED, bucket, segment);
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onAddClicked}>
		<FontAwesomeIcon icon={ICON_ADD}/>
		<span>{Lang.INDICATOR_WORKBENCH.BUCKET.ADD_OTHER_CATEGORY}</span>
	</DwarfButton>;
};