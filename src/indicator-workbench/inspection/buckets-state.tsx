import {fetchBucketsByIds, fetchBucketsByMethods} from '@/services/data/tuples/bucket';
import {isCategoryMeasureBucket, isEnumMeasureBucket, isMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {QueryBucket, QueryByEnumMethod} from '@/services/data/tuples/query-bucket-types';
import {isQueryByEnum, isQueryByMeasure} from '@/services/data/tuples/query-bucket-utils';
import {isNotNull} from '@/services/data/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Fragment, useEffect, useState} from 'react';
import {useInspectionEventBus} from './inspection-event-bus';
import {AskBucketsParams, InspectionEventTypes} from './inspection-event-bus-types';

type OnAskBuckets = (params: AskBucketsParams, onData: (buckets: Array<QueryBucket>) => void) => void;
type AskingRequest = { params: AskBucketsParams; onData: (buckets: Array<QueryBucket>) => void };
type AskingRequestQueue = Array<AskingRequest>;
type RetrievedBuckets = { valueBuckets: Array<QueryBucket>; measureBuckets: Array<QueryBucket> };

/**
 * key string can be:
 * 1. bucket id
 * 2. measure method
 * 3. measure method + enum id
 */
type LoadedBuckets = Record<string, Array<QueryBucket>>;

const buildEnumMeasureBucketKey = (measure: QueryByEnumMethod): string => {
	return `enum-${measure.enumId}`;
};

export const BucketsState = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useInspectionEventBus();
	const [loading, setLoading] = useState(false);
	const [queue] = useState<AskingRequestQueue>([]);
	const [buckets, setBuckets] = useState<LoadedBuckets>({});

	// bucket related
	useEffect(() => {
		const onAskBuckets: OnAskBuckets = ({valueBucketIds, measureMethods}, onData) => {
			if (loading) {
				// push to queue
				queue.push({params: {valueBucketIds, measureMethods}, onData});
				return;
			}

			setLoading(true);

			const lackedBucketsByIds = valueBucketIds.filter(bucketId => buckets[bucketId] == null);
			const lackedBucketsByMeasures = measureMethods.filter(measure => {
				if (isQueryByEnum(measure)) {
					return buckets[buildEnumMeasureBucketKey(measure)] == null;
				} else if (isQueryByMeasure(measure)) {
					return buckets[measure.method as string] == null;
				} else {
					// never occurs
					return true;
				}
			});

			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					const [valueBuckets, measureBuckets] = await Promise.all([
						lackedBucketsByIds.length === 0 ? [] : await fetchBucketsByIds(lackedBucketsByIds),
						lackedBucketsByMeasures.length === 0 ? [] : await fetchBucketsByMethods(lackedBucketsByMeasures)
					]);
					return {valueBuckets, measureBuckets};
				},
				({valueBuckets, measureBuckets}: RetrievedBuckets) => {
					const existingValueBuckets = valueBucketIds.map(bucketId => buckets[bucketId]).filter(isNotNull).flat();
					const existingMeasureBuckets = measureMethods.map(measure => {
						if (isQueryByEnum(measure)) {
							// eslint-disable-next-line
							return buckets[buildEnumMeasureBucketKey(measure)];
						} else if (isQueryByMeasure(measure)) {
							return buckets[measure.method as string];
						} else {
							return null;
						}
					}).filter(isNotNull).flat();
					setBuckets(buckets => {
						const newBuckets = [...Object.values(buckets), valueBuckets, measureBuckets].flat()
							.reduce((all, bucket) => {
								let key;
								if (isEnumMeasureBucket(bucket)) {
									key = buildEnumMeasureBucketKey({
										method: MeasureMethod.ENUM,
										enumId: bucket.enumId
									});
								} else if (isCategoryMeasureBucket(bucket)) {
									key = bucket.measure;
								} else {
									key = bucket.bucketId;
								}
								let existing = all[key];
								if (existing == null) {
									existing = [];
									all[key] = existing;
								}
								existing.push(bucket);
								return all;
							}, {} as LoadedBuckets);
						// not exists also write into cache
						valueBucketIds.filter(bucketId => newBuckets[bucketId] == null).forEach(bucketId => newBuckets[bucketId] = []);
						measureMethods.forEach(measure => {
							if (isQueryByEnum(measure)) {
								const key = buildEnumMeasureBucketKey(measure);
								if (newBuckets[key] == null) {
									newBuckets[key] = [];
								}
							} else if (isQueryByMeasure(measure)) {
								if (newBuckets[measure.method as string] == null) {
									newBuckets[measure.method as string] = [];
								}
							}
						});
						return newBuckets;
					});
					setLoading(false);
					onData([...existingValueBuckets, ...valueBuckets, ...existingMeasureBuckets, ...measureBuckets]);
				}, () => setLoading(false));
		};

		if (!loading && queue.length !== 0) {
			// something in queue, consume them
			// merge queue data
			const params = {
				valueBucketIds: [...new Set(queue.map(({params: {valueBucketIds}}) => valueBucketIds).flat())],
				measureMethods: [...new Set(queue.map(({params: {measureMethods}}) => measureMethods).flat())]
			};
			const onRetrieved = (buckets: Array<QueryBucket>) => {
				// callback
				queue.forEach(({params: {valueBucketIds, measureMethods}, onData}) => {
					onData([
						// eslint-disable-next-line
						...valueBucketIds.map(bucketId => buckets.find(bucket => bucket.bucketId == bucketId)).filter(isNotNull) as Array<QueryBucket>,
						...measureMethods.map(measure => {
							if (isQueryByEnum(measure)) {
								// eslint-disable-next-line
								return buckets.filter(bucket => isEnumMeasureBucket(bucket) && bucket.enumId == measure.enumId);
							} else if (isQueryByMeasure(measure)) {
								return buckets.filter(bucket => isMeasureBucket(bucket) && bucket.measure === measure.method);
							} else {
								return [];
							}
						}).flat()
					]);
				});
				// clear queue
				queue.length = 0;
			};
			onAskBuckets(params, onRetrieved);
		}

		on(InspectionEventTypes.ASK_BUCKETS, onAskBuckets);
		return () => {
			off(InspectionEventTypes.ASK_BUCKETS, onAskBuckets);
		};
	}, [on, off, fireGlobal, buckets, loading, queue]);

	return <Fragment/>;
};