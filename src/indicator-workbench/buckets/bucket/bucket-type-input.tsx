import {Bucket, BucketType} from '@/services/data/tuples/bucket-types';
import {isFakedUuid} from '@/services/data/tuples/utils';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {TuplePropertyDropdown, TuplePropertyLabel} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';

const BucketTypes: Record<BucketType, string> = {
	[BucketType.VALUE]: Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_TYPE_VALUE,
	[BucketType.VALUE_MEASURE]: Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_TYPE_VALUE_MEASURE,
	[BucketType.CATEGORY_MEASURE]: Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_TYPE_CATEGORY_MEASURE,
	[BucketType.ENUM_MEASURE]: Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_TYPE_ENUM_MEASURE,
	[BucketType.COMPOSITE]: Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_TYPE_COMPOSITE
};
const BucketTypeOptions: Array<DropdownOption> = Object.keys(BucketTypes).map(type => {
	return {
		value: type,
		label: () => {
			return {node: BucketTypes[type as BucketType], label: type};
		},
		key: type
	};
});

export const BucketTypeInput = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onTypeChange = (option: DropdownOption) => {
		bucket.type = option.value as BucketType;
		fire(BucketEventTypes.BUCKET_TYPE_CHANGED, bucket);
		forceUpdate();
	};

	if (isFakedUuid(bucket)) {
		return <TuplePropertyDropdown value={bucket.type} options={BucketTypeOptions} onChange={onTypeChange}/>;
	} else {
		return <TuplePropertyLabel>{BucketTypes[bucket.type]}</TuplePropertyLabel>;
	}
};