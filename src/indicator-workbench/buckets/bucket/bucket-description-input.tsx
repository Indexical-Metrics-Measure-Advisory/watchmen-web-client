import {Bucket} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {TuplePropertyInputLines} from '@/widgets/tuple-workbench/tuple-editor';
import React, {ChangeEvent} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';

export const BucketDescriptionInput = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const {fire} = useBucketEventBus();
	const forceUpdate = useForceUpdate();

	const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (bucket.description !== event.target.value) {
			bucket.description = event.target.value;
			fire(BucketEventTypes.BUCKET_DESCRIPTION_CHANGED, bucket);
			forceUpdate();
		}
	};

	return <TuplePropertyInputLines value={bucket.description || ''} onChange={onDescriptionChange}/>;
};