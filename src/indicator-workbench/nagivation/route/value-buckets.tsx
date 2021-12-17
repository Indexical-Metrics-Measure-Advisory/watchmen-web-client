import {fetchBucket} from '@/services/data/tuples/bucket';
import {Bucket, BucketId} from '@/services/data/tuples/bucket-types';
import {isNotNull} from '@/services/data/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Fragment, useEffect, useState} from 'react';
import {useNavigationEventBus} from '../navigation-event-bus';
import {NavigationEventTypes} from '../navigation-event-bus-types';

type AskingRequest = (bucket?: Bucket) => void;
type AskingRequestQueue = Array<AskingRequest>;

export const ValueBuckets = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useNavigationEventBus();
	const [loadingQueue] = useState<Record<BucketId, AskingRequestQueue>>({});
	const [buckets] = useState<Record<BucketId, Bucket>>({});
	useEffect(() => {
			const onAskBuckets = (bucketIds: Array<BucketId>, onData: (buckets: Array<Bucket>) => void) => {
				const {buckets: existingBuckets, lackedBucketIds} = bucketIds.reduce((data, bucketId) => {
					if (bucketId != null) {
						const bucket = buckets[bucketId];
						if (bucket != null) {
							data.buckets.push(bucket);
						} else {
							data.lackedBucketIds.push(bucketId);
						}
					}
					return data;
				}, {buckets: [], lackedBucketIds: []} as { buckets: Array<Bucket>, lackedBucketIds: Array<BucketId> });

				if (lackedBucketIds.length === 0) {
					onData(existingBuckets);
					return;
				}

				// fire bucket loading separately
				Promise.all(lackedBucketIds.map(bucketId => {
					return new Promise<Bucket | undefined>(resolve => {
						const queue = loadingQueue[bucketId];
						if (queue != null && queue.length !== 0) {
							// loading now
							const handleQueueDone = (bucket?: Bucket) => resolve(bucket);
							queue.push(handleQueueDone);
						} else {
							loadingQueue[bucketId] = [(bucket?: Bucket) => resolve(bucket)];
							fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
								async () => {
									const {bucket} = await fetchBucket(bucketId);
									return bucket;
								},
								(bucket: Bucket) => {
									buckets[bucketId] = bucket;
									const handlers = loadingQueue[bucketId];
									delete loadingQueue[bucketId];
									handlers.forEach(onData => onData(bucket));
								},
								() => {
									const handlers = loadingQueue[bucketId];
									delete loadingQueue[bucketId];
									handlers.forEach(onData => onData());
								});
						}
					});
				})).then(loadedLackedBuckets => {
					onData([...existingBuckets, ...loadedLackedBuckets.filter(isNotNull)]);
				});
			};
			on(NavigationEventTypes.ASK_VALUE_BUCKETS, onAskBuckets);
			return () => {
				off(NavigationEventTypes.ASK_VALUE_BUCKETS, onAskBuckets);
			};
		}, [fireGlobal, on, off, loadingQueue, buckets]
	);

	return <Fragment/>;
};