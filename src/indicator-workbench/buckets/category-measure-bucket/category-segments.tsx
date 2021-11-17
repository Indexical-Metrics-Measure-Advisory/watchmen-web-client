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
	                 createSegment={create}/>;
};