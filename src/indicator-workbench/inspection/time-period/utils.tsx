import {Factor} from '@/services/data/tuples/factor-types';
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
import {Lang} from '@/widgets/langs';

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

export const getValidRanges = (inspection?: Inspection): Array<InspectionTimeRange> => {
	if (inspection == null) {
		return [];
	}

	if (inspection.timeRange == null || inspection.timeRange.length === 0) {
		return [];
	}

	return inspection.timeRange.filter(isNotNull);
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

export const isOneYearOnly = (inspection?: Inspection): boolean => {
	const ranges = getValidYearRanges(inspection);
	if (ranges.length === 0) {
		return false;
	}
	return [...new Set(ranges.map(range => range.value))].length === 1;
};

const buildNoTimeMeasureOption = (): DropdownOption => {
	return {
		value: '',
		label: Lang.INDICATOR_WORKBENCH.INSPECTION.NO_TIME_MEASURE
	};
};
const buildMeasureOptions = (measures: Array<MeasureMethod>): Array<DropdownOption> => {
	return measures.map(measure => {
		return {
			value: measure,
			label: MeasureMethodLabels[measure]
		};
	});
};

export const buildTimeMeasureOptions = (inspection: Inspection, factor?: Factor): { annual: boolean, options: Array<DropdownOption> } => {
	if (factor == null) {
		return {annual: false, options: []};
	}

	const measures = tryToTransformToMeasures(factor);
	if (measures.includes(MeasureMethod.YEAR)) {
		const oneYearOnly = isOneYearOnly(inspection);
		const options = buildMeasureOptions(oneYearOnly ? measures.filter(measure => measure !== MeasureMethod.YEAR) : measures);
		return {
			annual: true,
			options: [
				buildNoTimeMeasureOption(),
				...options
			]
		};
	} else {
		return {
			annual: false,
			options: [
				buildNoTimeMeasureOption(),
				...buildMeasureOptions(measures)
			]
		};
	}
};