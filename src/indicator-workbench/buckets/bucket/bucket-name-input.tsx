import {Bucket} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInput} from '@/widgets/tuple-workbench/tuple-editor';
import React from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';

export const BucketNameInput = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (bucket.name !== event.target.value) {
			bucket.name = event.target.value;
			fire(BucketEventTypes.BUCKET_NAME_CHANGED, bucket);
			forceUpdate();
		}
	};

	return <TuplePropertyInput value={bucket.name || ''} onChange={onNameChange}/>;
};