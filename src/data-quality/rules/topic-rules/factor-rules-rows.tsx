import {Topic} from '../../../services/tuples/topic-types';
import {sortFactors, transformRuleDefsToDisplay} from '../utils';
import {FactorRuleDefs} from '../../../services/data-quality/rules';
import React, {useEffect, useState} from 'react';
import {RuleMap} from './types';
import {FactorRulesRow} from './factor-rules-row';
import {RulesEventTypes} from '../rules-event-bus-types';
import {useRulesEventBus} from '../rules-event-bus';
import {Factor} from '../../../services/tuples/factor-types';

export const FactorRulesRows = (props: {
	topic: Topic;
	topicDefsCount: number;
	ruleMap: RuleMap;
}) => {
	const {topic, topicDefsCount, ruleMap} = props;

	const {on, off, fire} = useRulesEventBus();
	// initialize defined factors
	const [definedFactors, setDefinedFactors] = useState<Array<Factor>>([]);
	// recompute factors when topic or rule map changed
	useEffect(() => {
		setDefinedFactors(sortFactors(topic.factors.filter(factor => !!ruleMap[factor.factorId])));
	}, [topic, ruleMap]);
	useEffect(() => {
		const onSortFactors = () => setDefinedFactors(definedFactors => sortFactors(definedFactors));
		on(RulesEventTypes.SORT_FACTORS, onSortFactors);
		return () => {
			off(RulesEventTypes.SORT_FACTORS, onSortFactors);
		};
	}, [on, off]);
	useEffect(() => {
		const onAddFactor = (factor: Factor) => {
			// add in to rule map, just create a empty map
			ruleMap[factor.factorId] = {};
			setDefinedFactors(definedFactors => [...definedFactors, factor]);
			// notify factor is added
			fire(RulesEventTypes.RULE_CHANGED);
			fire(RulesEventTypes.FACTOR_ADDED);
		};
		on(RulesEventTypes.ADD_FACTOR, onAddFactor);
		return () => {
			off(RulesEventTypes.ADD_FACTOR, onAddFactor);
		};
	}, [on, off, fire, ruleMap]);
	useEffect(() => {
		const onFilterChanged = (all: boolean, topicOnly: boolean, factor?: Factor) => {
			if (topicOnly) {
				setDefinedFactors([]);
			} else if (all) {
				setDefinedFactors(sortFactors(topic.factors.filter(factor => !!ruleMap[factor.factorId])));
			} else if (factor) {
				setDefinedFactors([factor]);
			}
		};
		on(RulesEventTypes.FILTER_BY_FACTOR, onFilterChanged);
		return () => {
			off(RulesEventTypes.FILTER_BY_FACTOR, onFilterChanged);
		};
	}, [on, off, topic, ruleMap]);

	const defs = transformRuleDefsToDisplay(FactorRuleDefs);

	return <>
		{definedFactors.map((factor, factorIndex) => {
			return <FactorRulesRow topic={topic} factor={factor} factorIndex={factorIndex}
			                       ruleMap={ruleMap} defs={defs} topicDefsCount={topicDefsCount}
			                       key={factor.factorId}/>;
		})}
	</>;
};
