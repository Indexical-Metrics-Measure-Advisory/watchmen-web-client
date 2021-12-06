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
import {isNotNull} from '@/services/data/utils';

export const getValidRanges = (inspection?: Inspection): Array<InspectionTimeRange> => {
	if (inspection == null) {
		return [];
	}

	if (inspection.timeRanges == null || inspection.timeRanges.length === 0) {
		return [];
	}

	return inspection.timeRanges.filter(isNotNull);
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