import {
	Bucket,
	CategorySegment,
	EnumMeasureBucket,
	OtherCategorySegmentValue
} from '@/services/data/tuples/bucket-types';
import {Enum, EnumId, EnumItem} from '@/services/data/tuples/enum-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_SORT} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {AddOtherButton} from '../category-measure-bucket/add-other-button';
import {useCategorySegments} from '../category-measure-bucket/use-category-segments';
import {create, sortSegments, sortSegmentValues} from '../category-measure-bucket/utils';
import {CategorySegmentsHeader} from '../category-measure-bucket/widgets';
import {Segments} from '../segments';
import {SegmentCategoryValuesCell} from './segment-category-values-cell';
import {renderBySortType, SortType} from './utils';

interface EnumItems {
	enumId: EnumId;
	items: Record<string, EnumItem>;
}

export const EnumSegments = (props: { holder: EnumMeasureBucket }) => {
	const {holder} = props;

	const {fire: fireTuple} = useTupleEventBus();
	const {on, off} = useBucketEventBus();
	const [enumeration, setEnumeration] = useState<EnumItems | null>(null);
	useCategorySegments(holder);
	useEffect(() => {
		const onEnumChanged = (bucket: Bucket) => {
			if (bucket !== holder) {
				return;
			}

			if (holder.enumId == null) {
				setEnumeration(null);
			}

			fireTuple(TupleEventTypes.ASK_ENUM_DATA, holder.enumId, (enumeration?: Enum) => {
				if (enumeration != null) {
					setEnumeration((enumeration.items ?? []).reduce((items, item) => {
						items.items[item.code] = item;
						return items;
					}, {enumId: holder.enumId, items: {}} as EnumItems));
				} else {
					setEnumeration(null);
				}
			});
		};
		on(BucketEventTypes.BUCKET_ENUM_CHANGED, onEnumChanged);
		return () => {
			off(BucketEventTypes.BUCKET_ENUM_CHANGED, onEnumChanged);
		};
	}, [on, off, fireTuple, holder]);

	const sort = (sortType: SortType) => () => {
		holder.segments.sort(sortSegments).forEach(segment => {
			segment.value.sort(sortSegmentValues(segment, (v1, v2) => {
				const i1 = enumeration?.items[v1];
				const i2 = enumeration?.items[v2];
				const l1 = renderBySortType(sortType, v1, i1);
				const l2 = renderBySortType(sortType, v2, i2);
				return l1.localeCompare(l2, void 0, {sensitivity: 'base', caseFirst: 'upper'});
			}));
		});
	};
	const cells = (segment: CategorySegment) => {
		return <SegmentCategoryValuesCell holder={holder} segment={segment}/>;
	};

	const hasOthers = holder.segments.some(segment => segment.value.length === 1 && segment.value[0] === OtherCategorySegmentValue);

	const buttons = <>
		{hasOthers ? null : <AddOtherButton bucket={holder}/>}
		<DwarfButton ink={ButtonInk.PRIMARY} onClick={sort(SortType.CODE)}>
			<FontAwesomeIcon icon={ICON_SORT}/>
			{Lang.INDICATOR_WORKBENCH.BUCKET.SORT_SEGMENTS_BY_CODE}
		</DwarfButton>
		<DwarfButton ink={ButtonInk.PRIMARY} onClick={sort(SortType.NAME)}>
			<FontAwesomeIcon icon={ICON_SORT}/>
			{Lang.INDICATOR_WORKBENCH.BUCKET.SORT_SEGMENTS_BY_NAME}
		</DwarfButton>
	</>;

	return <Segments bucket={holder} header={CategorySegmentsHeader} cells={cells} cellsWidth="500px"
	                 createSegment={create} extraButtons={buttons}/>;
};