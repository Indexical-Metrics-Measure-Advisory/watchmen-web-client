import {InspectionTimeRange, InspectionTimeRangeType, InspectionYearRange} from './inspection-types';

export const isInspectionYearRange = (range: InspectionTimeRange): range is InspectionYearRange => {
	return range.type === InspectionTimeRangeType.YEAR;
};