import {Bucket, BucketType} from '@/services/data/tuples/bucket-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {TuplePropertyDropdown} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';

const BucketTypeOptions: Array<DropdownOption> = [
	{value: BucketType.VALUE, label: Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_TYPE_VALUE, key: 'Value'},
	{value: BucketType.MEASURE, label: Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_TYPE_MEASURE, key: 'Measure'},
	{value: BucketType.COMPOSITE, label: Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_TYPE_COMPOSITE, key: 'Composite'}
];

export const BucketTypeInput = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	const onTypeChange = (option: DropdownOption) => {
		bucket.type = option.value as BucketType;
		fire(BucketEventTypes.BUCKET_TYPE_CHANGED, bucket);
		forceUpdate();
	};

	return <TuplePropertyDropdown value={bucket.type} options={BucketTypeOptions} onChange={onTypeChange}/>;
};