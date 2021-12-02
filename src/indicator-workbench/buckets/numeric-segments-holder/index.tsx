import {NumericSegmentsHolder, RangeBucketValueIncluding} from '@/services/data/tuples/bucket-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {TuplePropertyDropdown, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {NumericSegments} from '../numeric-segments';

export const NumericSegmentHolderEditor = (props: { holder: NumericSegmentsHolder }) => {
	const {holder} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onIncludingChange = (option: DropdownOption) => {
		holder.include = option.value as RangeBucketValueIncluding;
		fire(BucketEventTypes.BUCKET_RANGE_INCLUDE_CHANGED, holder);
		forceUpdate();
	};

	const includingOptions: Array<DropdownOption> = [
		{value: RangeBucketValueIncluding.INCLUDE_MIN, label: Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_INCLUDE_MIN},
		{value: RangeBucketValueIncluding.INCLUDE_MAX, label: Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_INCLUDE_MAX}
	];

	return <>
		<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_INCLUDING_LABEL}</TuplePropertyLabel>
		<TuplePropertyDropdown value={holder.include ?? RangeBucketValueIncluding.INCLUDE_MIN}
		                       options={includingOptions}
		                       onChange={onIncludingChange}/>
		<NumericSegments holder={holder}/>
	</>;
};
