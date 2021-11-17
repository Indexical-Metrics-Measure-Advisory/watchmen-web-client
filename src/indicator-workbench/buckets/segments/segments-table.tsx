import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import {Lang} from '@/widgets/langs';
import React, {ReactNode} from 'react';
import {SegmentAddButton} from './segment-add-button';
import {SegmentSortButton} from './segment-sort-button';
import {SegmentsTableBody} from './segments-table-body';
import {SegmentsTableContainer, SegmentsTableFooter, SegmentTableHeader, SegmentTableHeaderLabel} from './widgets';

export const SegmentsTable = <B extends Bucket, S extends BucketSegment>(props: {
	bucket: B;
	header: () => ReactNode;
	bodyCells: (segment: S) => ReactNode;
	createSegment: (bucket: B) => S;
	sortSegments?: (bucket: B) => void;
}) => {
	const {
		bucket,
		header, bodyCells,
		createSegment, sortSegments
	} = props;

	return <SegmentsTableContainer>
		<SegmentTableHeader>
			<SegmentTableHeaderLabel/>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.SEGMENT_NAME}</SegmentTableHeaderLabel>
			{header()}
			<SegmentTableHeaderLabel/>
		</SegmentTableHeader>
		<SegmentsTableBody bucket={bucket} cells={bodyCells}/>
		<SegmentsTableFooter>
			<SegmentAddButton bucket={bucket} createSegment={createSegment}/>
			<SegmentSortButton bucket={bucket} sortSegments={sortSegments}/>
		</SegmentsTableFooter>
	</SegmentsTableContainer>;
};