import {
	MonitorRule,
	MonitorRuleCode,
	MonitorRuleSeverity,
	MonitorRuleStatisticalInterval
} from '../../services/data-quality/rules';
import {Topic, TopicType} from '../../services/tuples/topic-types';
import {Factor, FactorType} from '../../services/tuples/factor-types';

export interface MonitorRuleDef {
	code: MonitorRuleCode;
	name: string;
	severity?: MonitorRuleSeverity;
	canApply?: (topic: Topic, factor?: Factor) => boolean;
	parameters?: Array<RuleParameterType>;
}

export enum RuleParameterType {
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

const defs: { [key in MonitorRuleCode]: MonitorRuleDef } = [
	{
		code: MonitorRuleCode.RAW_MATCH_STRUCTURE,
		name: 'Row of raw topic mismatches structure',
		severity: MonitorRuleSeverity.WARN,
		canApply: (topic: Topic) => topic.type === TopicType.RAW
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_TYPE,
		severity: MonitorRuleSeverity.FATAL,
		name: 'Value mismatches type'
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_ENUM,
		severity: MonitorRuleSeverity.FATAL,
		name: 'Value mismatches enumeration',
		canApply: (topic: Topic, factor?: Factor) => {
			return !factor || [FactorType.ENUM].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value mismatches date type',
		canApply: (topic: Topic, factor?: Factor) => {
			return !factor || [
				FactorType.DATE, FactorType.DATETIME, FactorType.FULL_DATETIME,
				FactorType.TIME,
				FactorType.DATE_OF_BIRTH
			].includes(factor.type);
		}
	},

	{
		code: MonitorRuleCode.ROWS_NO_CHANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Rows have no change',
		parameters: [RuleParameterType.COVERAGE_RATE, RuleParameterType.STATISTICAL_INTERVAL]
	},
	{
		code: MonitorRuleCode.ROWS_COUNT_AND_ANOTHER,
		severity: MonitorRuleSeverity.FATAL,
		name: 'Rows count mismatches another topic\'s',
		canApply: (topic: Topic) => topic.type !== TopicType.RAW,
		parameters: [RuleParameterType.TOPIC, RuleParameterType.STATISTICAL_INTERVAL]
	},

	{
		code: MonitorRuleCode.FACTOR_IS_EMPTY,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value is empty'
	},
	{
		code: MonitorRuleCode.FACTOR_USE_CAST,
		severity: MonitorRuleSeverity.TRACE,
		name: 'Value type casted'
	},
	{
		code: MonitorRuleCode.FACTOR_COMMON_VALUE_COVERAGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Most common values cover coverage',
		parameters: [RuleParameterType.AGGREGATION, RuleParameterType.COVERAGE_RATE, RuleParameterType.STATISTICAL_INTERVAL]
	},

	{
		code: MonitorRuleCode.FACTOR_MONOTONE_INCREASING,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value breaks monotone increasing',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_MONOTONE_DECREASING,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value breaks monotone decreasing',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		},
		parameters: [RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER]
	},
	{
		code: MonitorRuleCode.FACTOR_MAX_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Max value is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		},
		parameters: [RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER]
	},
	{
		code: MonitorRuleCode.FACTOR_MIN_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Min is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		},
		parameters: [RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER]
	},
	{
		code: MonitorRuleCode.FACTOR_SUM_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Sum is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		},
		parameters: [RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER, RuleParameterType.STATISTICAL_INTERVAL]
	},
	{
		code: MonitorRuleCode.FACTOR_AVG_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Avg is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		},
		parameters: [RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER, RuleParameterType.STATISTICAL_INTERVAL]
	},
	{
		code: MonitorRuleCode.FACTOR_MEDIAN_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Median is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		},
		parameters: [RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER, RuleParameterType.STATISTICAL_INTERVAL]
	},
	{
		code: MonitorRuleCode.FACTOR_QUANTILE_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Quantile is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		},
		parameters: [RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER, RuleParameterType.STATISTICAL_INTERVAL]
	},
	{
		code: MonitorRuleCode.FACTOR_STDEV_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'StDev is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		},
		parameters: [RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER, RuleParameterType.STATISTICAL_INTERVAL]
	},
	{
		code: MonitorRuleCode.FACTOR_COMMON_VALUE_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Most common values are not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		},
		parameters: [RuleParameterType.AGGREGATION, RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER, RuleParameterType.STATISTICAL_INTERVAL]
	},

	{
		code: MonitorRuleCode.FACTOR_IS_BLANK,
		severity: MonitorRuleSeverity.TRACE,
		name: 'Value is blank',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.TEXT].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_STRING_LENGTH,
		severity: MonitorRuleSeverity.WARN,
		name: 'String length mismatched',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.TEXT].includes(factor.type);
		},
		parameters: [RuleParameterType.LENGTH]
	},
	{
		code: MonitorRuleCode.FACTOR_STRING_LENGTH_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'String length is not in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.TEXT].includes(factor.type);
		},
		parameters: [RuleParameterType.MIN_LENGTH, RuleParameterType.MAX_LENGTH]
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_REGEXP,
		severity: MonitorRuleSeverity.WARN,
		name: 'Mismatches regexp',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.TEXT].includes(factor.type);
		},
		parameters: [RuleParameterType.REGEXP]
	},
	{
		code: MonitorRuleCode.FACTOR_UNMATCH_REGEXP,
		severity: MonitorRuleSeverity.WARN,
		name: 'Matches regexp',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.TEXT].includes(factor.type);
		},
		parameters: [RuleParameterType.REGEXP]
	},

	{
		code: MonitorRuleCode.FACTOR_AND_ANOTHER,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value compare with another factor',
		parameters: [RuleParameterType.COMPARE_OPERATOR, RuleParameterType.FACTOR]
	}
].reduce((map, def) => {
	map[def.code] = def;
	return map;
}, {} as { [key in MonitorRuleCode]: MonitorRuleDef });

export const transformRuleDefsToDisplay = (codes: Array<MonitorRuleCode>) => {
	return codes.map(code => {
		const def = defs[code];
		if (!def) {
			throw new Error(`Unsupported rule code[${code}].`);
		} else {
			return def;
		}
	});
};

export const SeverityOptions = [
	{value: MonitorRuleSeverity.FATAL, label: 'Fatal'},
	{value: MonitorRuleSeverity.WARN, label: 'Warn'},
	{value: MonitorRuleSeverity.TRACE, label: 'Trace'}
];

export const sortFactors = (factors: Array<Factor>) => {
	return factors.sort((f1, f2) => {
		return (f1.name || '').toLowerCase().localeCompare((f2.name || '').toLowerCase());
	});
};

export const prepareRuleParams = (rule: MonitorRule, def: MonitorRuleDef): MonitorRule => {
	if (!def.parameters || def.parameters.length === 0) {
		return rule;
	}

	const params = rule.params || {};

	def.parameters.forEach(param => {
		switch (param) {
			case RuleParameterType.STATISTICAL_INTERVAL:
				if (!params.statisticalInterval) {
					params.statisticalInterval = MonitorRuleStatisticalInterval.MONTHLY;
					rule.params = params;
				}
				break;
		}
	});

	return rule;
};