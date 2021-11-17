import {NumericSegmentsHolder, NumericValueSegment} from '@/services/data/tuples/bucket-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {Segments} from '../segments';
import {SegmentTableHeaderLabel} from '../segments/widgets';
import {createNumericSegment} from '../utils';
import {SegmentValueCell} from './segment-value-cell';

export const NumericSegments = (props: { holder: NumericSegmentsHolder }) => {
	const {holder} = props;

	const create = (bucket: NumericSegmentsHolder) => createNumericSegment(bucket);
	const sort = (bucket: NumericSegmentsHolder) => {
		bucket.segments.sort(({value: s1}, {value: s2}) => {
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
	};

	const header = () => {
		return <>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.VALUE_SEGMENT_MIN_LABEL}</SegmentTableHeaderLabel>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.VALUE_SEGMENT_MAX_LABEL}</SegmentTableHeaderLabel>
		</>;
	};
	const cells = (segment: NumericValueSegment) => {
		return <>
			<SegmentValueCell holder={holder} segment={segment} index={0}/>
			<SegmentValueCell holder={holder} segment={segment} index={1}/>
		</>;
	};

	return <Segments bucket={holder} header={header} cells={cells} cellsWidth="150px 150px"
	                 createSegment={create} sortSegments={sort}/>;
};
