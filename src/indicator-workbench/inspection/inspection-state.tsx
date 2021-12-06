import {fetchBucketsByIds, fetchBucketsByMethods} from '@/services/data/tuples/bucket';
import {isCategoryMeasureBucket, isEnumMeasureBucket} from '@/services/data/tuples/bucket-utils';
import {fetchIndicator, fetchIndicatorsForSelection} from '@/services/data/tuples/indicator';
import {IndicatorId, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {fetchInspection, listInspections, saveInspection} from '@/services/data/tuples/inspection';
import {Inspection, InspectionId} from '@/services/data/tuples/inspection-types';
import {QueryBucket, QueryByEnumMethod} from '@/services/data/tuples/query-bucket-types';
import {isQueryByEnum, isQueryByMeasure} from '@/services/data/tuples/query-bucket-utils';
import {QueryIndicator} from '@/services/data/tuples/query-indicator-types';
import {QueryInspection} from '@/services/data/tuples/query-inspection-types';
import {isNotNull} from '@/services/data/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {Fragment, useEffect, useState} from 'react';
import {useInspectionEventBus} from './inspection-event-bus';
import {AskBucketsParams, IndicatorForInspection, InspectionEventTypes} from './inspection-event-bus-types';

interface LoadedInspections {
	loaded: boolean;
	data: Array<QueryInspection>;
}

interface LoadedIndicators {
	loaded: boolean;
	data: Array<QueryIndicator>;
}

type LoadedIndicatorsForInspections = Record<IndicatorId, IndicatorForInspection>;

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

export const InspectionState = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useInspectionEventBus();
	const [inspections, setInspections] = useState<LoadedInspections>({loaded: false, data: []});
	const [indicators, setIndicators] = useState<LoadedIndicators>({loaded: false, data: []});
	const [indicatorsForInspections, setIndicatorsForInspections] = useState<LoadedIndicatorsForInspections>({});
	const [buckets, setBuckets] = useState<LoadedBuckets>({});
	// inspection related
	useEffect(() => {
		const onAskInspections = (onData: (inspections: Array<QueryInspection>) => void) => {
			if (inspections.loaded) {
				onData(inspections.data);
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await listInspections(),
					(inspections: Array<QueryInspection>) => {
						const sorted = inspections.sort((i1, i2) => {
							return (i1.name || '').localeCompare(i2.name || '', void 0, {
								sensitivity: 'base',
								caseFirst: 'upper'
							});
						});
						setInspections({loaded: true, data: sorted});
						onData(sorted);
					});
			}
		};
		on(InspectionEventTypes.ASK_INSPECTIONS, onAskInspections);
		return () => {
			off(InspectionEventTypes.ASK_INSPECTIONS, onAskInspections);
		};
	}, [on, off, fireGlobal, inspections.loaded, inspections.data]);
	useEffect(() => {
		const onAskInspection = (inspectionId: InspectionId, onData: (inspection: Inspection) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => fetchInspection(inspectionId),
				(inspection: Inspection) => {
					onData(inspection);
				});
		};
		on(InspectionEventTypes.ASK_INSPECTION, onAskInspection);
		return () => {
			off(InspectionEventTypes.ASK_INSPECTION, onAskInspection);
		};
	}, [on, off, fireGlobal]);
	useEffect(() => {
		const onSaveInspection = (inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveInspection(inspection),
				() => {
					// eslint-disable-next-line
					const index = inspections.data.findIndex(existing => existing.inspectionId == inspection.inspectionId);
					if (index !== -1) {
						inspections.data.splice(index, 1, inspection);
					} else {
						inspections.data.push(inspection);
					}
					fire(InspectionEventTypes.INSPECTION_SAVED, inspection);
					onSaved(inspection, true);
				},
				() => onSaved(inspection, false));
		};
		on(InspectionEventTypes.SAVE_INSPECTION, onSaveInspection);
		return () => {
			off(InspectionEventTypes.SAVE_INSPECTION, onSaveInspection);
		};
	}, [on, off, fire, fireGlobal, inspections.data]);
	// indicator related
	useEffect(() => {
		const onAskIndicators = (onData: (indicators: Array<QueryIndicator>) => void) => {
			if (indicators.loaded) {
				onData(indicators.data);
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchIndicatorsForSelection(''),
					(indicators: Array<QueryIndicator>) => {
						const sorted = indicators.sort((i1, i2) => {
							return (i1.name || '').localeCompare(i2.name || '', void 0, {
								sensitivity: 'base',
								caseFirst: 'upper'
							});
						});
						setIndicators({loaded: true, data: sorted});
						onData(sorted);
					});
			}
		};
		on(InspectionEventTypes.ASK_INDICATORS, onAskIndicators);
		return () => {
			off(InspectionEventTypes.ASK_INDICATORS, onAskIndicators);
		};
	}, [on, off, fireGlobal, indicators.loaded, indicators.data]);
	useEffect(() => {
		const onAskIndicator = (indicatorId: IndicatorId, onData: (indicator: IndicatorForInspection) => void) => {
			if (indicatorsForInspections[indicatorId] != null) {
				onData(indicatorsForInspections[indicatorId]);
			} else {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => {
						const {indicator, topic, enums} = await fetchIndicator(indicatorId);
						return {indicator, topic, enums};
					},
					({indicator, topic, enums}: IndicatorForInspection) => {
						setIndicatorsForInspections(ifi => {
							return {...ifi, [indicatorId]: {indicator, topic, enums: enums ?? []}};
						});
						onData({indicator, topic, enums: enums ?? []});
					});
			}
		};
		on(InspectionEventTypes.ASK_INDICATOR, onAskIndicator);
		return () => {
			off(InspectionEventTypes.ASK_INDICATOR, onAskIndicator);
		};
	}, [on, off, fireGlobal, indicatorsForInspections]);
	// bucket related
	useEffect(() => {
		const onAskBuckets = (
			{valueBucketIds, measureMethods}: AskBucketsParams,
			onData: (buckets: Array<QueryBucket>) => void
		) => {
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
				({
					 valueBuckets,
					 measureBuckets
				 }: { valueBuckets: Array<QueryBucket>; measureBuckets: Array<QueryBucket> }) => {
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
					onData([...existingValueBuckets, ...valueBuckets, ...existingMeasureBuckets, ...measureBuckets]);
				});
		};
		on(InspectionEventTypes.ASK_BUCKETS, onAskBuckets);
		return () => {
			off(InspectionEventTypes.ASK_BUCKETS, onAskBuckets);
		};
	}, [on, off, fireGlobal, buckets]);
	useEffect(() => {
		const onClearInspection = () => {
			fire(InspectionEventTypes.INSPECTION_CLEARED);
		};
		on(InspectionEventTypes.CLEAR_INSPECTION, onClearInspection);
		return () => {
			off(InspectionEventTypes.CLEAR_INSPECTION, onClearInspection);
		};
	}, [on, off, fire]);

	return <Fragment/>;
};