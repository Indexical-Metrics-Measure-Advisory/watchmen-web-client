import {
	MonitorRule,
	MonitorRuleCode,
	MonitorRuleCompareOperator,
	MonitorRuleSeverity,
	MonitorRuleStatisticalInterval
} from '../../services/data-quality/rules';
import {Factor} from '../../services/tuples/factor-types';
import {MonitorRuleDef, MonitorRuleParameterType, RuleDefs} from '../rule-defs';

export const transformRuleDefsToDisplay = (codes: Array<MonitorRuleCode>) => {
	return codes.map(code => {
		const def = RuleDefs[code];
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
			case MonitorRuleParameterType.STATISTICAL_INTERVAL:
				if (!params.statisticalInterval) {
					params.statisticalInterval = MonitorRuleStatisticalInterval.MONTHLY;
					rule.params = params;
				}
				break;
			case MonitorRuleParameterType.COMPARE_OPERATOR:
				if (!params.compareOperator) {
					params.compareOperator = MonitorRuleCompareOperator.EQUAL;
					rule.params = params;
				}
				break;
		}
	});

	return rule;
};