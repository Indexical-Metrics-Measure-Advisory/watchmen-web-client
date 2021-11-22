import {
	CategoryMeasureBucket,
	CategorySegment,
	CategorySegmentsHolder,
	OtherCategorySegmentValue
} from '@/services/data/tuples/bucket-types';
import React from 'react';
import {SortType} from '../bucket-event-bus-types';
import {Segments} from '../segments';
import {AddOtherButton} from './add-other-button';
import {SegmentCategoryValuesCell} from './segment-category-values-cell';
import {useCategorySegments} from './use-category-segments';
import {create, sortSegments, sortSegmentValues} from './utils';
import {CategorySegmentsHeader} from './widgets';

export const CategorySegments = (props: { bucket: CategoryMeasureBucket }) => {
	const {bucket} = props;

	useCategorySegments(bucket);

	const sort = (bucket: CategorySegmentsHolder) => {
		bucket.segments.sort(sortSegments).forEach(segment => {
			segment.value.sort(sortSegmentValues(segment, (v1, v2) => {
				return v1.localeCompare(v2, void 0, {sensitivity: 'base', caseFirst: 'upper', numeric: true});
			}));
		});
		return SortType.UNCONCERNED;
	};
	const cells = (segment: CategorySegment) => {
		return <>
			<SegmentCategoryValuesCell holder={bucket} segment={segment}/>
		</>;
	};

	const hasOthers = bucket.segments.some(segment => segment.value.length === 1 && segment.value[0] === OtherCategorySegmentValue);

	return <Segments bucket={bucket} header={<CategorySegmentsHeader/>} cells={cells} cellsWidth="500px"
	                 createSegment={create} sortSegments={sort}
	                 extraButtons={hasOthers ? null : <AddOtherButton bucket={bucket}/>}/>;
};