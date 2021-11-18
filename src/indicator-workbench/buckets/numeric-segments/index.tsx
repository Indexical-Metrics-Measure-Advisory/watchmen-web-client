import {NumericSegmentsHolder, NumericValueSegment} from '@/services/data/tuples/bucket-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {Segments} from '../segments';
import {SegmentTableHeaderLabel} from '../segments/widgets';
import {SegmentValueCell} from './segment-value-cell';
import {NotAvailableCell} from './widgets';

export const NumericSegments = (props: { holder: NumericSegmentsHolder }) => {
	const {holder} = props;

	const create = (bucket: NumericSegmentsHolder) => {
		if (bucket.segments.length === 0) {
			// no segment, append
			const segment = {name: '', value: {max: 0}};
			bucket.segments.push(segment);
			return segment;
		} else if (bucket.segments[bucket.segments.length - 1].value.max == null) {
			// before last one
			const previous = bucket.segments.length === 1 ? null : bucket.segments[bucket.segments.length - 2];
			const segment = {name: '',
				value: {
					min: previous?.value.max ?? (void 0),
					max: bucket.segments[bucket.segments.length - 1].value.min ?? (void 0)
				}
			};
			bucket.segments.splice(bucket.segments.length - 1, 0, segment);
			return segment;
		} else {
			// append
			const segment = {name: '', value: {max: 0}};
			bucket.segments.push(segment);
			return segment;
		}
	};
	const sort = (bucket: NumericSegmentsHolder) => {
		bucket.segments.sort((
			{value: {min: min1, max: max1}},
			{value: {min: min2, max: max2}}
		) => {
			if (min1 == null) {
				return -1;
			} else if (min2 == null) {
				return 1;
			} else if (min1 !== min2) {
				return min1 - min2;
			} else if (max1 == null) {
				return 1;
			} else if (max2 == null) {
				return -1;
			} else {
				return max1 - max2;
			}
		});
	};

	const header = () => {
		return <>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.VALUE_SEGMENT_MIN_LABEL}</SegmentTableHeaderLabel>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.VALUE_SEGMENT_MAX_LABEL}</SegmentTableHeaderLabel>
		</>;
	};
	const cells = (segment: NumericValueSegment, index: number) => {
		if (index == 0) {
			return <>
				<NotAvailableCell>N/A</NotAvailableCell>
				<SegmentValueCell holder={holder} segment={segment} index={1}/>
			</>;
		} else if (index === holder.segments.length - 1) {
			return <>
				<SegmentValueCell holder={holder} segment={segment} index={0}/>
				<NotAvailableCell>N/A</NotAvailableCell>
			</>;
		} else {
			return <>
				<SegmentValueCell holder={holder} segment={segment} index={0}/>
				<SegmentValueCell holder={holder} segment={segment} index={1}/>
			</>;
		}
	};

	return <Segments bucket={holder} header={header} cells={cells} cellsWidth="150px 150px"
	                 createSegment={create} sortSegments={sort}/>;
};
