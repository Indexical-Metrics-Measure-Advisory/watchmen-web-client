import {ReportFilter, ReportFilterExpression, ReportFilterJoint} from './report-types';

export const isJointFilter = (filter: ReportFilter): filter is ReportFilterJoint => {
	return !!(filter as any).jointType;
};
export const isExpressionFilter = (filter: ReportFilter): filter is ReportFilterExpression => {
	return !!(filter as any).operator;
};