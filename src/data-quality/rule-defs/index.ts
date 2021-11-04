import {MonitorRuleCode, MonitorRuleSeverity} from '@/services/data/data-quality/rule-types';
import {Factor, FactorType} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {isNotRawTopic, isRawTopic} from '@/services/data/tuples/topic-utils';

export interface MonitorRuleDef {
	code: MonitorRuleCode;
	name: string;
	severity?: MonitorRuleSeverity;
	canApply?: (topic: Topic, factor?: Factor) => boolean;
	parameters?: Array<MonitorRuleParameterType>;
	enabled: boolean;
}

export enum MonitorRuleParameterType {
	TOPIC = 'topic',
	FACTOR = 'factor',
	STATISTICAL_INTERVAL = 'statistical-interval',
	AGGREGATION = 'aggregation',
	COVERAGE_RATE = 'coverage-rate',
	MIN_NUMBER = 'min-number',
	MAX_NUMBER = 'max-number',
	QUANTILE = 'quantile',
	LENGTH = 'length',
	MIN_LENGTH = 'min-length',
	MAX_LENGTH = 'max-length',
	REGEXP = 'regexp',
	COMPARE_OPERATOR = 'compare-operator'
}

const supportFactorType = (types: Array<FactorType>, type: FactorType) => types.includes(type);

