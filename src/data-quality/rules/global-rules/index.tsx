import {
	GlobalRuleDefs,
	MonitorRule,
	MonitorRuleGrade,
	MonitorRules,
	MonitorRuleSeverity
} from '@/services/data/data-quality/rule-types';
import {Dropdown} from '@/widgets/basic/dropdown';
import React from 'react';
import {RuleParameters} from '../parameters';
import {useEnabledAndSeverity} from '../use-enabled-and-severity';
import {prepareRuleParams, SeverityOptions, transformRuleDefsToDisplay} from '../utils';
import {ColorfulCheckBox} from '../widgets';
import {GlobalRuleCell, GlobalRuleEnablementCell, GlobalRuleRow, GlobalRuleSeqCell} from './widgets';

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