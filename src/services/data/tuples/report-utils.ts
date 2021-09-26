import {ComputedParameter, ParameterComputeType} from './factor-calculator-types';
import {Factor, FactorType} from './factor-types';
import {isComputedParameter, isConstantParameter, isTopicFactorParameter} from './parameter-utils';
import {ReportFilter, ReportFilterExpression, ReportFilterJoint, ReportFunnel, ReportFunnelType} from './report-types';
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
	switch (factor.type) {
		case FactorType.NUMBER:
		case FactorType.UNSIGNED:
		case FactorType.RESIDENTIAL_AREA:
		case FactorType.AGE:
		case FactorType.BIZ_SCALE:
			return ReportFunnelType.NUMERIC;
		case FactorType.CONTINENT:
		case FactorType.REGION:
		case FactorType.COUNTRY:
		case FactorType.PROVINCE:
		case FactorType.CITY:
		case FactorType.RESIDENCE_TYPE:
		case FactorType.GENDER:
		case FactorType.OCCUPATION:
		case FactorType.RELIGION:
		case FactorType.NATIONALITY:
		case FactorType.BIZ_TRADE:
		case FactorType.ENUM:
			return ReportFunnelType.ENUM;
		case FactorType.FULL_DATETIME:
		case FactorType.DATETIME:
		case FactorType.DATE_OF_BIRTH:
			return [ReportFunnelType.DATE, ReportFunnelType.YEAR, ReportFunnelType.MONTH];
		case FactorType.YEAR:
			return ReportFunnelType.YEAR;
		case FactorType.HALF_YEAR:
			return ReportFunnelType.HALF_YEAR;
		case FactorType.QUARTER:
			return ReportFunnelType.QUARTER;
		case FactorType.MONTH:
			return ReportFunnelType.MONTH;
		case FactorType.HALF_MONTH:
			return ReportFunnelType.HALF_MONTH;
		case FactorType.TEN_DAYS:
			return ReportFunnelType.TEN_DAYS;
		case FactorType.WEEK_OF_MONTH:
			return ReportFunnelType.WEEK_OF_MONTH;
		case FactorType.DAY_KIND:
			return ReportFunnelType.DAY_KIND;
		case FactorType.DAY_OF_WEEK:
			return ReportFunnelType.DAY_OF_WEEK;
		case FactorType.HOUR:
			return ReportFunnelType.HOUR;
		case FactorType.HOUR_KIND:
			return ReportFunnelType.HOUR_KIND;
		case FactorType.AM_PM:
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
		case ParameterComputeType.QUARTER_OF:
			return ReportFunnelType.ENUM;
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