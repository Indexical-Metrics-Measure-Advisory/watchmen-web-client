import {NumericSegmentsHolder} from '@/services/data/tuples/bucket-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {SegmentAddButton} from './segment-add-button';
import {SegmentSortButton} from './segment-sort-button';
import {SegmentsTableBody} from './segments-table-body';
import {SegmentsTableContainer, SegmentsTableFooter, SegmentTableHeader, SegmentTableHeaderLabel} from './widgets';

export const SegmentsTable = (props: { holder: NumericSegmentsHolder }) => {
	const {holder} = props;

	return <SegmentsTableContainer>
		<SegmentTableHeader>
			<SegmentTableHeaderLabel/>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.SEGMENT_NAME}</SegmentTableHeaderLabel>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.VALUE_SEGMENT_MIN_LABEL}</SegmentTableHeaderLabel>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.VALUE_SEGMENT_MAX_LABEL}</SegmentTableHeaderLabel>
			<SegmentTableHeaderLabel/>
		</SegmentTableHeader>
		<SegmentsTableBody holder={holder}/>
		<SegmentsTableFooter>
			<SegmentAddButton holder={holder}/>
			<SegmentSortButton holder={holder}/>
		</SegmentsTableFooter>
	</SegmentsTableContainer>;
};