import {useCategorySegments} from '@/indicator-workbench/buckets/category-measure-bucket/use-category-segments';
import {CategorySegmentsHeader} from '@/indicator-workbench/buckets/category-measure-bucket/widgets';
import {CategorySegment, CategorySegmentsHolder, OtherCategorySegmentValue} from '@/services/data/tuples/bucket-types';
import React from 'react';
import {Segments} from '../segments';
import {AddOtherButton} from './add-other-button';
import {SegmentCategoryValuesCell} from './segment-category-values-cell';
import {create, sortSegments, sortSegmentValues} from './utils';

export const CategorySegments = (props: { holder: CategorySegmentsHolder }) => {
	const {holder} = props;

	useCategorySegments(holder);

	const sort = (bucket: CategorySegmentsHolder) => {
		bucket.segments.sort(sortSegments).forEach(segment => {
			segment.value.sort(sortSegmentValues(segment, (v1, v2) => {
				return v1.localeCompare(v2, void 0, {sensitivity: 'base', caseFirst: 'upper', numeric: true});
			}));
		});
	};
	const cells = (segment: CategorySegment) => {
		return <>
			<SegmentCategoryValuesCell holder={holder} segment={segment}/>
		</>;
	};

	const hasOthers = holder.segments.some(segment => segment.value.length === 1 && segment.value[0] === OtherCategorySegmentValue);

	return <Segments bucket={holder} header={CategorySegmentsHeader} cells={cells} cellsWidth="500px"
	                 createSegment={create} sortSegments={sort}
	                 extraButtons={hasOthers ? null : <AddOtherButton bucket={holder}/>}/>;
};