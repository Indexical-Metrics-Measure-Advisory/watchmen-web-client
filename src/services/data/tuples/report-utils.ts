import {ParameterComputeType} from './factor-calculator-types';
import {FactorType} from './factor-types';
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
			switch (factor.type) {
				case FactorType.NUMBER:
				case FactorType.UNSIGNED:
				case FactorType.RESIDENTIAL_AREA:
				case FactorType.AGE:
				case FactorType.BIZ_SCALE:
					return createFunnel(columnId, ReportFunnelType.NUMERIC);
				case FactorType.CONTINENT:
				case FactorType.REGION:
				case FactorType.COUNTRY:
				case FactorType.PROVINCE:
				case FactorType.CITY:
				case FactorType.RESIDENCE_TYPE:
				case FactorType.HALF_YEAR:
				case FactorType.QUARTER:
				case FactorType.AM_PM:
				case FactorType.GENDER:
				case FactorType.OCCUPATION:
				case FactorType.RELIGION:
				case FactorType.NATIONALITY:
				case FactorType.BIZ_TRADE:
				case FactorType.ENUM:
					return createFunnel(columnId, ReportFunnelType.ENUM);
				case FactorType.FULL_DATETIME:
				case FactorType.DATETIME:
				case FactorType.DATE_OF_BIRTH:
					return [
						createFunnel(columnId, ReportFunnelType.DATE),
						createFunnel(columnId, ReportFunnelType.YEAR),
						createFunnel(columnId, ReportFunnelType.MONTH)
					];
				case FactorType.YEAR:
					return createFunnel(columnId, ReportFunnelType.YEAR);
				case FactorType.MONTH:
					return createFunnel(columnId, ReportFunnelType.MONTH);
				case FactorType.WEEK_OF_MONTH:
					return createFunnel(columnId, ReportFunnelType.WEEK_OF_MONTH);
				case FactorType.DAY_OF_WEEK:
					return createFunnel(columnId, ReportFunnelType.DAY_OF_WEEK);
				default:
					return null;
			}
		} else if (isConstantParameter(parameter)) {
			// ignore since value is fixed
			return null;
		} else if (isComputedParameter(parameter)) {
			const {type} = parameter;
			switch (type) {
				case ParameterComputeType.ADD:
				case ParameterComputeType.SUBTRACT:
				case ParameterComputeType.MULTIPLY:
				case ParameterComputeType.DIVIDE:
				case ParameterComputeType.MODULUS:
					return createFunnel(columnId, ReportFunnelType.NUMERIC);
				case ParameterComputeType.YEAR_OF:
					return createFunnel(columnId, ReportFunnelType.YEAR);
				case ParameterComputeType.HALF_YEAR_OF:
				case ParameterComputeType.QUARTER_OF:
					return createFunnel(columnId, ReportFunnelType.ENUM);
				case ParameterComputeType.MONTH_OF:
					return createFunnel(columnId, ReportFunnelType.MONTH);
				case ParameterComputeType.WEEK_OF_MONTH:
					return createFunnel(columnId, ReportFunnelType.WEEK_OF_MONTH);
				case ParameterComputeType.DAY_OF_WEEK:
					return createFunnel(columnId, ReportFunnelType.DAY_OF_WEEK);
				default:
					return null;
			}
		} else {
			return null;
		}
	}).filter(x => x != null).flat() as Array<ReportFunnel>;
};