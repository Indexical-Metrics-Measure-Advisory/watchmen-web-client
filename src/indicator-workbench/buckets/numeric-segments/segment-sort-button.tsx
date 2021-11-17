import {NumericSegmentsHolder} from '@/services/data/tuples/bucket-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_SORT} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';

export const SegmentSortButton = (props: { holder: NumericSegmentsHolder }) => {
	const {holder} = props;

	const {fire} = useBucketEventBus();

	const onFactorAddClicked = () => {
		holder.segments.sort(({value: s1}, {value: s2}) => {
			if (s1[0] == null) {
				if (s2[0] != null) {
					return -1;
				} else if (s1[1] == null) {
					return -1;
				} else if (s2[1] == null) {
					return 1;
				} else {
					return s1[1] - s2[1];
				}
			} else if (s2[0] == null) {
				return 1;
			} else if (s1[0] !== s2[0]) {
				return s1[0] - s2[0];
			} else if (s1[1] == null) {
				return -1;
			} else if (s2[1] == null) {
				return 1;
			} else {
				return s1[1] - s2[1];
			}
		});
		fire(BucketEventTypes.NUMERIC_SEGMENT_SORTED, holder);
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onFactorAddClicked}>
		<FontAwesomeIcon icon={ICON_SORT}/>
		<span>{Lang.INDICATOR_WORKBENCH.BUCKET.SORT_VALUE_SEGMENTS}</span>
	</DwarfButton>;
};