import {Indicator, IndicatorAggregateArithmetic, MeasureMethod} from '@/services/data/tuples/indicator-types';
import {detectMeasures, isTimePeriodMeasure} from '@/services/data/tuples/indicator-utils';
import {Inspection, InspectMeasureOn} from '@/services/data/tuples/inspection-types';
import {QueryByBucketMethod, QueryByEnumMethod, QueryByMeasureMethod} from '@/services/data/tuples/query-bucket-types';
import {isQueryByEnum, isQueryByMeasure} from '@/services/data/tuples/query-bucket-utils';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';

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

export enum InspectionInvalidReason {
	INDICATOR_IS_REQUIRED = 'indicator-is-required',
	AGGREGATE_ARITHMETICS_IS_REQUIRED = 'aggregate-arithmetics-is-required',
	MEASURE_IS_REQUIRED = 'measure-is-required',
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
		fail(InspectionInvalidReason.AGGREGATE_ARITHMETICS_IS_REQUIRED);
		return;
	}
	if (inspection.measureOnTimeFactorId == null
		&& (inspection.measureOn == null || inspection.measureOn === InspectMeasureOn.NONE)) {
		fail(InspectionInvalidReason.MEASURE_IS_REQUIRED);
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
	success(inspection);
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
