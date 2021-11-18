import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {ReactNode} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentNameCell} from './segment-name-cell';
import {SegmentButton, SegmentIndexLabel, SegmentRowContainer} from './widgets';

export const SegmentRow = <B extends Bucket, S extends BucketSegment>(props: {
	bucket: B;
	segment: S;
	cells: (segment: S) => ReactNode;
	cellsWidth: string;
	canDelete: (segment: S) => boolean;
}) => {
	const {bucket, segment, cells, cellsWidth, canDelete} = props;

	const {fire} = useBucketEventBus();

	const onDeleteClicked = () => {
		const index = bucket.segments.indexOf(segment);
		bucket.segments.splice(index, 1);
		fire(BucketEventTypes.SEGMENT_REMOVED, bucket, segment);
	};

	return <SegmentRowContainer cells={cellsWidth}>
		<SegmentIndexLabel>#{bucket.segments.indexOf(segment) + 1}</SegmentIndexLabel>
		<SegmentNameCell bucket={bucket} segment={segment}/>
		{cells(segment)}
		{canDelete(segment)
			? <SegmentButton ink={ButtonInk.DANGER} onClick={onDeleteClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</SegmentButton>
			: null}
	</SegmentRowContainer>;
};