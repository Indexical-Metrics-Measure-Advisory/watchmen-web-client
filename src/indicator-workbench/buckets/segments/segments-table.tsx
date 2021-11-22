import {Bucket, BucketSegment} from '@/services/data/tuples/bucket-types';
import {Lang} from '@/widgets/langs';
import React, {ReactNode} from 'react';
import {SortType} from '../bucket-event-bus-types';
import {SegmentAddButton} from './segment-add-button';
import {SegmentSortButton} from './segment-sort-button';
import {SegmentsTableBody} from './segments-table-body';
import {SegmentsTableContainer, SegmentsTableFooter, SegmentTableHeader, SegmentTableHeaderLabel} from './widgets';

export const SegmentsTable = <B extends Bucket, S extends BucketSegment>(props: {
	bucket: B;
	header: ReactNode;
	cells: (segment: S, index: number) => ReactNode;
	cellsWidth: string;
	canDelete?: (segment: S, index: number) => boolean;
	createSegment: (bucket: B) => S;
	sortSegments?: (bucket: B) => SortType;
	extraButtons?: ReactNode;
}) => {
	const {
		bucket,
		header, cells, cellsWidth, canDelete,
		createSegment, sortSegments, extraButtons
	} = props;

	return <SegmentsTableContainer>
		<SegmentTableHeader cells={cellsWidth}>
			<SegmentTableHeaderLabel/>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.SEGMENT_NAME}</SegmentTableHeaderLabel>
			{header}
			<SegmentTableHeaderLabel/>
		</SegmentTableHeader>
		<SegmentsTableBody bucket={bucket} cells={cells} cellsWidth={cellsWidth} canDelete={canDelete}/>
		<SegmentsTableFooter>
			<SegmentAddButton bucket={bucket} createSegment={createSegment}/>
			{extraButtons}
			<SegmentSortButton bucket={bucket} sortSegments={sortSegments}/>
		</SegmentsTableFooter>
	</SegmentsTableContainer>;
};