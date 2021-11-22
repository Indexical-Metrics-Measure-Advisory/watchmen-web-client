import {
	Bucket,
	BucketSegment,
	CategorySegment,
	EnumMeasureBucket,
	OtherCategorySegmentValue
} from '@/services/data/tuples/bucket-types';
import {EnumItem} from '@/services/data/tuples/enum-types';
import {Button} from '@/widgets/basic/button';
import {ICON_SELECTED} from '@/widgets/basic/constants';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {TuplePropertyDropdown, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes, SortType} from '../bucket-event-bus-types';
import {EnumItems, renderBySortType} from './utils';
import {
	AvailableEnumItem,
	AvailableEnumItemsContainer,
	AvailableEnumItemSelectors,
	AvailableItemOperator,
	NoAvailableEnumItem
} from './widgets';

export const AvailableEnumItems = (props: { bucket: EnumMeasureBucket; enum?: EnumItems; }) => {
	const {bucket, enum: enumeration} = props;

	const {on, off} = useBucketEventBus();
	const [sortType, setSortType] = useState<SortType>(SortType.NAME);
	const [selection] = useState<Array<EnumItem>>([]);
	const [selectedSegment, setSelectedSegment] = useState<CategorySegment | null>(null);
	const forceUpdate = useForceUpdate();
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
	useEffect(() => {
		const onSegmentChanged = (aBucket: Bucket) => {
			if (aBucket !== bucket) {
				return;
			}
			forceUpdate();
		};
		const onSegmentRemoved = (aBucket: Bucket, segment: BucketSegment) => {
			if (aBucket !== bucket) {
				return;
			}
			if (segment === selectedSegment) {
				setSelectedSegment(null);
			} else {
				forceUpdate();
			}
		};
		on(BucketEventTypes.SEGMENT_ADDED, onSegmentChanged);
		on(BucketEventTypes.SEGMENT_REMOVED, onSegmentRemoved);
		on(BucketEventTypes.SEGMENT_NAME_CHANGED, onSegmentChanged);
		return () => {
			off(BucketEventTypes.SEGMENT_ADDED, onSegmentChanged);
			off(BucketEventTypes.SEGMENT_REMOVED, onSegmentRemoved);
			off(BucketEventTypes.SEGMENT_NAME_CHANGED, onSegmentChanged);
		};
	}, [on, off, forceUpdate, bucket, selectedSegment]);

	const onEnumClicked = (item: EnumItem) => () => {
		const index = selection.indexOf(item);
		if (index === -1) {
			selection.push(item);
		} else {
			selection.splice(index, 1);
		}
		forceUpdate();
	};
	const onSegmentChanged = (option: DropdownOption) => {
		const value = option.value as CategorySegment;
		setSelectedSegment(value);
	};
	const onConfirmAddClicked = () => {
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
	const segmentOptions = bucket.segments.filter(segment => !(segment.value || []).includes(OtherCategorySegmentValue))
		.map((segment, segmentIndex) => {
			return {
				value: segment, label: () => {
					return {
						node: <>
							{segment.name || <>{Lang.INDICATOR_WORKBENCH.BUCKET.SEGMENT_LABEL} # {segmentIndex + 1}</>}
						</>,
						label: segment.name || `# ${segmentIndex + 1}`
					};
				}
			};
		});

	return <AvailableEnumItemsContainer>
		<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.AVAILABLE_ENUM_ITEMS_LABEL}</TuplePropertyLabel>
		<AvailableEnumItemSelectors>
			{availableItems.length === 0
				? <NoAvailableEnumItem>{Lang.INDICATOR_WORKBENCH.BUCKET.NO_AVAILABLE_ENUM_ITEMS}</NoAvailableEnumItem>
				: availableItems.map(item => {
					return <AvailableEnumItem selected={selection.includes(item)}
					                          onClick={onEnumClicked(item)} key={item.code}>
						<span>{renderBySortType(sortType, item.code, item)}</span>
						<FontAwesomeIcon icon={ICON_SELECTED}/>
					</AvailableEnumItem>;
				})}
		</AvailableEnumItemSelectors>
		<AvailableItemOperator>
			<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.ADD_AVAILABLE_ITEMS_INTO_SEGMENT}</TuplePropertyLabel>
			<TuplePropertyDropdown value={selectedSegment} options={segmentOptions}
			                       please={Lang.INDICATOR_WORKBENCH.BUCKET.PLEASE_SELECT_SEGMENT}
			                       onChange={onSegmentChanged}/>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmAddClicked}>
				{Lang.ACTIONS.CONFIRM}
			</Button>
		</AvailableItemOperator>
	</AvailableEnumItemsContainer>;
};