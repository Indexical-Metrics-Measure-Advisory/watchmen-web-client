import {CategorySegment, CategorySegmentsHolder} from '@/services/data/tuples/bucket-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {Segments} from '../segments';
import {SegmentTableHeaderLabel} from '../segments/widgets';
import {createCategorySegment} from '../utils';
import {SegmentCategoryValuesCell} from './segment-category-values-cell';

export const CategorySegments = (props: { holder: CategorySegmentsHolder }) => {
	const {holder} = props;

	const create = (bucket: CategorySegmentsHolder) => createCategorySegment(bucket);
	const sort = (bucket: CategorySegmentsHolder) => {
		bucket.segments.sort((s1, s2) => {
			return s1.name.localeCompare(s2.name, void 0, {sensitivity: 'base', caseFirst: 'upper', numeric: true});
		}).forEach(segment => {
			segment.value.sort((v1, v2) => {
				return v1.localeCompare(v2, void 0, {sensitivity: 'base', caseFirst: 'upper', numeric: true});
			});
		});
	};
	const header = () => {
		return <>
			<SegmentTableHeaderLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.CATEGORY_SEGMENT_LABEL}</SegmentTableHeaderLabel>
		</>;
	};
	const cells = (segment: CategorySegment) => {
		return <>
			<SegmentCategoryValuesCell holder={holder} segment={segment}/>
		</>;
	};

	return <Segments bucket={holder} header={header} cells={cells} cellsWidth="500px"
	                 createSegment={create} sortSegments={sort}/>;
};