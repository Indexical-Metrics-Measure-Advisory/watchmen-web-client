import {Bucket, NumericValueBucket, RangeBucketValueIncluding} from '@/services/data/tuples/bucket-types';
import {defendNumericValueBucket, isNumericValueBucket} from '@/services/data/tuples/bucket-utils';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {TuplePropertyDropdown, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React, {useEffect} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {NumericSegments} from '../numeric-segments';

export const NumericValueBucketEditor = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const {on, off, fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTypeChanged = (aBucket: Bucket) => {
			if (aBucket !== bucket) {
				return;
			}
			defendNumericValueBucket(bucket as NumericValueBucket);
			forceUpdate();
		};
		on(BucketEventTypes.BUCKET_TYPE_CHANGED, onTypeChanged);
		return () => {
			off(BucketEventTypes.BUCKET_TYPE_CHANGED, onTypeChanged);
		};
	}, [on, off, forceUpdate, bucket]);

	if (!isNumericValueBucket(bucket)) {
		return null;
	}

	const onIncludingChange = (option: DropdownOption) => {
		bucket.include = option.value as RangeBucketValueIncluding;
		fire(BucketEventTypes.BUCKET_RANGE_INCLUDE_CHANGED, bucket);
		forceUpdate();
	};

	const includingOptions: Array<DropdownOption> = [
		{
			value: RangeBucketValueIncluding.INCLUDE_MIN,
			key: 'include min',
			label: Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_INCLUDE_MIN
		},
		{
			value: RangeBucketValueIncluding.INCLUDE_MAX,
			key: 'include max',
			label: Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_INCLUDE_MAX
		}
	];

	// TODO min/max values table
	return <>
		<TuplePropertyLabel>{Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_INCLUDING_LABEL}</TuplePropertyLabel>
		<TuplePropertyDropdown value={bucket.include ?? RangeBucketValueIncluding.INCLUDE_MIN}
		                       options={includingOptions}
		                       onChange={onIncludingChange}/>
		<NumericSegments holder={bucket}/>
	</>;
};
