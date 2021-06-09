import {MonitorRuleCode, MonitorRuleSeverity} from '../../services/data-quality/rules';
import {Topic, TopicType} from '../../services/tuples/topic-types';
import {Factor} from '../../services/tuples/factor-types';

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
		name: 'Factor value must match enumeration'
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,
		severity: MonitorRuleSeverity.WARN,
		name: 'Factor value must match date type'
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