import React from 'react';
import {
	GlobalRuleDefs,
	MonitorRule,
	MonitorRuleGrade,
	MonitorRules,
	MonitorRuleSeverity
} from '../../../services/data-quality/rules';
import {GlobalRuleCell, GlobalRuleEnablementCell, GlobalRuleRow, GlobalRuleSeqCell} from './widgets';
import {CheckBox} from '../../../basic-widgets/checkbox';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {Dropdown} from '../../../basic-widgets/dropdown';
import {DropdownOption} from '../../../basic-widgets/types';
import {SeverityOptions, transformRuleDefsToDisplay} from '../utils';


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

	const defs = transformRuleDefsToDisplay(GlobalRuleDefs);

	return <>
		{defs.map((def, index) => {
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