import {CategorySegment, CategorySegmentsHolder, OtherCategorySegmentValue} from '@/services/data/tuples/bucket-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {
	NoSegmentValueDefined,
	SegmentValue,
	SegmentValueCellContainer,
	SegmentValues
} from '../category-measure-bucket/widgets';

export const SegmentCategoryValuesCell = (props: { holder: CategorySegmentsHolder, segment: CategorySegment }) => {
	const {holder, segment} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onSegmentValueRemoveClicked = (value: string) => () => {
		const index = segment.value.indexOf(value);
		segment.value.splice(index, 1);
		forceUpdate();
		fire(BucketEventTypes.SEGMENT_CHANGED, holder, segment);
	};

	const values = segment.value.filter(v => !!v.trim());
	const hasOthers = values.includes(OtherCategorySegmentValue);

	return <SegmentValueCellContainer isOthers={hasOthers}>
		<SegmentValues>
			{values.length === 0
				?
				<NoSegmentValueDefined>{Lang.INDICATOR_WORKBENCH.BUCKET.NO_SEGMENT_VALUE_DEFINED}</NoSegmentValueDefined>
				: values.map(value => {
					return <SegmentValue isOthers={hasOthers} key={value}>
						<span>{value}</span>
						{hasOthers
							? null
							: <span onClick={onSegmentValueRemoveClicked(value)}>
								<FontAwesomeIcon icon={ICON_DELETE}/>
						</span>}
					</SegmentValue>;
				})}
		</SegmentValues>
	</SegmentValueCellContainer>;
};