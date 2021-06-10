import {Topic} from '../../../services/tuples/topic-types';
import {isRuleOnFactor, MonitorRuleOnFactor, MonitorRules, TopicRuleDefs} from '../../../services/data-quality/rules';
import {transformRuleDefsToDisplay} from '../utils';
import React from 'react';
import {RuleMap} from './types';
import {FactorRulesRows} from './factor-rules-rows';
import {AddFactorRules} from './add-factor-rules';

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