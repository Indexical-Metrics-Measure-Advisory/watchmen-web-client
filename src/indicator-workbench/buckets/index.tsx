import BucketBackground from '@/assets/bucket-background.svg';
import {TuplePage} from '@/services/data/query/tuple-page';
import {fetchBucket, listBuckets, saveBucket} from '@/services/data/tuples/bucket';
import {Bucket, OtherCategorySegmentValue} from '@/services/data/tuples/bucket-types';
import {
	isCategorySegmentsHolder,
	isEnumMeasureBucket,
	isMeasureBucket,
	isNumericSegmentsHolder
} from '@/services/data/tuples/bucket-utils';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {isXaNumber} from '@/services/utils';
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

const validate = (bucket: Bucket): string | true => {
	if (!bucket.name || !bucket.name.trim()) {
		return Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_NAME_IS_REQUIRED;
	} else if (isMeasureBucket(bucket) && bucket.measure == null) {
		return Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_MEASURE_IS_REQUIRED;
	} else if (isEnumMeasureBucket(bucket) && (bucket.enumId || '').trim().length === 0) {
		return Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_ENUM_IS_REQUIRED;
	} else if (bucket.segments == null || bucket.segments.length === 0) {
		return Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_SEGMENTS_IS_REQUIRED;
	} else if (bucket.segments.some(segment => (segment.name ?? '').trim().length === 0)) {
		return Lang.INDICATOR_WORKBENCH.BUCKET.BUCKET_SEGMENT_NAME_IS_REQUIRED;
	} else if (isNumericSegmentsHolder(bucket)) {
		// clone values
		// check continuous
		let message = null;
		const lastIndex = bucket.segments.length - 1;
		// clone array to keep original
		[...bucket.segments.map(({value}) => value)]
			.sort(({min: min1}, {min: min2}) => {
				return min1 == null ? -1 : (min2 == null ? 1 : (min1 + '').localeCompare(min2 + '', void 0, {numeric: true}));
			})
			.some(({min, max}, index, values) => {
				if (index === 0) {
					// first one, min must be empty
					if (min != null) {
						message = Lang.INDICATOR_WORKBENCH.BUCKET.EMPTY_FIRST_MIN_OF_NUMERIC_SEGMENT;
						return true;
					}
					if (max == null) {
						message = Lang.INDICATOR_WORKBENCH.BUCKET.NOT_EMPTY_FIRST_MAX_OF_NUMERIC_SEGMENT;
						return true;
					} else if (!isXaNumber(max)) {
						message = Lang.INDICATOR_WORKBENCH.BUCKET.BE_NUMERIC_OF_NUMERIC_SEGMENT;
						return true;
					}
					return false;
				}

				if (index !== lastIndex) {
					if (min == null || max == null) {
						message = Lang.INDICATOR_WORKBENCH.BUCKET.NOT_EMPTY_OF_NUMERIC_SEGMENT;
						return true;
					}
					if (!isXaNumber(min) || !isXaNumber(max)) {
						message = Lang.INDICATOR_WORKBENCH.BUCKET.BE_NUMERIC_OF_NUMERIC_SEGMENT;
						return true;
					}
					if ((min + '').localeCompare((max + ''), void 0, {numeric: true}) >= 0) {
						message = Lang.INDICATOR_WORKBENCH.BUCKET.MIN_MAX_ORDER_OF_NUMERIC_SEGMENT;
						return true;
					}
				} else {
					if (min == null) {
						message = Lang.INDICATOR_WORKBENCH.BUCKET.NOT_EMPTY_LAST_MIN_OF_NUMERIC_SEGMENT;
						return true;
					}
					if (!isXaNumber(min)) {
						message = Lang.INDICATOR_WORKBENCH.BUCKET.BE_NUMERIC_OF_NUMERIC_SEGMENT;
						return true;
					}
					// last one, max must be empty
					if (max != null) {
						message = Lang.INDICATOR_WORKBENCH.BUCKET.EMPTY_LAST_MAX_OF_NUMERIC_SEGMENT;
						return true;
					}
				}
				if (Number(min) > Number(values[index - 1].max)) {
					message = Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_LACK_EXISTS_OF_NUMERIC_SEGMENT;
					return true;
				} else if (Number(min) < Number(values[index - 1].max)) {
					message = Lang.INDICATOR_WORKBENCH.BUCKET.RANGE_OVERLAP_EXISTS_OF_NUMERIC_SEGMENT;
					return true;
				}
				return false;
			});
		if (message) {
			return message;
		}
	} else if (isCategorySegmentsHolder(bucket)) {
		if (bucket.segments.some(segment => segment.value == null || segment.value.length === 0)) {
			return Lang.INDICATOR_WORKBENCH.BUCKET.NOT_EMPTY_OF_CATEGORY_SEGMENT;
		} else if (bucket.segments.some(segment => segment.value.length !== [...new Set(segment.value)].length)) {
			return Lang.INDICATOR_WORKBENCH.BUCKET.NO_DUPLICATED_OF_CATEGORY_SEGMENT;
		} else if (bucket.segments.filter(segment => segment.value.includes(OtherCategorySegmentValue)).length > 1) {
			return Lang.INDICATOR_WORKBENCH.BUCKET.ONE_OTHERS_SEGMENT_OF_CATEGORY_SEGMENT;
		} else if (bucket.segments.some(segment => segment.value.filter(v => v === OtherCategorySegmentValue).length > 1)) {
			return Lang.INDICATOR_WORKBENCH.BUCKET.ONE_OTHERS_VALUE_OF_CATEGORY_SEGMENT;
		}

		const categories = bucket.segments.reduce((categories, segment) => {
			segment.value.forEach(v => {
				const key = `${v}`;
				if (categories[key] != null) {
					categories[key] = categories[key] + 1;
				} else {
					categories[key] = 1;
				}
			});
			return categories;
		}, {} as Record<string, number>);
		if (Object.keys(categories).some(key => categories[key] > 1)) {
			return Lang.INDICATOR_WORKBENCH.BUCKET.NO_SHARED_OF_CATEGORY_SEGMENT;
		}
	}

	return true;
};

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
		const onDoSearchBucket = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listBuckets({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		const onSaveBucket = async (bucket: Bucket, onSaved: (bucket: Bucket, saved: boolean) => void) => {
			const validation = validate(bucket);
			if (validation !== true) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{validation}</AlertLabel>, () => onSaved(bucket, false));
				return;
			}

			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveBucket(bucket),
				() => onSaved(bucket, true),
				() => onSaved(bucket, false));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateBucket);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditBucket);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchBucket);
		on(TupleEventTypes.SAVE_TUPLE, onSaveBucket);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateBucket);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditBucket);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchBucket);
			off(TupleEventTypes.SAVE_TUPLE, onSaveBucket);
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