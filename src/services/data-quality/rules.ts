import {isMockService} from '../utils';
import {Apis, post} from '../apis';
import {fetchMockRules} from '../mock/data-quality/mock-rules';

export enum MonitorRuleGrade {
	GLOBAL = 'global',
	TOPIC = 'topic',
	FACTOR = 'factor'
}

export interface MonitorRulesCriteria {
	grade: MonitorRuleGrade.GLOBAL | MonitorRuleGrade.TOPIC;
	topicId?: string;
}

export enum MonitorRuleCode {
	// structure
	RAW_MATCH_STRUCTURE = 'raw-match-structure',

	// type
	FACTOR_MATCH_ENUM = 'factor-match-enum',
	FACTOR_MATCH_TYPE = 'factor-match-type',
	FACTOR_MATCH_DATE_TYPE = 'factor-match-date-type',

	// topic row count
	ROWS_NO_CHANGE = 'rows-no-change',
	ROWS_COUNT = 'rows-count',
	ROWS_COUNT_INCREASING_RATE = 'rows-count-increasing-rate',
	ROWS_COUNT_AND_ANOTHER = 'rows-count-and-another',

	// for all factor types
	FACTOR_IS_EMPTY = 'factor-is-empty',
	FACTOR_USE_CAST = 'factor-use-cast',
	FACTOR_COMMON_VALUE_COVERAGE = 'factor-common-value-coverage',

	// for number type
	FACTOR_MONOTONE_INCREASING = 'factor-monotone-increasing',
	FACTOR_MONOTONE_DECREASING = 'factor-monotone-decreasing',
	FACTOR_IN_RANGE = 'factor-in-range',
	FACTOR_MAX_IN_RANGE = 'factor-max-in-range',
	FACTOR_MIN_IN_RANGE = 'factor-min-in-range',
	FACTOR_SUM_IN_RANGE = 'factor-sum-in-range',
	FACTOR_AVG_IN_RANGE = 'factor-avg-in-range',
	FACTOR_MEDIAN_IN_RANGE = 'factor-median-in-range',
	FACTOR_QUANTILE_IN_RANGE = 'factor-quantile-in-range',
	FACTOR_STDEV_IN_RANGE = 'factor-stdev-in-range',
	FACTOR_COMMON_VALUE_IN_RANGE = 'factor-common-value-in-range',

	// for string type
	FACTOR_IS_BLANK = 'factor-is-blank',
	FACTOR_STRING_LENGTH = 'factor-string-length',
	FACTOR_STRING_LENGTH_RANGE = 'factor-string-length-range',
	FACTOR_MATCH_REGEXP = 'factor-match-regexp',
	FACTOR_UNMATCH_REGEXP = 'factor-unmatch-regexp',

	// for 2 factors
	FACTOR_AND_ANOTHER = 'factor-and-another'
}

export enum MonitorRuleSeverity {
	FATAL = 'fatal',
	WARN = 'warn',
	TRACE = 'trace'
}

export interface MonitorRule {
	uid?: string;
	code: MonitorRuleCode;
	grade: MonitorRuleGrade;
	severity: MonitorRuleSeverity;
	enabled: boolean;
}

export interface MonitorRuleOnTopic extends MonitorRule {
	topicId: string;
}

export interface MonitorRuleOnFactor extends MonitorRuleOnTopic {
	factorId: string;
}

export type MonitorRules = Array<MonitorRule>;

export const GlobalRuleDefs = [
	MonitorRuleCode.RAW_MATCH_STRUCTURE,
	MonitorRuleCode.FACTOR_MATCH_TYPE,
	MonitorRuleCode.FACTOR_MATCH_ENUM,
	MonitorRuleCode.FACTOR_MATCH_DATE_TYPE
];

export const TopicRuleDefs = [
	MonitorRuleCode.RAW_MATCH_STRUCTURE,
	MonitorRuleCode.FACTOR_MATCH_TYPE,
	MonitorRuleCode.FACTOR_MATCH_ENUM,
	MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,

	MonitorRuleCode.ROWS_NO_CHANGE,
	MonitorRuleCode.ROWS_COUNT,
	MonitorRuleCode.ROWS_COUNT_INCREASING_RATE,
	MonitorRuleCode.ROWS_COUNT_AND_ANOTHER
];

export const FactorRuleDefs = [
	MonitorRuleCode.FACTOR_MATCH_TYPE,
	MonitorRuleCode.FACTOR_MATCH_ENUM,
	MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,

	MonitorRuleCode.FACTOR_IS_EMPTY,
	MonitorRuleCode.FACTOR_USE_CAST,
	MonitorRuleCode.FACTOR_COMMON_VALUE_COVERAGE,

	MonitorRuleCode.FACTOR_MONOTONE_INCREASING,
	MonitorRuleCode.FACTOR_MONOTONE_DECREASING,
	MonitorRuleCode.FACTOR_IN_RANGE,
	MonitorRuleCode.FACTOR_MAX_IN_RANGE,
	MonitorRuleCode.FACTOR_MIN_IN_RANGE,
	MonitorRuleCode.FACTOR_SUM_IN_RANGE,
	MonitorRuleCode.FACTOR_AVG_IN_RANGE,
	MonitorRuleCode.FACTOR_MEDIAN_IN_RANGE,
	MonitorRuleCode.FACTOR_QUANTILE_IN_RANGE,
	MonitorRuleCode.FACTOR_STDEV_IN_RANGE,
	MonitorRuleCode.FACTOR_COMMON_VALUE_IN_RANGE,

	MonitorRuleCode.FACTOR_IS_BLANK,
	MonitorRuleCode.FACTOR_STRING_LENGTH,
	MonitorRuleCode.FACTOR_STRING_LENGTH_RANGE,
	MonitorRuleCode.FACTOR_MATCH_REGEXP,
	MonitorRuleCode.FACTOR_UNMATCH_REGEXP,

	MonitorRuleCode.FACTOR_AND_ANOTHER
];

export const fetchMonitorRules = async (options: { criteria: MonitorRulesCriteria }): Promise<MonitorRules> => {
	if (isMockService()) {
		return await fetchMockRules(options);
	} else {
		return post({
			api: Apis.QUERY_RULE,
			data: {criteria: options.criteria}
		});
	}
};

export const isRuleOnTopic = (rule: MonitorRule): rule is MonitorRuleOnTopic => {
	const x = rule as any;
	return x.topicId && !x.factorId;
};
export const isRuleOnFactor = (rule: MonitorRule): rule is MonitorRuleOnFactor => {
	return (rule as any).factorId;
};