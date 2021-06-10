import {
	isRuleOnTopic,
	MonitorRuleGrade,
	MonitorRuleOnTopic,
	MonitorRules,
	MonitorRuleSeverity,
	TopicRuleDefs
} from '../../../services/data-quality/rules';
import {prepareRuleParams, SeverityOptions, transformRuleDefsToDisplay} from '../utils';
import {TopicRuleCell, TopicRuleEnablementCell, TopicRuleRow, TopicRuleSeqCell} from './widgets';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React, {useEffect, useState} from 'react';
import {Topic} from '../../../services/tuples/topic-types';
import {useEnabledAndSeverity} from '../use-enabled-and-severity';
import {ColorfulCheckBox} from '../widgets';
import {useRulesEventBus} from '../rules-event-bus';
import {RulesEventTypes} from '../rules-event-bus-types';
import {RuleParameters} from '../parameters';

export const TopicGradeRules = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	const {on, off} = useRulesEventBus();
	const [visible, setVisible] = useState(true);
	const {onEnabledChanged, onSeverityChanged} = useEnabledAndSeverity(rules);
	useEffect(() => setVisible(true), [topic, rules]);
	useEffect(() => {
		const onFilterChanged = (all: boolean, topicOnly: boolean) => {
			setVisible(all || topicOnly);
		};
		on(RulesEventTypes.FILTER_BY_FACTOR, onFilterChanged);
		return () => {
			off(RulesEventTypes.FILTER_BY_FACTOR, onFilterChanged);
		};
	});

	if (!visible) {
		return null;
	}

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
				?? prepareRuleParams({
					code: def.code,
					topicId: topic.topicId,
					grade: MonitorRuleGrade.TOPIC,
					severity: def.severity ?? MonitorRuleSeverity.TRACE,
					enabled: false
				} as MonitorRuleOnTopic, def) as MonitorRuleOnTopic;
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
				<TopicRuleCell>
					{def.parameters ? <RuleParameters rule={rule} def={def}/> : null}
				</TopicRuleCell>
			</TopicRuleRow>;
		})}
	</>;
};