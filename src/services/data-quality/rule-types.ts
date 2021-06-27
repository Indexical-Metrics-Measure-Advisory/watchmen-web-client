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
	ROWS_NOT_EXISTS = 'rows-not-exists',
	ROWS_NO_CHANGE = 'rows-no-change',
	ROWS_COUNT_AND_ANOTHER = 'rows-count-and-another',

	// for all factor types
	FACTOR_IS_EMPTY = 'factor-is-empty',
	FACTOR_USE_CAST = 'factor-use-cast',
	FACTOR_COMMON_VALUE_COVERAGE = 'factor-common-value-coverage',
	FACTOR_EMPTY_COVERAGE = 'factor-empty-coverage',

	// for number type
	FACTOR_MONOTONE_INCREASING = 'factor-monotone-increasing',
	FACTOR_MONOTONE_DECREASING = 'factor-monotone-decreasing',
	FACTOR_IN_RANGE = 'factor-in-range',
	FACTOR_MAX_IN_RANGE = 'factor-max-in-range',
	FACTOR_MIN_IN_RANGE = 'factor-min-in-range',
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
	FACTOR_MISMATCH_REGEXP = 'factor-mismatch-regexp',

	// for 2 factors
	FACTOR_AND_ANOTHER = 'factor-and-another'
}

export enum MonitorRuleSeverity {
	FATAL = 'fatal',
	WARN = 'warn',
	TRACE = 'trace'
}

export enum MonitorRuleStatisticalInterval {
	DAILY = 'daily',
	WEEKLY = 'weekly',
	MONTHLY = 'monthly'
}

export enum MonitorRuleCompareOperator {
	EQUAL = 'eq',
	LESS_THAN = 'lt',
	LESS_THAN_OR_EQUAL = 'lte',
	GREATER_THAN = 'gt',
	GREATER_THAN_EQUAL = 'gte'
}

export interface MonitorRuleParameters {
	statisticalInterval?: MonitorRuleStatisticalInterval;
	coverageRate?: number;
	aggregation?: number;
	quantile?: number;
	length?: number;
	max?: number;
	min?: number;
	regexp?: string;
	compareOperator?: MonitorRuleCompareOperator;
	topicId?: string;
	factorId?: string;
}

export interface MonitorRule {
	uid?: string;
	code: MonitorRuleCode;
	grade: MonitorRuleGrade;
	severity: MonitorRuleSeverity;
	enabled: boolean;
	params?: MonitorRuleParameters;
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
	MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,

	MonitorRuleCode.ROWS_NOT_EXISTS
];
export const TopicRuleDefs = [
	MonitorRuleCode.RAW_MATCH_STRUCTURE,
	MonitorRuleCode.FACTOR_MATCH_TYPE,
	MonitorRuleCode.FACTOR_MATCH_ENUM,
	MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,

	MonitorRuleCode.ROWS_NOT_EXISTS,
	MonitorRuleCode.ROWS_NO_CHANGE,
	MonitorRuleCode.ROWS_COUNT_AND_ANOTHER
];
export const FactorRuleDefs = [
	MonitorRuleCode.FACTOR_MATCH_TYPE,
	MonitorRuleCode.FACTOR_MATCH_ENUM,
	MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,

	MonitorRuleCode.FACTOR_IS_EMPTY,
	MonitorRuleCode.FACTOR_USE_CAST,
	MonitorRuleCode.FACTOR_COMMON_VALUE_COVERAGE,
	MonitorRuleCode.FACTOR_EMPTY_COVERAGE,

	MonitorRuleCode.FACTOR_MONOTONE_INCREASING,
	MonitorRuleCode.FACTOR_MONOTONE_DECREASING,
	MonitorRuleCode.FACTOR_IN_RANGE,
	MonitorRuleCode.FACTOR_MAX_IN_RANGE,
	MonitorRuleCode.FACTOR_MIN_IN_RANGE,
	MonitorRuleCode.FACTOR_AVG_IN_RANGE,
	MonitorRuleCode.FACTOR_MEDIAN_IN_RANGE,
	MonitorRuleCode.FACTOR_QUANTILE_IN_RANGE,
	MonitorRuleCode.FACTOR_STDEV_IN_RANGE,
	MonitorRuleCode.FACTOR_COMMON_VALUE_IN_RANGE,

	MonitorRuleCode.FACTOR_IS_BLANK,
	MonitorRuleCode.FACTOR_STRING_LENGTH,
	MonitorRuleCode.FACTOR_STRING_LENGTH_RANGE,
	MonitorRuleCode.FACTOR_MATCH_REGEXP,
	MonitorRuleCode.FACTOR_MISMATCH_REGEXP,

	MonitorRuleCode.FACTOR_AND_ANOTHER
];

export interface MonitorRuleLogCriteria {
	startDate: string;
	endDate: string;
	ruleCode?: MonitorRuleCode;
	topicId?: string;
	factorId?: string;
}

export interface MonitorRuleLog {
	ruleCode: MonitorRuleCode;
	topicId?: string;
	factorId?: string;
	count: number;
	lastOccurredTime: string;
}

export type MonitorRuleLogs = Array<MonitorRuleLog>;