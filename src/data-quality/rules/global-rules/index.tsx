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
import {Dropdown} from '../../../basic-widgets/dropdown';
import {SeverityOptions, transformRuleDefsToDisplay} from '../utils';
import {useEnabledAndSeverity} from '../use-enabled-and-severity';

export const GlobalRules = (props: { rules: MonitorRules }) => {
	const {rules} = props;

	const {onEnabledChanged, onSeverityChanged} = useEnabledAndSeverity(rules);

	const defs = transformRuleDefsToDisplay(GlobalRuleDefs);

	return <>
		{defs.map((def, index) => {
			const rule = rules.find(({code}) => code === def.code)
				?? {
					code: def.code,
					grade: MonitorRuleGrade.GLOBAL,
					severity: def.severity ?? MonitorRuleSeverity.TRACE,
					enabled: false
				} as MonitorRule;
			return <GlobalRuleRow key={def.code}>
				<GlobalRuleSeqCell>{index + 1}</GlobalRuleSeqCell>
				<GlobalRuleCell>{def.name}</GlobalRuleCell>
				<GlobalRuleEnablementCell>
					<CheckBox value={rule?.enabled ?? false} onChange={onEnabledChanged(rule)}/>
				</GlobalRuleEnablementCell>
				<GlobalRuleCell>
					<Dropdown value={rule.severity} options={SeverityOptions} onChange={onSeverityChanged(rule)}/>
				</GlobalRuleCell>
				<GlobalRuleCell/>
			</GlobalRuleRow>;
		})}
	</>;
};