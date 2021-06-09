import {Topic} from '../../../services/tuples/topic-types';
import {
	FactorRuleDefs,
	MonitorRuleGrade,
	MonitorRuleOnFactor,
	MonitorRules,
	MonitorRuleSeverity
} from '../../../services/data-quality/rules';
import {SeverityOptions, transformRuleDefsToDisplay} from '../utils';
import {TopicRuleCell, TopicRuleEnablementCell, TopicRuleRow, TopicRuleSeqCell} from './widgets';
import {CheckBox} from '../../../basic-widgets/checkbox';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React from 'react';
import {useEnabledAndSeverity} from '../use-enabled-and-severity';

export const FactorGradeRules = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	const {onEnabledChanged, onSeverityChanged} = useEnabledAndSeverity(rules);

	const defs = transformRuleDefsToDisplay(FactorRuleDefs).filter(def => {
		if (!def.canApply) {
			return true;
		} else {
			return def.canApply(topic);
		}
	});

	return <>
		{defs.map((def, index) => {
			const rule = rules.find(({code}) => code === def.code)
				?? {
					code: def.code,
					topicId: topic.topicId,
					grade: MonitorRuleGrade.FACTOR,
					severity: def.severity ?? MonitorRuleSeverity.TRACE,
					enabled: false
				} as MonitorRuleOnFactor;
			return <TopicRuleRow key={def.code}>
				<TopicRuleSeqCell>{index + 1}</TopicRuleSeqCell>
				<TopicRuleCell>-</TopicRuleCell>
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