export const RuleDefs: Record<MonitorRuleCode, MonitorRuleDef> = [
	{
		code: MonitorRuleCode.RAW_MISMATCH_STRUCTURE,
		name: 'Row of raw topic mismatches structure',
		severity: MonitorRuleSeverity.WARN,
		canApply: (topic: Topic) => isRawTopic(topic),
		enabled: false
	},
	{
		code: MonitorRuleCode.FACTOR_MISMATCH_TYPE,
		severity: MonitorRuleSeverity.FATAL,
		name: 'Value mismatches type',
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_MISMATCH_ENUM,
		severity: MonitorRuleSeverity.FATAL,
		name: 'Value mismatches enumeration',
		canApply: (topic: Topic, factor?: Factor) => {
			return !factor || supportFactorType([FactorType.ENUM], factor.type);
		},
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_MISMATCH_DATE_TYPE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value mismatches date type',
		canApply: (topic: Topic, factor?: Factor) => {
			return !factor || supportFactorType([
				FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME,
				FactorType.TIME,
				FactorType.DATE_OF_BIRTH
			], factor.type);
		},
		enabled: true
	},

	{
		code: MonitorRuleCode.ROWS_NOT_EXISTS,
		severity: MonitorRuleSeverity.WARN,
		name: 'Data not exists',
		enabled: true
	},
	{
		code: MonitorRuleCode.ROWS_NO_CHANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Rows have no change',
		parameters: [MonitorRuleParameterType.COVERAGE_RATE, MonitorRuleParameterType.STATISTICAL_INTERVAL],
		enabled: true
	},
	{
		code: MonitorRuleCode.ROWS_COUNT_MISMATCH_AND_ANOTHER,
		severity: MonitorRuleSeverity.FATAL,
		name: 'Rows count mismatches another topic\'s',
		canApply: (topic: Topic) => isNotRawTopic(topic),
		parameters: [MonitorRuleParameterType.TOPIC, MonitorRuleParameterType.STATISTICAL_INTERVAL],
		enabled: true
	},

	{
		code: MonitorRuleCode.FACTOR_IS_EMPTY,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value is empty',
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_USE_CAST,
		severity: MonitorRuleSeverity.TRACE,
		name: 'Value type casted',
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_COMMON_VALUE_OVER_COVERAGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Most common values over coverage',
		parameters: [MonitorRuleParameterType.AGGREGATION, MonitorRuleParameterType.COVERAGE_RATE, MonitorRuleParameterType.STATISTICAL_INTERVAL],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_EMPTY_OVER_COVERAGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Empty values over coverage',
		parameters: [MonitorRuleParameterType.COVERAGE_RATE, MonitorRuleParameterType.STATISTICAL_INTERVAL],
		enabled: true
	},

	{
		code: MonitorRuleCode.FACTOR_BREAKS_MONOTONE_INCREASING,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value breaks monotone increasing',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		enabled: false
	},
	{
		code: MonitorRuleCode.FACTOR_BREAKS_MONOTONE_DECREASING,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value breaks monotone decreasing',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		enabled: false
	},
	{
		code: MonitorRuleCode.FACTOR_NOT_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		parameters: [MonitorRuleParameterType.MIN_NUMBER, MonitorRuleParameterType.MAX_NUMBER],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_MAX_NOT_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Max value is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		parameters: [MonitorRuleParameterType.MIN_NUMBER, MonitorRuleParameterType.MAX_NUMBER],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_MIN_NOT_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Min is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		parameters: [MonitorRuleParameterType.MIN_NUMBER, MonitorRuleParameterType.MAX_NUMBER],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_AVG_NOT_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Avg is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		parameters: [MonitorRuleParameterType.MIN_NUMBER, MonitorRuleParameterType.MAX_NUMBER, MonitorRuleParameterType.STATISTICAL_INTERVAL],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_MEDIAN_NOT_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Median is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		parameters: [MonitorRuleParameterType.MIN_NUMBER, MonitorRuleParameterType.MAX_NUMBER, MonitorRuleParameterType.STATISTICAL_INTERVAL],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_QUANTILE_NOT_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Quantile is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		parameters: [MonitorRuleParameterType.MIN_NUMBER, MonitorRuleParameterType.MAX_NUMBER, MonitorRuleParameterType.STATISTICAL_INTERVAL],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_STDEV_NOT_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'StDev is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		parameters: [MonitorRuleParameterType.MIN_NUMBER, MonitorRuleParameterType.MAX_NUMBER, MonitorRuleParameterType.STATISTICAL_INTERVAL],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_COMMON_VALUE_NOT_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Most common values are not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.NUMBER, FactorType.UNSIGNED], factor.type);
		},
		parameters: [MonitorRuleParameterType.AGGREGATION, MonitorRuleParameterType.MIN_NUMBER, MonitorRuleParameterType.MAX_NUMBER, MonitorRuleParameterType.STATISTICAL_INTERVAL],
		enabled: true
	},

	{
		code: MonitorRuleCode.FACTOR_IS_BLANK,
		severity: MonitorRuleSeverity.TRACE,
		name: 'Value is blank',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.TEXT], factor.type);
		},
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_STRING_LENGTH_MISMATCH,
		severity: MonitorRuleSeverity.WARN,
		name: 'String length mismatched',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.TEXT], factor.type);
		},
		parameters: [MonitorRuleParameterType.LENGTH],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_STRING_LENGTH_NOT_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'String length is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.TEXT], factor.type);
		},
		parameters: [MonitorRuleParameterType.MIN_LENGTH, MonitorRuleParameterType.MAX_LENGTH],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_MISMATCH_REGEXP,
		severity: MonitorRuleSeverity.WARN,
		name: 'Mismatches regexp',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.TEXT], factor.type);
		},
		parameters: [MonitorRuleParameterType.REGEXP],
		enabled: true
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_REGEXP,
		severity: MonitorRuleSeverity.WARN,
		name: 'Matches regexp',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && supportFactorType([FactorType.TEXT], factor.type);
		},
		parameters: [MonitorRuleParameterType.REGEXP],
		enabled: true
	},

	{
		code: MonitorRuleCode.FACTOR_AND_ANOTHER,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value compare with another factor',
		parameters: [MonitorRuleParameterType.COMPARE_OPERATOR, MonitorRuleParameterType.FACTOR],
		enabled: true
	}
].reduce((map, def) => {
	map[def.code] = def;
	return map;
}, {} as Record<MonitorRuleCode, MonitorRuleDef>);