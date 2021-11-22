import {
	Bucket,
	CategorySegment,
	EnumMeasureBucket,
	OtherCategorySegmentValue
} from '@/services/data/tuples/bucket-types';
import {Enum} from '@/services/data/tuples/enum-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_SORT} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes, SortType} from '../bucket-event-bus-types';
import {AddOtherButton} from '../category-measure-bucket/add-other-button';
import {useCategorySegments} from '../category-measure-bucket/use-category-segments';
import {create, sortSegments, sortSegmentValues} from '../category-measure-bucket/utils';
import {CategorySegmentsHeader} from '../category-measure-bucket/widgets';
import {Segments} from '../segments';
import {AvailableEnumItems} from './available-enum-items';
import {SegmentCategoryValuesCell} from './segment-category-values-cell';
import {EnumItems, renderBySortType} from './utils';

export const EnumSegments = (props: { bucket: EnumMeasureBucket }) => {
	const {bucket} = props;

	const {fire: fireTuple} = useTupleEventBus();
	const {on, off, fire} = useBucketEventBus();
	useCategorySegments(bucket);
	const [enumeration, setEnumeration] = useState<EnumItems | null>(null);
	useEffect(() => {
		const askEnumData = () => {
			fireTuple(TupleEventTypes.ASK_ENUM_DATA, bucket.enumId, (enumeration?: Enum) => {
				if (enumeration != null) {
					setEnumeration((enumeration.items ?? []).reduce((items, item) => {
						items.items[item.code] = item;
						return items;
					}, {enumId: bucket.enumId, items: {}} as EnumItems));
				} else {
					setEnumeration(null);
				}
			});
		};
		if (!isFakedUuid(bucket) && bucket.enumId != null) {
			askEnumData();
		}
		const onEnumChanged = (aBucket: Bucket) => {
			if (aBucket !== bucket) {
				return;
			}

			if (bucket.enumId == null) {
				setEnumeration(null);
			}

			askEnumData();
		};
		on(BucketEventTypes.BUCKET_ENUM_CHANGED, onEnumChanged);
		return () => {
			off(BucketEventTypes.BUCKET_ENUM_CHANGED, onEnumChanged);
		};
	}, [on, off, fireTuple, bucket]);

	const sort = (sortType: SortType) => () => {
		bucket.segments.sort(sortSegments).forEach(segment => {
			segment.value.sort(sortSegmentValues(segment, (v1, v2) => {
				const i1 = enumeration?.items[v1];
				const i2 = enumeration?.items[v2];
				const l1 = renderBySortType(sortType, v1, i1);
				const l2 = renderBySortType(sortType, v2, i2);
				return l1.localeCompare(l2, void 0, {sensitivity: 'base', caseFirst: 'upper'});
			}));
		});
		fire(BucketEventTypes.SEGMENT_SORTED, bucket, sortType);
	};

	const cells = (segment: CategorySegment) => {
		return <SegmentCategoryValuesCell bucket={bucket} segment={segment} enum={enumeration ?? (void 0)}/>;
	};

	const hasOthers = bucket.segments.some(segment => segment.value.length === 1 && segment.value[0] === OtherCategorySegmentValue);
	const buttons = <>
		{hasOthers ? null : <AddOtherButton bucket={bucket}/>}
		<DwarfButton ink={ButtonInk.PRIMARY} onClick={sort(SortType.CODE)}>
			<FontAwesomeIcon icon={ICON_SORT}/>
			{Lang.INDICATOR_WORKBENCH.BUCKET.SORT_SEGMENTS_BY_CODE}
		</DwarfButton>
		<DwarfButton ink={ButtonInk.PRIMARY} onClick={sort(SortType.NAME)}>
			<FontAwesomeIcon icon={ICON_SORT}/>
			{Lang.INDICATOR_WORKBENCH.BUCKET.SORT_SEGMENTS_BY_NAME}
		</DwarfButton>
	</>;

	return <>
		<Segments bucket={bucket}
		          header={<CategorySegmentsHeader/>} cells={cells} cellsWidth="500px"
		          createSegment={create} extraButtons={buttons}/>
		<AvailableEnumItems bucket={bucket} enum={enumeration ?? (void 0)}/>
	</>;
};