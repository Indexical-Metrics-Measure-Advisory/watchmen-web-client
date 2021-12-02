import {BucketType} from '@/services/data/tuples/bucket-types';
import {
	isCategoryMeasureBucket,
	isEnumMeasureBucket,
	isMeasureBucket,
	isNumericValueMeasureBucket
} from '@/services/data/tuples/bucket-utils';
import {Indicator, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {detectMeasures, isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {
	QueryBucket,
	QueryByBucketMethod,
	QueryByEnumMethod,
	QueryByMeasureMethod
} from '@/services/data/tuples/query-bucket-types';
import {isQueryByEnum, isQueryByMeasure} from '@/services/data/tuples/query-bucket-utils';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const couldMeasureOnIndicatorValue = (indicator: Indicator, buckets: Array<QueryBucket>) => {
	return indicator.factorId != null
		&& indicator.valueBuckets != null
		&& indicator.valueBuckets.length !== 0
		&& buckets.some(bucket => bucket.type === BucketType.VALUE);
};

export const buildMeasureOnOptions = (indicator: Indicator, topic: TopicForIndicator, buckets: Array<QueryBucket>): Array<DropdownOption> => {
	const canMeasureOnIndicatorValue = couldMeasureOnIndicatorValue(indicator, buckets);

	return [
		...canMeasureOnIndicatorValue ? [{
			value: InspectMeasureOn.VALUE,
			label: Lang.INDICATOR_WORKBENCH.INSPECTION.MEASURE_ON_VALUE
		}] : [],
		...(topic.factors || []).filter(factor => {
			if (factor.enumId != null) {
				// eslint-disable-next-line
				return buckets.some(bucket => isEnumMeasureBucket(bucket) && bucket.enumId == factor.enumId);
			} else {
				const measures = tryToTransformToMeasures(factor).filter(measure => !isTimePeriodMeasure(measure));
				if (measures.length === 0) {
					return false;
				}

				return measures.some(measure => {
					return buckets.some(bucket => {
						if (isNumericValueMeasureBucket(bucket)) {
							return bucket.measure === measure;
						} else if (isCategoryMeasureBucket(bucket)) {
							return bucket.measure === measure;
						}
						return false;
					});
				});
			}
		}).map(factor => {
			return {value: factor.factorId, label: factor.label || factor.name || 'Noname Factor'};
		})
	];
};

export const buildBucketsAskingParams = (indicator: Indicator, topic: TopicForIndicator) => {
	return {
		valueBucketIds: indicator.valueBuckets ?? [],
		measureMethods: detectMeasures(topic, (measure: MeasureMethod) => !isTimePeriodMeasure(measure))
			.map(({factorId, method}) => {
				if (method === MeasureMethod.ENUM) {
					return {
						method: MeasureMethod.ENUM,
						// eslint-disable-next-line
						enumId: topic.factors.find(factor => factor.factorId == factorId)?.enumId
					} as QueryByEnumMethod;
				} else {
					return {method} as QueryByMeasureMethod;
				}
			}).reduce((all, method) => {
				if (isQueryByEnum(method)) {
					// eslint-disable-next-line
					if (all.every(existing => !isQueryByEnum(existing) || existing.enumId != method.enumId)) {
						all.push(method);
					}
				} else if (isQueryByMeasure(method)) {
					if (all.every(existing => existing.method !== method.method)) {
						all.push(method);
					}
				}
				return all;
			}, [] as Array<QueryByBucketMethod>)
	};
};

export const buildBucketOptions = (inspection: Inspection, topic: TopicForIndicator, buckets: Array<QueryBucket>): { available: boolean, options: Array<DropdownOption> } => {
	if (inspection.measureOn == null) {
		return {available: false, options: []};
	} else if (inspection.measureOn === InspectMeasureOn.VALUE) {
		return {
			available: true,
			options: buckets.filter(bucket => bucket.type === BucketType.VALUE)
				.map(bucket => {
					return {
						value: bucket.bucketId,
						label: bucket.name || 'Noname Bucket'
					};
				}).sort((o1, o2) => {
					return o1.label.localeCompare(o2.label, void 0, {sensitivity: 'base', caseFirst: 'upper'});
				})
		};
	} else if (inspection.measureOn === InspectMeasureOn.OTHER && inspection.measureOnFactorId == null) {
		return {available: false, options: []};
	} else if (inspection.measureOn === InspectMeasureOn.OTHER && inspection.measureOnFactorId != null) {
		// eslint-disable-next-line
		const factor = (topic.factors || []).find(factor => factor.factorId == inspection.measureOnFactorId);
		if (factor == null) {
			return {available: true, options: []};
		}
		const measures = tryToTransformToMeasures(factor).filter(measure => !isTimePeriodMeasure(measure));
		if (measures.length === 0) {
			return {available: true, options: []};
		}

		return {
			available: true,
			options: [...new Set(measures.map(measure => buckets.filter(bucket => {
				return isMeasureBucket(bucket) && bucket.measure === measure;
			})).flat())].map(bucket => {
				return {
					value: bucket.bucketId,
					label: bucket.name || 'Noname Bucket'
				};
			}).sort((o1, o2) => {
				return o1.label.localeCompare(o2.label, void 0, {sensitivity: 'base', caseFirst: 'upper'});
			})
		};
	} else {
		return {available: true, options: []};
	}
};