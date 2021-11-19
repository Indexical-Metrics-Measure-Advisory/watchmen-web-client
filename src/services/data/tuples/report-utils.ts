import {ChartDef} from './chart-def/chart-def-types';
import {ComputedParameter, ParameterComputeType, ParameterExpressionOperator} from './factor-calculator-types';
import {isDateFactor, isEnumFactor, isNumericFactor} from './factor-calculator-utils';
import {Factor, FactorType} from './factor-types';
import {isComputedParameter, isConstantParameter, isTopicFactorParameter} from './parameter-utils';
import {
	Report,
	ReportFilter,
	ReportFilterExpression,
	ReportFilterJoint,
	ReportFunnel,
	ReportFunnelType
} from './report-types';
import {Subject} from './subject-types';
import {Topic} from './topic-types';
import {generateUuid} from './utils';

export const isJointFilter = (filter: ReportFilter): filter is ReportFilterJoint => {
	return !!(filter as any).jointType;
};
export const isExpressionFilter = (filter: ReportFilter): filter is ReportFilterExpression => {
	return !!(filter as any).operator;
};

const createFunnel = (columnId: string, type: ReportFunnelType): ReportFunnel => {
	return {funnelId: generateUuid(), columnId, type, range: false, enabled: false};
};

export const detectFunnelTypeOnFactor = (factor: Factor): ReportFunnelType | Array<ReportFunnelType> | undefined => {
	switch (true) {
		case isNumericFactor(factor):
			return ReportFunnelType.NUMERIC;
		case isEnumFactor(factor):
			return ReportFunnelType.ENUM;
		case isDateFactor(factor):
			return [ReportFunnelType.DATE, ReportFunnelType.YEAR, ReportFunnelType.MONTH];
		case factor.type === FactorType.YEAR:
			return ReportFunnelType.YEAR;
		case factor.type === FactorType.HALF_YEAR:
			return ReportFunnelType.HALF_YEAR;
		case factor.type === FactorType.QUARTER:
			return ReportFunnelType.QUARTER;
		case factor.type === FactorType.MONTH:
			return ReportFunnelType.MONTH;
		case factor.type === FactorType.HALF_MONTH:
			return ReportFunnelType.HALF_MONTH;
		case factor.type === FactorType.TEN_DAYS:
			return ReportFunnelType.TEN_DAYS;
		case factor.type === FactorType.WEEK_OF_MONTH:
			return ReportFunnelType.WEEK_OF_MONTH;
		case factor.type === FactorType.DAY_KIND:
			return ReportFunnelType.DAY_KIND;
		case factor.type === FactorType.DAY_OF_WEEK:
			return ReportFunnelType.DAY_OF_WEEK;
		case factor.type === FactorType.TIME:
			return [ReportFunnelType.HOUR];
		case factor.type === FactorType.HOUR:
			return ReportFunnelType.HOUR;
		case factor.type === FactorType.HOUR_KIND:
			return ReportFunnelType.HOUR_KIND;
		case factor.type === FactorType.AM_PM:
			return ReportFunnelType.AM_PM;
		default:
			return (void 0);
	}
};
export const detectFunnelTypeOnParameter = (parameter: ComputedParameter): ReportFunnelType | undefined => {
	const {type} = parameter;
	switch (type) {
		case ParameterComputeType.ADD:
		case ParameterComputeType.SUBTRACT:
		case ParameterComputeType.MULTIPLY:
		case ParameterComputeType.DIVIDE:
		case ParameterComputeType.MODULUS:
			return ReportFunnelType.NUMERIC;
		case ParameterComputeType.YEAR_OF:
			return ReportFunnelType.YEAR;
		case ParameterComputeType.HALF_YEAR_OF:
			return ReportFunnelType.HALF_YEAR;
		case ParameterComputeType.QUARTER_OF:
			return ReportFunnelType.QUARTER;
		case ParameterComputeType.MONTH_OF:
			return ReportFunnelType.MONTH;
		case ParameterComputeType.WEEK_OF_MONTH:
			return ReportFunnelType.WEEK_OF_MONTH;
		case ParameterComputeType.DAY_OF_WEEK:
			return ReportFunnelType.DAY_OF_WEEK;
		default:
			return (void 0);
	}
};

