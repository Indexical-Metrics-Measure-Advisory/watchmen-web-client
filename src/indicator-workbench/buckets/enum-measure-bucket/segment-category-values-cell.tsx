import {
	Bucket,
	BucketSegment,
	CategorySegment,
	EnumMeasureBucket,
	OtherCategorySegmentValue
} from '@/services/data/tuples/bucket-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {useCategorySegmentValue} from '../category-measure-bucket/use-category-segment-value';
import {
	NoSegmentValueDefined,
	SegmentValue,
	SegmentValueCellContainer,
	SegmentValues
} from '../category-measure-bucket/widgets';
import {useSortType} from './use-sort-type';
import {EnumItems, renderBySortType} from './utils';

export const SegmentCategoryValuesCell = (props: { bucket: EnumMeasureBucket, segment: CategorySegment; enum?: EnumItems }) => {
	const {bucket, segment, enum: enumeration} = props;

	const {on, off} = useBucketEventBus();
	const onRemoveValue = useCategorySegmentValue(bucket, segment);
	const sortType = useSortType(bucket);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onValuesAdded = (aBucket: Bucket, aSegment: BucketSegment) => {
			if (aBucket !== bucket || aSegment !== segment) {
				return;
			}
			forceUpdate();
		};
		on(BucketEventTypes.CATEGORY_SEGMENT_VALUES_ADDED, onValuesAdded);
		return () => {
			off(BucketEventTypes.CATEGORY_SEGMENT_VALUES_ADDED, onValuesAdded);
		};
	}, [on, off, forceUpdate, bucket, segment]);

	const values = segment.value.filter(v => !!v.trim());
	const hasOthers = values.includes(OtherCategorySegmentValue);
	const displayValue = (value: string) => {
		if (enumeration == null || enumeration.items == null) {
			return value;
		}
		return renderBySortType(sortType, value, enumeration.items[value]);
	};

	return <SegmentValueCellContainer canAdd={false}>
		<SegmentValues>
			{values.length === 0
				?
				<NoSegmentValueDefined>{Lang.INDICATOR_WORKBENCH.BUCKET.NO_SEGMENT_VALUE_DEFINED}</NoSegmentValueDefined>
				: values.map(value => {
					return <SegmentValue isOthers={value === OtherCategorySegmentValue} key={value}>
						<span>{displayValue(value)}</span>
						{hasOthers
							? null
							: <span onClick={onRemoveValue(value)}>
								<FontAwesomeIcon icon={ICON_DELETE}/>
						</span>}
					</SegmentValue>;
				})}
		</SegmentValues>
	</SegmentValueCellContainer>;
};