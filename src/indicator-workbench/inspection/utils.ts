import {Indicator, IndicatorAggregateArithmetic, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {detectMeasures, isTimePeriodMeasure} from '@/services/data/tuples/indicator-utils';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {QueryByBucketMethod, QueryByEnumMethod, QueryByMeasureMethod} from '@/services/data/tuples/query-bucket-types';
import {isQueryByEnum, isQueryByMeasure} from '@/services/data/tuples/query-bucket-utils';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime, isNotNull} from '@/services/data/utils';
import {Lang} from '@/widgets/langs';

export const createInspection = (): Inspection => {
	return {
		inspectionId: generateUuid(),
		name: '',
		aggregateArithmetics: [IndicatorAggregateArithmetic.SUM],
		measureOn: InspectMeasureOn.NONE,
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	} as Inspection;
};

export const AggregateArithmeticLabel: Record<IndicatorAggregateArithmetic, string> = {
	[IndicatorAggregateArithmetic.COUNT]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_COUNT,
	[IndicatorAggregateArithmetic.SUM]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_SUM,
	[IndicatorAggregateArithmetic.AVG]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_AVG,
	[IndicatorAggregateArithmetic.MAX]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_MAX,
	[IndicatorAggregateArithmetic.MIN]: Lang.INDICATOR_WORKBENCH.INSPECTION.VALUE_TRANSFORM_MIN
};

export enum InspectionInvalidReason {
	NAME_IS_REQUIRED = 'name-is-required',
	INDICATOR_IS_REQUIRED = 'indicator-is-required',
	AGGREGATE_ARITHMETIC_IS_REQUIRED = 'aggregate-arithmetic-is-required',
	MEASURE_IS_REQUIRED = 'measure-is-required',
	MEASURE_ON_TIME_IS_REQUIRED = 'measure-on-time-is-required',
	INDICATOR_BUCKET_IS_REQUIRED = 'indicator-bucket-is-required',
	MEASURE_BUCKET_IS_REQUIRED = 'measure-bucket-is-required'
}

export const validateInspection = (options: {
	inspection?: Inspection;
	success: (inspection: Inspection) => void;
	fail: (reason: InspectionInvalidReason) => void;
}) => {
	const {inspection, success, fail} = options;

	if (inspection?.indicatorId == null) {
		fail(InspectionInvalidReason.INDICATOR_IS_REQUIRED);
		return;
	}
	if (inspection.aggregateArithmetics == null || inspection.aggregateArithmetics.length === 0) {
		fail(InspectionInvalidReason.AGGREGATE_ARITHMETIC_IS_REQUIRED);
		return;
	}
	if (inspection.measureOnTimeFactorId == null
		&& (inspection.measureOn == null || inspection.measureOn === InspectMeasureOn.NONE)) {
		fail(InspectionInvalidReason.MEASURE_IS_REQUIRED);
		return;
	}
	if (inspection.measureOnTimeFactorId != null && inspection.measureOnTime == null) {
		fail(InspectionInvalidReason.MEASURE_ON_TIME_IS_REQUIRED);
		return;
	}
	if (inspection.measureOn === InspectMeasureOn.VALUE && inspection.measureOnBucketId == null) {
		fail(InspectionInvalidReason.INDICATOR_BUCKET_IS_REQUIRED);
		return;
	}
	if (inspection.measureOn === InspectMeasureOn.OTHER && inspection.measureOnFactorId == null) {
		fail(InspectionInvalidReason.MEASURE_BUCKET_IS_REQUIRED);
		return;
	}

	if (inspection.name == null || inspection.name.trim().length === 0) {
		fail(InspectionInvalidReason.NAME_IS_REQUIRED);
		return;
	}
	success(inspection);
};

export const buildBucketsAskingParams = (indicator: Indicator, topic: TopicForIndicator) => {
	return {
		valueBucketIds: indicator.valueBuckets ?? [],
		measureMethods: detectMeasures(topic, (measure: MeasureMethod) => !isTimePeriodMeasure(measure))
			.map(({factorId, method}) => {
				if (method === MeasureMethod.ENUM) {
					// eslint-disable-next-line
					const enumId = topic.factors.find(factor => factor.factorId == factorId)?.enumId;
					if (enumId == null || enumId.trim().length === 0) {
						return null;
					} else {
						return {method: MeasureMethod.ENUM, enumId} as QueryByEnumMethod;
					}
				} else {
					return {method} as QueryByMeasureMethod;
				}
			})
			.filter(isNotNull)
			.reduce((all, method) => {
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
