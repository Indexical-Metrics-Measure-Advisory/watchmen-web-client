import {MonitorRule, MonitorRuleOnFactor, MonitorRules, TopicRuleDefs} from '@/services/data/data-quality/rule-types';
import {isRuleOnFactor} from '@/services/data/data-quality/rules';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {useEffect} from 'react';
import {useRulesEventBus} from '../rules-event-bus';
import {RulesEventTypes} from '../rules-event-bus-types';
import {transformRuleDefsToDisplay} from '../utils';
import {AddFactorRules} from './add-factor-rules';
import {FactorRulesRows} from './factor-rules-rows';
import {RuleMap} from './types';

const buildRuleMap = (rules: MonitorRules): RuleMap => {
	return rules.filter(rule => isRuleOnFactor(rule)).reduce((map, rule) => {
		const factorRule = rule as MonitorRuleOnFactor;
		const {factorId, code} = factorRule;
		let ruleMap: Record<string, MonitorRuleOnFactor> = map[factorId];
		if (!ruleMap) {
			ruleMap = {};
			map[factorId] = ruleMap;
		}
		ruleMap[code] = factorRule;
		return map;

	}, {} as Record<string, Record<string, MonitorRuleOnFactor>>);
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