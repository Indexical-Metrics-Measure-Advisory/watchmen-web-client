import {NumericSegmentsHolder} from '@/services/data/tuples/bucket-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_ADD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {createNumericSegment} from '../utils';

export const SegmentAddButton = (props: { holder: NumericSegmentsHolder }) => {
	const {holder} = props;

	const {fire} = useBucketEventBus();

	const onFactorAddClicked = () => {
		const segment = createNumericSegment(holder);
		holder.segments.push(segment);
		fire(BucketEventTypes.NUMERIC_SEGMENT_ADDED, holder, segment);
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onFactorAddClicked}>
		<FontAwesomeIcon icon={ICON_ADD}/>
		<span>{Lang.INDICATOR_WORKBENCH.BUCKET.ADD_VALUE_SEGMENTS}</span>
	</DwarfButton>;
};