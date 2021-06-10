import {MonitorRuleCode, MonitorRuleSeverity} from '../../services/data-quality/rules';
import {Topic, TopicType} from '../../services/tuples/topic-types';
import {Factor, FactorType} from '../../services/tuples/factor-types';

export interface MonitorRuleDef {
	code: MonitorRuleCode;
	name: string;
	severity?: MonitorRuleSeverity;
	canApply?: (topic: Topic, factor?: Factor) => boolean;
}

const defs: { [key in MonitorRuleCode]: MonitorRuleDef } = [
	{
		code: MonitorRuleCode.RAW_MATCH_STRUCTURE,
		name: 'Row of raw topic must match structure',
		severity: MonitorRuleSeverity.WARN,
		canApply: (topic: Topic) => topic.type === TopicType.RAW
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_TYPE,
		severity: MonitorRuleSeverity.FATAL,
		name: 'Factor value must match type'
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_ENUM,
		severity: MonitorRuleSeverity.FATAL,
		name: 'Factor value must match enumeration',
		canApply: (topic: Topic, factor?: Factor) => {
			return !factor || [FactorType.ENUM].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Factor value must match date type',
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
		name: 'Rows no change'
	},
	{
		code: MonitorRuleCode.ROWS_COUNT,
		severity: MonitorRuleSeverity.WARN,
		name: 'Rows count change'
	},
	{
		code: MonitorRuleCode.ROWS_COUNT_INCREASING_RATE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Rows count increasing rate'
	},
	{
		code: MonitorRuleCode.ROWS_COUNT_AND_ANOTHER,
		severity: MonitorRuleSeverity.FATAL,
		name: 'Rows count with another topic',
		canApply: (topic: Topic) => topic.type !== TopicType.RAW
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
		name: 'Most common values coverage'
	},

	{
		code: MonitorRuleCode.FACTOR_MONOTONE_INCREASING,
		severity: MonitorRuleSeverity.WARN,
		name: 'Monotone increasing',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_MONOTONE_DECREASING,
		severity: MonitorRuleSeverity.WARN,
		name: 'Monotone decreasing',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_MAX_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Max value in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_MIN_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Min in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_SUM_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Sum in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_AVG_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Avg in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_MEDIAN_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Median in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_QUANTILE_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Quantile in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_STDEV_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'StDev in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_COMMON_VALUE_IN_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Most common values in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.NUMBER, FactorType.UNSIGNED].includes(factor.type);
		}
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
		name: 'String length',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.TEXT].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_STRING_LENGTH_RANGE,
		severity: MonitorRuleSeverity.WARN,
		name: 'String length in range',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.TEXT].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_REGEXP,
		severity: MonitorRuleSeverity.WARN,
		name: 'Match regexp',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.TEXT].includes(factor.type);
		}
	},
	{
		code: MonitorRuleCode.FACTOR_UNMATCH_REGEXP,
		severity: MonitorRuleSeverity.WARN,
		name: 'Unmatch regexp',
		canApply: (topic: Topic, factor?: Factor) => {
			return !!factor && [FactorType.TEXT].includes(factor.type);
		}
	},

	{
		code: MonitorRuleCode.FACTOR_AND_ANOTHER,
		severity: MonitorRuleSeverity.WARN,
		name: 'Value compare with another factor'
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
	})
}