import BucketBackground from '@/assets/bucket-background.svg';
import {TuplePage} from '@/services/data/query/tuple-page';
import {fetchBucket, listBuckets, saveBucket} from '@/services/data/tuples/bucket';
import {Bucket} from '@/services/data/tuples/bucket-types';
import {isEnumMeasureBucket, isMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {TupleWorkbench} from '@/widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {useEffect} from 'react';
import {renderCard} from './card';
import {renderEditor} from './editor';
import {createBucket} from './utils';

const getKeyOfBucket = (bucket: QueryBucket) => bucket.bucketId;

const IndicatorWorkbenchBuckets = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateBucket = async () => {
			fire(TupleEventTypes.TUPLE_CREATED, createBucket());
		};
		const onDoEditBucket = async (queryBucket: QueryBucket) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => {
					const {bucket} = await fetchBucket(queryBucket.bucketId);
					return {tuple: bucket};
				},
				({tuple}) => {
					fire(TupleEventTypes.TUPLE_LOADED, tuple);
				});
		};
		const onDoSearchTopic = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listBuckets({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onSaveTopic = async (bucket: Bucket, onSaved: (bucket: Bucket, saved: boolean) => void) => {
			if (!bucket.name || !bucket.name.trim()) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					{Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_NAME_IS_REQUIRED}
				</AlertLabel>, () => {
					onSaved(bucket, false);
				});
				return;
			} else if (isMeasureBucket(bucket) && bucket.measure == null) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					{Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_MEASURE_IS_REQUIRED}
				</AlertLabel>, () => {
					onSaved(bucket, false);
				});
				return;
			} else if (isEnumMeasureBucket(bucket) && (bucket.enumId || '').trim().length === 0) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					{Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_ENUM_IS_REQUIRED}
				</AlertLabel>, () => {
					onSaved(bucket, false);
				});
				return;
			} else if (bucket.segments == null || bucket.segments.length === 0) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					{Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_SEGMENTS_IS_REQUIRED}
				</AlertLabel>, () => {
					onSaved(bucket, false);
				});
				return;
			}

			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveBucket(bucket),
				() => onSaved(bucket, true),
				() => onSaved(bucket, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateBucket);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditBucket);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchTopic);
		on(TupleEventTypes.SAVE_TUPLE, onSaveTopic);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateBucket);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditBucket);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchTopic);
			off(TupleEventTypes.SAVE_TUPLE, onSaveTopic);
		};
	}, [on, off, fire, fireGlobal]);

	return <TupleWorkbench title={Lang.INDICATOR_WORKBENCH.BUCKET.TITLE}
	                       createButtonLabel={Lang.INDICATOR_WORKBENCH.BUCKET.CREATE_BUCKET} canCreate={true}
	                       searchPlaceholder={Lang.PLAIN.FIND_BUCKET_PLACEHOLDER}
	                       tupleLabel={Lang.INDICATOR_WORKBENCH.BUCKET.LABEL}
	                       newTupleLabelPrefix={Lang.INDICATOR_WORKBENCH.BUCKET.NEW_BUCKET_PREFIX}
	                       existingTupleLabelPrefix={Lang.INDICATOR_WORKBENCH.BUCKET.EXISTING_BUCKET_PREFIX}
	                       tupleImage={BucketBackground} tupleImagePosition="left 120px"
	                       renderEditor={renderEditor}
	                       confirmEditButtonLabel={Lang.ACTIONS.CONFIRM}
	                       closeEditButtonLabel={Lang.ACTIONS.CLOSE}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfBucket}
	/>;
};

const IndicatorWorkbenchBucketsIndex = () => {
	return <TupleEventBusProvider>
		<IndicatorWorkbenchBuckets/>
	</TupleEventBusProvider>;
};

export default IndicatorWorkbenchBucketsIndex;