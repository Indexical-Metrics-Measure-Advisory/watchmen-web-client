import {Bucket, NumericValueMeasureBucket} from '@/services/data/tuples/bucket-types';
import {defendNumericValueSegmentsHolder, isNumericValueMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {useBucketEventBus} from '../bucket-event-bus';
import {BucketEventTypes} from '../bucket-event-bus-types';
import {SegmentHolderEditor} from '../segments-holder';

export const NumericValueMeasureBucketEditor = (props: { bucket: Bucket }) => {
	const {bucket} = props;

	const {on, off} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTypeChanged = (aBucket: Bucket) => {
			if (aBucket !== bucket) {
				return;
			}
			defendNumericValueSegmentsHolder(bucket as NumericValueMeasureBucket);
			forceUpdate();
		};
		on(BucketEventTypes.BUCKET_TYPE_CHANGED, onTypeChanged);
		return () => {
			off(BucketEventTypes.BUCKET_TYPE_CHANGED, onTypeChanged);
		};
	}, [on, off, forceUpdate, bucket]);

	if (!isNumericValueMeasureBucket(bucket)) {
		return null;
	}

	return <>
		<SegmentHolderEditor holder={bucket}/>
	</>;
};
