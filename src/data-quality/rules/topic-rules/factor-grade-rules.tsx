import {Topic} from '../../../services/tuples/topic-types';
import {
	isRuleOnFactor
} from '../../../services/data-quality/rules';
import {transformRuleDefsToDisplay} from '../utils';
import React, {useEffect} from 'react';
import {RuleMap} from './types';
import {FactorRulesRows} from './factor-rules-rows';
import {AddFactorRules} from './add-factor-rules';
import {useRulesEventBus} from '../rules-event-bus';
import {RulesEventTypes} from '../rules-event-bus-types';
import {MonitorRule, MonitorRuleOnFactor, MonitorRules, TopicRuleDefs} from '../../../services/data-quality/rule-types';

const buildRuleMap = (rules: MonitorRules): RuleMap => {
	return rules.filter(rule => isRuleOnFactor(rule)).reduce((map, rule) => {
		const factorRule = rule as MonitorRuleOnFactor;
		const {factorId, code} = factorRule;
		let ruleMap: { [key in string]: MonitorRuleOnFactor } = map[factorId];
		if (!ruleMap) {
			ruleMap = {};
			map[factorId] = ruleMap;
		}
		ruleMap[code] = factorRule;
		return map;

	}, {} as { [key in string]: { [key in string]: MonitorRuleOnFactor } });
};

export const FactorGradeRules = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	const {on, off} = useRulesEventBus();
	useEffect(() => {
		const onRuleChanged = (rule?: MonitorRule) => {
			if (!rule) {
				return;
			}

			if (!rules.includes(rule)) {
				rules.push(rule);
			}
		};
		on(RulesEventTypes.RULE_CHANGED, onRuleChanged);
		return () => {
			off(RulesEventTypes.RULE_CHANGED, onRuleChanged);
		};
	}, [on, off, rules]);

	const ruleMap = buildRuleMap(rules);
	const topicDefsCount = transformRuleDefsToDisplay(TopicRuleDefs).filter(def => {
		if (!def.canApply) {
			return true;
		} else {
			return def.canApply(topic);
		}
	}).length;

	return <>
		<FactorRulesRows topic={topic} topicDefsCount={topicDefsCount} ruleMap={ruleMap}/>
		<AddFactorRules topic={topic} topicDefsCount={topicDefsCount} ruleMap={ruleMap}/>
	</>;
};