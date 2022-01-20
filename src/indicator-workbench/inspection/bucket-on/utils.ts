import {BucketType} from '@/services/data/tuples/bucket-types';
import {
	isCategoryMeasureBucket,
	isEnumMeasureBucket,
	isMeasureBucket,
	isNumericValueMeasureBucket
} from '@/services/data/tuples/bucket-utils';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {isTimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
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
		{value: InspectMeasureOn.NONE, label: Lang.INDICATOR_WORKBENCH.INSPECTION.NO_BUCKET_ON},
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

export const buildBucketOptions = (inspection: Inspection, topic: TopicForIndicator, buckets: Array<QueryBucket>): { available: boolean, options: Array<DropdownOption> } => {
	if (inspection.measureOn == null || inspection.measureOn === InspectMeasureOn.NONE) {
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

		const availableBuckets = [
			...new Set(measures.map(measure => buckets.filter(bucket => {
				if (!isMeasureBucket(bucket)) {
					return false;
				}
				if (bucket.measure !== measure) {
					return false;
				}

				// eslint-disable-next-line
				return !isEnumMeasureBucket(bucket) || bucket.enumId == factor.enumId;
			})).flat())
		];
		const hasCategoryBucket = availableBuckets.some(bucket => isCategoryMeasureBucket(bucket) || isEnumMeasureBucket(bucket));

		return {
			available: true,
			options: [
				...(hasCategoryBucket ? [{
					value: '',
					label: Lang.INDICATOR_WORKBENCH.INSPECTION.MEASURE_ON_NATURALLY
				}] : []),
				...availableBuckets.map(bucket => {
					return {
						value: bucket.bucketId,
						label: bucket.name || 'Noname Bucket'
					};
				}).sort((o1, o2) => {
					return o1.label.localeCompare(o2.label, void 0, {sensitivity: 'base', caseFirst: 'upper'});
				})
			]
		};
	} else {
		return {available: true, options: []};
	}
};