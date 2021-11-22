import {Bucket} from '@/services/data/tuples/bucket-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_SORT} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes, SortType} from '../bucket-event-bus-types';

export const SegmentSortButton = <B extends Bucket>(props: { bucket: B; sortSegments?: (bucket: B) => SortType; }) => {
	const {bucket, sortSegments} = props;

	const {fire} = useBucketEventBus();

	if (sortSegments == null) {
		return null;
	}

	const onSortClicked = () => {
		const sortType = sortSegments(bucket);
		fire(BucketEventTypes.SEGMENT_SORTED, bucket, sortType);
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onSortClicked}>
		<FontAwesomeIcon icon={ICON_SORT}/>
		<span>{Lang.INDICATOR_WORKBENCH.BUCKET.SORT_SEGMENTS}</span>
	</DwarfButton>;
};