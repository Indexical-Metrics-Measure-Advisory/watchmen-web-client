import React from 'react';
import {
	GlobalRuleDefs,
	MonitorRule,
	MonitorRuleCodes,
	MonitorRuleGrade,
	MonitorRules,
	MonitorRuleSeverity
} from '../../../services/data-quality/rules';
import {GlobalRuleCell, GlobalRuleEnablementCell, GlobalRuleRow, GlobalRuleSeqCell} from './widgets';
import {CheckBox} from '../../../basic-widgets/checkbox';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {Dropdown} from '../../../basic-widgets/dropdown';
import {DropdownOption} from '../../../basic-widgets/types';

const Defs = GlobalRuleDefs.map(code => {
	let name;
	switch (code) {
		case MonitorRuleCodes.RAW_MATCH_STRUCTURE:
			name = 'Row of raw topic must match structure';
			break;
		case MonitorRuleCodes.FACTOR_MATCH_TYPE:
			name = 'Factor value must match type';
			break;
		case MonitorRuleCodes.FACTOR_MATCH_ENUM:
			name = 'Factor value must match enumeration';
			break;
		case MonitorRuleCodes.FACTOR_MATCH_DATE_TYPE:
			name = 'Factor value must match date type';
			break;
	}
	return {code, name};
});
const SeverityOptions = [
	{value: MonitorRuleSeverity.FATAL, label: 'Fatal'},
	{value: MonitorRuleSeverity.WARN, label: 'Warn'},
	{value: MonitorRuleSeverity.TRACE, label: 'Trace'}
];
export const GlobalRules = (props: { rules: MonitorRules }) => {
	const {rules} = props;

	const forceUpdate = useForceUpdate();

	const onEnabledChanged = (rule: MonitorRule) => (value: boolean) => {
		rule.enabled = value;
		if (!rules.includes(rule)) {
			rules.push(rule);
		}
		forceUpdate();
	};
	const onSeverityChanged = (rule: MonitorRule) => (option: DropdownOption) => {
		rule.severity = option.value;
		if (!rules.includes(rule)) {
			rules.push(rule);
		}
		forceUpdate();
	};

	return <>
		{Defs.map((def, index) => {
			const rule = rules.find(({code}) => code === def.code)
				?? {
					code: def.code,
					grade: MonitorRuleGrade.GLOBAL,
					severity: MonitorRuleSeverity.TRACE,
					enabled: false
				};
			return <GlobalRuleRow key={def.code}>
				<GlobalRuleSeqCell>{index + 1}</GlobalRuleSeqCell>
				<GlobalRuleCell>{def.name}</GlobalRuleCell>
				<GlobalRuleEnablementCell>
					<CheckBox value={rule?.enabled ?? false} onChange={onEnabledChanged(rule)}/>
				</GlobalRuleEnablementCell>
				<GlobalRuleCell>
					<Dropdown value={rule.severity} options={SeverityOptions} onChange={onSeverityChanged(rule)}/>
				</GlobalRuleCell>
			</GlobalRuleRow>;
		})}
	</>;
};