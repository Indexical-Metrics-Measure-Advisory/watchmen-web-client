import {FactorId} from '../tuples/factor-types';
import {TopicId} from '../tuples/topic-types';
import {DateTime} from '../types';

export enum MonitorRuleGrade {
	/** FEAT global rule is disabled now */
	GLOBAL = 'global',
	TOPIC = 'topic',
	FACTOR = 'factor',
}

export interface MonitorRulesCriteria {
	grade: MonitorRuleGrade.GLOBAL | MonitorRuleGrade.TOPIC;
	topicId?: TopicId;
}

export enum MonitorRuleCode {
	// structure
	RAW_MISMATCH_STRUCTURE = 'raw-mismatch-structure',

	// type
	FACTOR_MISMATCH_ENUM = 'factor-mismatch-enum',
	FACTOR_MISMATCH_TYPE = 'factor-mismatch-type',
	FACTOR_MISMATCH_DATE_TYPE = 'factor-mismatch-date-type',

	// topic row count
	ROWS_NOT_EXISTS = 'rows-not-exists',
	ROWS_NO_CHANGE = 'rows-no-change',
	ROWS_COUNT_MISMATCH_AND_ANOTHER = 'rows-count-mismatch-and-another',

	// for all factor types
	FACTOR_IS_EMPTY = 'factor-is-empty',
	FACTOR_USE_CAST = 'factor-use-cast',
	FACTOR_COMMON_VALUE_OVER_COVERAGE = 'factor-common-value-over-coverage',
	FACTOR_EMPTY_OVER_COVERAGE = 'factor-empty-over-coverage',

	// for number type
	FACTOR_BREAKS_MONOTONE_INCREASING = 'factor-breaks-monotone-increasing',
	FACTOR_BREAKS_MONOTONE_DECREASING = 'factor-breaks-monotone-decreasing',
	FACTOR_NOT_IN_RANGE = 'factor-not-in-range',
	FACTOR_MAX_NOT_IN_RANGE = 'factor-max-not-in-range',
	FACTOR_MIN_NOT_IN_RANGE = 'factor-min-not-in-range',
	FACTOR_AVG_NOT_IN_RANGE = 'factor-avg-not-in-range',
	FACTOR_MEDIAN_NOT_IN_RANGE = 'factor-median-not-in-range',
	FACTOR_QUANTILE_NOT_IN_RANGE = 'factor-quantile-not-in-range',
	FACTOR_STDEV_NOT_IN_RANGE = 'factor-stdev-not-in-range',
	FACTOR_COMMON_VALUE_NOT_IN_RANGE = 'factor-common-value-not-in-range',

	// for string type
	FACTOR_IS_BLANK = 'factor-is-blank',
	FACTOR_STRING_LENGTH_MISMATCH = 'factor-string-length-mismatch',
	FACTOR_STRING_LENGTH_NOT_IN_RANGE = 'factor-string-length-not-in-range',
	FACTOR_MATCH_REGEXP = 'factor-match-regexp',
	FACTOR_MISMATCH_REGEXP = 'factor-mismatch-regexp',

	// for 2 factors
	FACTOR_AND_ANOTHER = 'factor-and-another',
}

export enum MonitorRuleSeverity {
	FATAL = 'fatal',
	WARN = 'warn',
	TRACE = 'trace',
}

export enum MonitorRuleStatisticalInterval {
	DAILY = 'daily',
	WEEKLY = 'weekly',
	MONTHLY = 'monthly',
}

export enum MonitorRuleCompareOperator {
	EQUAL = 'eq',
	LESS_THAN = 'lt',
	LESS_THAN_OR_EQUAL = 'lte',
	GREATER_THAN = 'gt',
	GREATER_THAN_EQUAL = 'gte',
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
	topicId?: TopicId;
	factorId?: FactorId;
}

export type MonitorRuleId = string;

