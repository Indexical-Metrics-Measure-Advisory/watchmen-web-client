import {CategorySegment, EnumMeasureBucket, OtherCategorySegmentValue} from '@/services/data/tuples/bucket-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
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

	const onRemoveValue = useCategorySegmentValue(bucket, segment);
	const sortType = useSortType(bucket);

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