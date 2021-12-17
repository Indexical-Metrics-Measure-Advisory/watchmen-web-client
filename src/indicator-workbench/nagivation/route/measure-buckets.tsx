import {fetchBucket, fetchBucketsByMethods} from '@/services/data/tuples/bucket';
import {Bucket} from '@/services/data/tuples/bucket-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {QueryByBucketMethod} from '@/services/data/tuples/query-bucket-types';
import {isQueryByEnum, isQueryByMeasure} from '@/services/data/tuples/query-bucket-utils';
import {isNotNull} from '@/services/data/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Fragment, useEffect, useState} from 'react';
import {useNavigationEventBus} from '../navigation-event-bus';
import {NavigationEventTypes} from '../navigation-event-bus-types';

type AskingRequest = (buckets: Array<Bucket>) => void;
type AskingRequestQueue = Array<AskingRequest>;

interface ExistingBuckets {
	buckets: Array<Bucket>;
	lackedMeasureMethods: Array<QueryByBucketMethod>;
}

const asMeasureMethodKey = (method: QueryByBucketMethod) => {
	if (isQueryByEnum(method)) {
		return method.enumId;
	} else if (isQueryByMeasure(method)) {
		return method.method;
	} else {
		throw new Error(`Measure method[${JSON.stringify(method)}] is not supported yet.`);
	}
};

export const MeasureBuckets = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useNavigationEventBus();
	const [loadingQueue] = useState<Record<MeasureMethod | string, AskingRequestQueue>>({});
	const [buckets] = useState<Record<MeasureMethod | string, Array<Bucket>>>({});
	useEffect(() => {
			const onAskBuckets = (methods: Array<QueryByBucketMethod>, onData: (buckets: Array<Bucket>) => void) => {
				const {buckets: existingBuckets, lackedMeasureMethods} = methods.reduce((data, method) => {
					if (method != null) {
						const bucket = buckets[asMeasureMethodKey(method) as string];
						if (bucket != null) {
							data.buckets.push(...bucket);
						} else {
							data.lackedMeasureMethods.push(method);
						}
					}
					return data;
				}, {buckets: [], lackedMeasureMethods: []} as ExistingBuckets);

				if (lackedMeasureMethods.length === 0) {
					onData(existingBuckets);
					return;
				}

				// fire bucket loading separately
				Promise.all(lackedMeasureMethods.map(method => {
					const key = asMeasureMethodKey(method) as string;
					const queue = loadingQueue[key];
					return new Promise<Array<Bucket>>(resolve => {
						if (queue != null && queue.length !== 0) {
							// loading now
							const handleQueueDone = (buckets: Array<Bucket>) => resolve(buckets);
							queue.push(handleQueueDone);
						} else {
							loadingQueue[key] = [(buckets: Array<Bucket>) => resolve(buckets)];
							fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
								async () => {
									const queryBuckets = await fetchBucketsByMethods([method]);
									const buckets = await Promise.all(queryBuckets.map(({bucketId}) => {
										return new Promise<Bucket | void>(resolve => {
											fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
												async () => {
													const {bucket} = await fetchBucket(bucketId);
													return bucket;
												}, (bucket: Bucket) => resolve(bucket),
												() => resolve());
										});
									}));
									return buckets.filter(isNotNull);
								},
								(loadedBuckets: Array<Bucket>) => {
									buckets[key] = loadedBuckets;
									const handlers = loadingQueue[key];
									delete loadingQueue[key];
									handlers.forEach(onData => onData(loadedBuckets));
								},
								() => {
									const handlers = loadingQueue[key];
									delete loadingQueue[key];
									handlers.forEach(onData => onData([]));
								});
						}
					});
				})).then(loadedLackedBuckets => {
					onData([...existingBuckets, ...loadedLackedBuckets.flat().filter(isNotNull)]);
				});
			};
			on(NavigationEventTypes.ASK_MEASURE_BUCKETS, onAskBuckets);
			return () => {
				off(NavigationEventTypes.ASK_MEASURE_BUCKETS, onAskBuckets);
			};
		}, [fireGlobal, on, off, loadingQueue, buckets]
	);

	return <Fragment/>;
};