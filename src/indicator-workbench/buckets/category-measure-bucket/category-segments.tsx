import {
	Bucket,
	BucketSegment,
	CategorySegment,
	CategorySegmentsHolder,
	OtherCategorySegmentValue
} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import React, {useEffect} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {Segments} from '../segments';
import {SegmentTableHeaderLabel} from '../segments/widgets';
import {createCategorySegment} from '../utils';
import {AddOtherButton} from './add-other-button';
import {SegmentCategoryValuesCell} from './segment-category-values-cell';

export const CategorySegments = (props: { holder: CategorySegmentsHolder }) => {
	const {holder} = props;

	const {on, off} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSegmentAddedOrChangedOrRemoved = (bucket: Bucket, segment: BucketSegment) => {
			if (holder !== bucket) {
				return;
			}

			const categorySegment = segment as CategorySegment;

			if (categorySegment.value.length === 1 && categorySegment.value[0] === OtherCategorySegmentValue) {
				forceUpdate();
			}
		};
		on(BucketEventTypes.SEGMENT_ADDED, onSegmentAddedOrChangedOrRemoved);
		on(BucketEventTypes.SEGMENT_CHANGED, onSegmentAddedOrChangedOrRemoved);
		on(BucketEventTypes.SEGMENT_REMOVED, onSegmentAddedOrChangedOrRemoved);
		return () => {
			off(BucketEventTypes.SEGMENT_ADDED, onSegmentAddedOrChangedOrRemoved);
			off(BucketEventTypes.SEGMENT_CHANGED, onSegmentAddedOrChangedOrRemoved);
			off(BucketEventTypes.SEGMENT_REMOVED, onSegmentAddedOrChangedOrRemoved);
		};
	}, [on, off, holder, forceUpdate]);

	const create = (bucket: CategorySegmentsHolder) => {
		const segment = createCategorySegment(bucket);
		bucket.segments.push(segment);
		return segment;
	};
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

	const hasOthers = holder.segments.some(segment => segment.value.length === 1 && segment.value[0] === OtherCategorySegmentValue);

	return <Segments bucket={holder} header={header} cells={cells} cellsWidth="500px"
	                 createSegment={create} sortSegments={sort}
	                 extraButtons={hasOthers ? null : <AddOtherButton bucket={holder}/>}/>;
};