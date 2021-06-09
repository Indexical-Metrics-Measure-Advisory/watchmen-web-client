import React from 'react';
import {
	MonitorRule,
	MonitorRuleGrade,
	MonitorRules,
	MonitorRuleSeverity,
	TopicRuleDefs
} from '../../../services/data-quality/rules';
import {TopicRuleCell, TopicRuleEnablementCell, TopicRuleRow, TopicRuleSeqCell} from './widgets';
import {CheckBox} from '../../../basic-widgets/checkbox';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {Dropdown} from '../../../basic-widgets/dropdown';
import {DropdownOption} from '../../../basic-widgets/types';
import {SeverityOptions, transformRuleDefsToDisplay} from '../utils';

export const TopicRules = (props: { rules: MonitorRules }) => {
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

	const defs = transformRuleDefsToDisplay(TopicRuleDefs);

	return <>
		{defs.map((def, index) => {
			const rule = rules.find(({code}) => code === def.code)
				?? {
					code: def.code,
					grade: MonitorRuleGrade.GLOBAL,
					severity: MonitorRuleSeverity.TRACE,
					enabled: false
				};
			return <TopicRuleRow key={def.code}>
				<TopicRuleSeqCell>{index + 1}</TopicRuleSeqCell>
				<TopicRuleCell>{def.name}</TopicRuleCell>
				<TopicRuleEnablementCell>
					<CheckBox value={rule?.enabled ?? false} onChange={onEnabledChanged(rule)}/>
				</TopicRuleEnablementCell>
				<TopicRuleCell>
					<Dropdown value={rule.severity} options={SeverityOptions} onChange={onSeverityChanged(rule)}/>
				</TopicRuleCell>
			</TopicRuleRow>;
		})}
	</>;
};