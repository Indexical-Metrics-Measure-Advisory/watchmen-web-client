import {Bucket, EnumMeasureBucket} from '@/services/data/tuples/bucket-types';
import {EnumItem} from '@/services/data/tuples/enum-types';
import {Lang} from '@/widgets/langs';
import {TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React, {useEffect, useState} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes, SortType} from '../bucket-event-bus-types';
import {EnumItems, renderBySortType} from './utils';
import {
	AvailableEnumItem,
	AvailableEnumItemsContainer,
	AvailableEnumItemSelectors,
	NoAvailableEnumItem
} from './widgets';

export const AvailableEnumItems = (props: { bucket: EnumMeasureBucket; enum?: EnumItems; }) => {
	const {bucket, enum: enumeration} = props;

	const {on, off} = useBucketEventBus();
	const [sortType, setSortType] = useState<SortType>(SortType.NAME);
	useEffect(() => {
		const onSegmentSorted = (aBucket: Bucket, toSortType: SortType) => {
			if (aBucket !== bucket || sortType === toSortType) {
				return;
			}
			setSortType(toSortType);
		};
		on(BucketEventTypes.SEGMENT_SORTED, onSegmentSorted);
		return () => {
			off(BucketEventTypes.SEGMENT_SORTED, onSegmentSorted);
		};
	}, [on, off, bucket, sortType]);

	const onEnumClicked = (item: EnumItem) => () => {
		// TODO
	};

	const usedCodes = (bucket.segments || []).map(segment => segment.value || []).flat()
		.reduce((all, value) => {
			all[value] = true;
			return all;
		}, {} as Record<string, true>);
	const availableItems = enumeration == null || enumeration.items == null
		? []
		: [...Object.values(enumeration.items)]
			.filter(item => usedCodes[item.code] == null)
			.sort((i1, i2) => {
				const l1 = renderBySortType(sortType, i1.code, i1);
				const l2 = renderBySortType(sortType, i2.code, i2);
				return l1.localeCompare(l2, void 0, {sensitivity: 'base', caseFirst: 'upper'});
			});

	return <AvailableEnumItemsContainer>
		<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.AVAILABLE_ENUM_ITEMS_LABEL}</TuplePropertyLabel>
		<AvailableEnumItemSelectors>
			{availableItems.length === 0
				? <NoAvailableEnumItem>{Lang.INDICATOR_WORKBENCH.BUCKET.NO_AVAILABLE_ENUM_ITEMS}</NoAvailableEnumItem>
				: availableItems.map(item => {
					return <AvailableEnumItem onClick={onEnumClicked(item)} key={item.code}>
						<span>{renderBySortType(sortType, item.code, item)}</span>
					</AvailableEnumItem>;
				})}
		</AvailableEnumItemSelectors>
	</AvailableEnumItemsContainer>;
};