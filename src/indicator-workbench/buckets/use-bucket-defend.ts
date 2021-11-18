import {Bucket} from '@/services/data/tuples/bucket-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEffect} from 'react';
import {useBucketEventBus} from './bucket-event-bus';
import {BucketEventTypes} from './bucket-event-bus-types';

export const useBucketDefend = <B extends Bucket>(bucket: Bucket, defend: (bucket: B) => void, typeCheck: (bucket: Bucket) => boolean): bucket is B => {
	const {on, off} = useBucketEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTypeChanged = (aBucket: Bucket) => {
			if (aBucket !== bucket) {
				return;
			}
			if (typeCheck(bucket)) {
				defend(bucket as B);
			}
			forceUpdate();
		};
		on(BucketEventTypes.BUCKET_TYPE_CHANGED, onTypeChanged);
		return () => {
			off(BucketEventTypes.BUCKET_TYPE_CHANGED, onTypeChanged);
		};
	}, [on, off, forceUpdate, bucket, typeCheck, defend]);

	return typeCheck(bucket);
};