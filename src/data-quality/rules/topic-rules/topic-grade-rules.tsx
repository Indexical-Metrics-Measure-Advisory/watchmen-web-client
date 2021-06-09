import {
	isRuleOnTopic,
	MonitorRuleGrade,
	MonitorRuleOnTopic,
	MonitorRules,
	MonitorRuleSeverity,
	TopicRuleDefs
} from '../../../services/data-quality/rules';
import {SeverityOptions, transformRuleDefsToDisplay} from '../utils';
import {TopicRuleCell, TopicRuleEnablementCell, TopicRuleRow, TopicRuleSeqCell} from './widgets';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React from 'react';
import {Topic} from '../../../services/tuples/topic-types';
import {useEnabledAndSeverity} from '../use-enabled-and-severity';
import {ColorfulCheckBox} from '../widgets';

export const TopicGradeRules = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	const {onEnabledChanged, onSeverityChanged} = useEnabledAndSeverity(rules);

	const defs = transformRuleDefsToDisplay(TopicRuleDefs).filter(def => {
		if (!def.canApply) {
			return true;
		} else {
			return def.canApply(topic);
		}
	});

	return <>
		{defs.map((def, index) => {
			const rule = rules.find(rule => isRuleOnTopic(rule) && rule.code === def.code)
				?? {
					code: def.code,
					topicId: topic.topicId,
					grade: MonitorRuleGrade.TOPIC,
					severity: def.severity ?? MonitorRuleSeverity.TRACE,
					enabled: false
				} as MonitorRuleOnTopic;
			return <TopicRuleRow key={def.code}>
				<TopicRuleSeqCell>{index + 1}</TopicRuleSeqCell>
				<TopicRuleCell>-</TopicRuleCell>
				<TopicRuleCell>{def.name}</TopicRuleCell>
				<TopicRuleEnablementCell>
					<ColorfulCheckBox value={rule?.enabled ?? false} onChange={onEnabledChanged(rule)}/>
				</TopicRuleEnablementCell>
				<TopicRuleCell>
					<Dropdown value={rule.severity} options={SeverityOptions} onChange={onSeverityChanged(rule)}/>
				</TopicRuleCell>
				<TopicRuleCell/>
			</TopicRuleRow>;
		})}
	</>;
};