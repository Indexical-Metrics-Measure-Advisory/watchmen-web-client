import React from 'react';
import {GlobalRuleCell, GlobalRuleEnablementCell, GlobalRuleRow, GlobalRuleSeqCell} from './widgets';
import {Dropdown} from '@/basic-widgets/dropdown';
import {prepareRuleParams, SeverityOptions, transformRuleDefsToDisplay} from '../utils';
import {useEnabledAndSeverity} from '../use-enabled-and-severity';
import {ColorfulCheckBox} from '../widgets';
import {RuleParameters} from '../parameters';
import {
	GlobalRuleDefs,
	MonitorRule,
	MonitorRuleGrade,
	MonitorRules,
	MonitorRuleSeverity
} from '@/services/data-quality/rule-types';

export const GlobalRules = (props: { rules: MonitorRules }) => {
	const {rules} = props;

	const {onEnabledChanged, onSeverityChanged} = useEnabledAndSeverity(rules);

	const defs = transformRuleDefsToDisplay(GlobalRuleDefs);

	return <>
		{defs.map((def, index) => {
			const rule = rules.find(({code}) => code === def.code)
				?? prepareRuleParams({
					code: def.code,
					grade: MonitorRuleGrade.GLOBAL,
					severity: def.severity ?? MonitorRuleSeverity.TRACE,
					enabled: false
				} as MonitorRule, def);
			return <GlobalRuleRow key={def.code}>
				<GlobalRuleSeqCell>{index + 1}</GlobalRuleSeqCell>
				<GlobalRuleCell>{def.name}</GlobalRuleCell>
				<GlobalRuleEnablementCell>
					<ColorfulCheckBox value={rule?.enabled ?? false} onChange={onEnabledChanged(rule)}/>
				</GlobalRuleEnablementCell>
				<GlobalRuleCell>
					<Dropdown value={rule.severity} options={SeverityOptions} onChange={onSeverityChanged(rule)}/>
				</GlobalRuleCell>
				<GlobalRuleCell>
					{def.parameters ? <RuleParameters rule={rule} def={def}/> : null}
				</GlobalRuleCell>
			</GlobalRuleRow>;
		})}
	</>;
};