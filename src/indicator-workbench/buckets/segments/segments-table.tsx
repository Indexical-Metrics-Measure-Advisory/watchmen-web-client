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
	cells: (segment: S, index: number) => ReactNode;
	cellsWidth: string;
	createSegment: (bucket: B) => S;
	sortSegments?: (bucket: B) => void;
}) => {
	const {
		bucket,
		header, cells, cellsWidth,
		createSegment, sortSegments
	} = props;

	return <SegmentsTableContainer>
		<SegmentTableHeader cells={cellsWidth}>
			<SegmentTableHeaderLabel/>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.SEGMENT_NAME}</SegmentTableHeaderLabel>
			{header()}
			<SegmentTableHeaderLabel/>
		</SegmentTableHeader>
		<SegmentsTableBody bucket={bucket} cells={cells} cellsWidth={cellsWidth}/>
		<SegmentsTableFooter>
			<SegmentAddButton bucket={bucket} createSegment={createSegment}/>
			<SegmentSortButton bucket={bucket} sortSegments={sortSegments}/>
		</SegmentsTableFooter>
	</SegmentsTableContainer>;
};