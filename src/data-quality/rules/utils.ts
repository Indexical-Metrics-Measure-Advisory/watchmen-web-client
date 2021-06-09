import {MonitorRuleCode, MonitorRuleSeverity} from '../../services/data-quality/rules';

export interface MonitorRuleDef {
	code: MonitorRuleCode;
	name: string;
}

const defs = [
	{
		code: MonitorRuleCode.RAW_MATCH_STRUCTURE,
		name: 'Row of raw topic must match structure'
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_TYPE,
		name: 'Factor value must match type'
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_ENUM,
		name: 'Factor value must match enumeration'
	},
	{
		code: MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,
		name: 'Factor value must match date type'
	},

	{
		code: MonitorRuleCode.ROWS_NO_CHANGE,
		name: 'Rows no change'
	},
	{
		code: MonitorRuleCode.ROWS_COUNT,
		name: 'Rows count change'
	},
	{
		code: MonitorRuleCode.ROWS_COUNT_INCREASING_RATE,
		name: 'Rows count increasing rate'
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