export const detectFunnels = (subject: Subject, topics: Array<Topic>): Array<ReportFunnel> => {
	return subject.dataset.columns.map<ReportFunnel | Array<ReportFunnel> | null>(({columnId, parameter}) => {
		if (isTopicFactorParameter(parameter)) {
			const {topicId, factorId} = parameter;
			// eslint-disable-next-line
			const topic = topics.find(topic => topic.topicId == topicId);
			if (!topic) {
				return null;
			}
			// eslint-disable-next-line
			const factor = topic.factors.find(factor => factor.factorId == factorId);
			if (!factor) {
				return null;
			}
			const funnelType = detectFunnelTypeOnFactor(factor);
			if (funnelType == null) {
				return null;
			} else if (Array.isArray(funnelType)) {
				return funnelType.map(type => createFunnel(columnId, type));
			} else {
				return createFunnel(columnId, funnelType);
			}
		} else if (isConstantParameter(parameter)) {
			// ignore since value is fixed
			return null;
		} else if (isComputedParameter(parameter)) {
			const funnelType = detectFunnelTypeOnParameter(parameter);
			if (funnelType == null) {
				return null;
			} else {
				return createFunnel(columnId, funnelType);
			}
		} else {
			return null;
		}
	}).filter(x => x != null).flat() as Array<ReportFunnel>;
};

export const isReportDefValid = (report: Report, chartDef: ChartDef | null | undefined, ignoreFilter: boolean = false): boolean => {
	if (chartDef == null) {
		return false;
	}

	const indicators = report.indicators || [];
	if (chartDef.minIndicatorCount && indicators.length < chartDef.minIndicatorCount) {
		return false;
	}
	if (chartDef.maxIndicatorCount && indicators.length > chartDef.maxIndicatorCount) {
		return false;
	}
	if (indicators.some(indicator => !indicator.columnId)) {
		return false;
	}

	const dimensions = report.dimensions || [];
	if (chartDef.minDimensionCount && dimensions.length < chartDef.minDimensionCount) {
		return false;
	}
	if (chartDef.maxDimensionCount && dimensions.length > chartDef.maxDimensionCount) {
		return false;
	}
	if (dimensions.some(dimension => !dimension.columnId)) {
		return false;
	}

	if (ignoreFilter) {
		return true;
	}

	if (report.filters) {
		if (report.filters.jointType == null) {
			return false;
		}
		if (report.filters.filters == null || report.filters.filters.length === 0) {
			return true;
		}

		const isFilterValid = (filter: ReportFilter): boolean => {
			if (isJointFilter(filter)) {
				return filter.jointType != null
					&& filter.filters != null && filter.filters.length !== 0
					&& filter.filters.every(isFilterValid);
			} else if (isExpressionFilter(filter)) {
				if (!isTopicFactorParameter(filter.left)) {
					return false;
				}
				if (!filter.left.factorId) {
					return false;
				}
				if (filter.operator === ParameterExpressionOperator.EMPTY || filter.operator === ParameterExpressionOperator.NOT_EMPTY) {
					return true;
				}
				if (!isConstantParameter(filter.right)) {
					return false;
				}
				if (filter.operator === ParameterExpressionOperator.EQUALS || filter.operator === ParameterExpressionOperator.NOT_EQUALS) {
					return true;
				}
				// noinspection RedundantIfStatementJS
				if ((filter.right.value || '').trim().length === 0) {
					return false;
				}
				return true;
			} else {
				return false;
			}
		};
		return report.filters.filters.every(isFilterValid);
	}

	return true;
};