export interface MonitorRule {
	ruleId?: MonitorRuleId;
	code: MonitorRuleCode;
	grade: MonitorRuleGrade;
	severity: MonitorRuleSeverity;
	enabled: boolean;
	params?: MonitorRuleParameters;
}

export interface MonitorRuleOnTopic extends MonitorRule {
	topicId: TopicId;
}

export interface MonitorRuleOnFactor extends MonitorRuleOnTopic {
	factorId: FactorId;
}

export type MonitorRules = Array<MonitorRule>;
export const GlobalRuleDefs = [
	MonitorRuleCode.RAW_MISMATCH_STRUCTURE,
	MonitorRuleCode.FACTOR_MISMATCH_TYPE,
	MonitorRuleCode.FACTOR_MISMATCH_ENUM,
	MonitorRuleCode.FACTOR_MISMATCH_DATE_TYPE,

	MonitorRuleCode.ROWS_NOT_EXISTS
];
export const TopicRuleDefs = [
	MonitorRuleCode.RAW_MISMATCH_STRUCTURE,
	MonitorRuleCode.FACTOR_MISMATCH_TYPE,
	MonitorRuleCode.FACTOR_MISMATCH_ENUM,
	MonitorRuleCode.FACTOR_MISMATCH_DATE_TYPE,

	MonitorRuleCode.ROWS_NOT_EXISTS,
	MonitorRuleCode.ROWS_NO_CHANGE,
	MonitorRuleCode.ROWS_COUNT_MISMATCH_AND_ANOTHER
];
export const FactorRuleDefs = [
	MonitorRuleCode.FACTOR_MISMATCH_TYPE,
	MonitorRuleCode.FACTOR_MISMATCH_ENUM,
	MonitorRuleCode.FACTOR_MISMATCH_DATE_TYPE,

	MonitorRuleCode.FACTOR_IS_EMPTY,
	MonitorRuleCode.FACTOR_USE_CAST,
	MonitorRuleCode.FACTOR_COMMON_VALUE_OVER_COVERAGE,
	MonitorRuleCode.FACTOR_EMPTY_OVER_COVERAGE,

	MonitorRuleCode.FACTOR_BREAKS_MONOTONE_INCREASING,
	MonitorRuleCode.FACTOR_BREAKS_MONOTONE_DECREASING,
	MonitorRuleCode.FACTOR_NOT_IN_RANGE,
	MonitorRuleCode.FACTOR_MAX_NOT_IN_RANGE,
	MonitorRuleCode.FACTOR_MIN_NOT_IN_RANGE,
	MonitorRuleCode.FACTOR_AVG_NOT_IN_RANGE,
	MonitorRuleCode.FACTOR_MEDIAN_NOT_IN_RANGE,
	MonitorRuleCode.FACTOR_QUANTILE_NOT_IN_RANGE,
	MonitorRuleCode.FACTOR_STDEV_NOT_IN_RANGE,
	MonitorRuleCode.FACTOR_COMMON_VALUE_NOT_IN_RANGE,

	MonitorRuleCode.FACTOR_IS_BLANK,
	MonitorRuleCode.FACTOR_STRING_LENGTH_MISMATCH,
	MonitorRuleCode.FACTOR_STRING_LENGTH_NOT_IN_RANGE,
	MonitorRuleCode.FACTOR_MATCH_REGEXP,
	MonitorRuleCode.FACTOR_MISMATCH_REGEXP,

	MonitorRuleCode.FACTOR_AND_ANOTHER
];

export interface MonitorRuleLogCriteria {
	startDate: string;
	endDate: string;
	ruleCode?: MonitorRuleCode;
	topicId?: TopicId;
	factorId?: FactorId;
}

export interface MonitorRuleLog {
	ruleCode: MonitorRuleCode;
	topicId?: TopicId;
	factorId?: FactorId;
	count: number;
	lastOccurredTime: DateTime;
}

export type MonitorRuleLogs = Array<MonitorRuleLog>;
