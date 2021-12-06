import {Factor, FactorId} from '@/services/data/tuples/factor-types';
import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {isTimePeriodMeasure, TimePeriodMeasure, tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {
	Inspection,
	InspectionAmPmRange,
	InspectionDayKindRange,
	InspectionDayOfMonthRange,
	InspectionDayOfWeekRange,
	InspectionHalfMonthRange,
	InspectionHalfWeekRange,
	InspectionHalfYearRange,
	InspectionHourKindRange,
	InspectionHourRange,
	InspectionMonthRange,
	InspectionQuarterRange,
	InspectionTenDaysRange,
	InspectionTimeRange,
	InspectionWeekOfMonthRange,
	InspectionWeekOfYearRange,
	InspectionYearRange
} from '@/services/data/tuples/inspection-types';
import {
	isInspectionAmPmRange,
	isInspectionDayKindRange,
	isInspectionDayOfMonthRange,
	isInspectionDayOfWeekRange,
	isInspectionHalfMonthRange,
	isInspectionHalfWeekRange,
	isInspectionHalfYearRange,
	isInspectionHourKindRange,
	isInspectionHourRange,
	isInspectionMonthRange,
	isInspectionQuarterRange,
	isInspectionTenDaysRange,
	isInspectionWeekOfMonthRange,
	isInspectionWeekOfYearRange,
	isInspectionYearRange
} from '@/services/data/tuples/inspection-utils';
import {TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {isNotNull} from '@/services/data/utils';
import {MeasureMethodLabels} from '@/widgets/basic/measure-method-label';
import {DropdownOption} from '@/widgets/basic/types';
import {getLangLabel, Lang} from '@/widgets/langs';
import {MeasureMethodSort} from '../../utils/sort';

export const buildTimePeriodOptions = (topic: TopicForIndicator): Array<DropdownOption> => {
	return (topic.factors || []).filter(factor => {
		const measures = tryToTransformToMeasures(factor);
		return measures.some(measure => isTimePeriodMeasure(measure));
	}).map(factor => {
		return {
			value: factor.factorId,
			label: factor.label || factor.name || 'Noname Factor'
		};
	});
};

const TimeMeasureMethodSort: Record<TimePeriodMeasure, number> = {
	[MeasureMethod.YEAR]: 1,
	[MeasureMethod.HALF_YEAR]: 2,
	[MeasureMethod.QUARTER]: 3,
	[MeasureMethod.MONTH]: 4,
	[MeasureMethod.HALF_MONTH]: 5,
	[MeasureMethod.TEN_DAYS]: 6,
	[MeasureMethod.WEEK_OF_YEAR]: 7,
	[MeasureMethod.WEEK_OF_MONTH]: 8,
	[MeasureMethod.HALF_WEEK]: 9,
	[MeasureMethod.DAY_OF_MONTH]: 10,
	[MeasureMethod.DAY_OF_WEEK]: 11,
	[MeasureMethod.DAY_KIND]: 12,
	[MeasureMethod.HOUR]: 13,
	[MeasureMethod.HOUR_KIND]: 14,
	[MeasureMethod.AM_PM]: 15
};
export const tryToGetTopTimeMeasure = (measures: Array<MeasureMethod>): TimePeriodMeasure | undefined => {
	return measures.filter(isTimePeriodMeasure).sort((m1, m2) => {
		return TimeMeasureMethodSort[m1] - TimeMeasureMethodSort[m2];
	})[0];
};

export const tryToGetTopTimeMeasureByFactor = (topic?: TopicForIndicator, factorId?: FactorId): TimePeriodMeasure | undefined => {
	if (topic == null || factorId == null) {
		return (void 0);
	}
	// eslint-disable-next-line
	const factor = (topic?.factors || []).find(factor => factor.factorId == factorId);
	if (factor != null) {
		return tryToGetTopTimeMeasure(tryToTransformToMeasures(factor));
	} else {
		return (void 0);
	}
};

export const getValidRanges = (inspection?: Inspection): Array<InspectionTimeRange> => {
	if (inspection == null) {
		return [];
	}

	if (inspection.firstTimeRanges == null || inspection.firstTimeRanges.length === 0) {
		return [];
	}

	return inspection.firstTimeRanges.filter(isNotNull);
};
const acceptAll = <R extends InspectionTimeRange>(range: InspectionTimeRange): range is R => true;
export const getValidRangesByType = <R extends InspectionTimeRange>(inspection?: Inspection, accept: (range: InspectionTimeRange) => range is R = acceptAll): Array<R> => {
	return getValidRanges(inspection).filter(accept).filter(range => range.value != null);
};
export const getValidYearRanges = (inspection?: Inspection): Array<InspectionYearRange> => getValidRangesByType(inspection, isInspectionYearRange);
export const getValidHalfYearRanges = (inspection?: Inspection): Array<InspectionHalfYearRange> => getValidRangesByType(inspection, isInspectionHalfYearRange);
export const getValidQuarterRanges = (inspection?: Inspection): Array<InspectionQuarterRange> => getValidRangesByType(inspection, isInspectionQuarterRange);
export const getValidMonthRanges = (inspection?: Inspection): Array<InspectionMonthRange> => getValidRangesByType(inspection, isInspectionMonthRange);
export const getValidHalfMonthRanges = (inspection?: Inspection): Array<InspectionHalfMonthRange> => getValidRangesByType(inspection, isInspectionHalfMonthRange);
export const getValidTenDaysRanges = (inspection?: Inspection): Array<InspectionTenDaysRange> => getValidRangesByType(inspection, isInspectionTenDaysRange);
export const getValidWeekOfYearRanges = (inspection?: Inspection): Array<InspectionWeekOfYearRange> => getValidRangesByType(inspection, isInspectionWeekOfYearRange);
export const getValidWeekOfMonthRanges = (inspection?: Inspection): Array<InspectionWeekOfMonthRange> => getValidRangesByType(inspection, isInspectionWeekOfMonthRange);
export const getValidHalfWeekRanges = (inspection?: Inspection): Array<InspectionHalfWeekRange> => getValidRangesByType(inspection, isInspectionHalfWeekRange);
export const getValidDayOfMonthRanges = (inspection?: Inspection): Array<InspectionDayOfMonthRange> => getValidRangesByType(inspection, isInspectionDayOfMonthRange);
export const getValidDayOfWeekRanges = (inspection?: Inspection): Array<InspectionDayOfWeekRange> => getValidRangesByType(inspection, isInspectionDayOfWeekRange);
export const getValidDayKindRanges = (inspection?: Inspection): Array<InspectionDayKindRange> => getValidRangesByType(inspection, isInspectionDayKindRange);
export const getValidHourRanges = (inspection?: Inspection): Array<InspectionHourRange> => getValidRangesByType(inspection, isInspectionHourRange);
export const getValidHourKindRanges = (inspection?: Inspection): Array<InspectionHourKindRange> => getValidRangesByType(inspection, isInspectionHourKindRange);
export const getValidAmPmRanges = (inspection?: Inspection): Array<InspectionAmPmRange> => getValidRangesByType(inspection, isInspectionAmPmRange);

const isOneRangeOnly = (inspection?: Inspection): boolean => {
	const ranges = getValidRanges(inspection);
	if (ranges.length === 0) {
		return false;
	}
	return [...new Set(ranges.map(range => range.value))].length === 1;
};

const buildNoTimeMeasureOption = (): DropdownOption => {
	return {
		value: {factorId: null, measure: null},
		label: Lang.INDICATOR_WORKBENCH.INSPECTION.NO_TIME_MEASURE,
		key: ''
	};
};

const buildMeasureOptions = (factor: Factor, measures: Array<MeasureMethod>): Array<DropdownOption> => {
	return measures.map(measure => {
		return {
			value: {factorId: factor.factorId, measure},
			label: () => {
				// @ts-ignore
				const measureLabel = getLangLabel(MeasureMethodLabels[measure].props.labelKey);
				const factorLabel = factor.label || factor.name || 'Noname Factor';
				return {
					node: <>{MeasureMethodLabels[measure]} - {factorLabel}</>,
					label: [measureLabel, factorLabel].join(',')
				};
			},
			key: `${factor.factorId}-${measure}`
		};
	});
};

const buildMeasureOptionsOnOtherFactors = (topic: TopicForIndicator, firstFactor: Factor): Array<DropdownOption> => {
	return (topic.factors || [])
		.filter(factor => factor !== firstFactor)
		.map(factor => ({factor, measures: tryToTransformToMeasures(factor)}))
		.filter(({measures}) => measures.some(measure => isTimePeriodMeasure(measure)))
		.map(({factor, measures}) => {
			return {
				factor,
				measures: measures.filter(measure => isTimePeriodMeasure(measure))
					.sort((m1, m2) => MeasureMethodSort[m1] - MeasureMethodSort[m2])
			};
		}).sort(({factor: f1}, {factor: f2}) => {
			return (f1.label || f1.name || '').localeCompare(f2.label || f2.name || '', void 0, {
				sensitivity: 'base',
				caseFirst: 'upper'
			});
		}).map(({factor, measures}) => {
			return buildMeasureOptions(factor, measures);
		}).flat();
};

export const buildTimeMeasureOptions = (inspection: Inspection, topic: TopicForIndicator, firstFactor?: Factor): Array<DropdownOption> => {
	if (topic == null || firstFactor == null) {
		return [];
	}

	const availableFirstTimeMeasures = tryToTransformToMeasures(firstFactor);
	const firstTimeMeasure = inspection.firstTimeMeasure;
	const oneRangeOnly = isOneRangeOnly(inspection);
	console.log(oneRangeOnly);
	return [
		buildNoTimeMeasureOption(),
		// measure on factor itself.
		// when filter is only one value, top time measure is not applicable since only one group will be addressed
		...buildMeasureOptions(firstFactor, oneRangeOnly ? availableFirstTimeMeasures.filter(measure => measure !== firstTimeMeasure) : availableFirstTimeMeasures),
		...buildMeasureOptionsOnOtherFactors(topic, firstFactor)
	];
};