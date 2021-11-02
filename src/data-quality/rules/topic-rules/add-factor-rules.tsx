import {Topic} from '@/services/data/tuples/topic-types';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect, useState} from 'react';
import {useRulesEventBus} from '../rules-event-bus';
import {RulesEventTypes} from '../rules-event-bus-types';
import {sortFactors} from '../utils';
import {RuleMap} from './types';
import {TopicRuleCell, TopicRuleRow, TopicRuleSeqCell} from './widgets';

export const AddFactorRules = (props: {
	topic: Topic;
	topicDefsCount: number;
	ruleMap: RuleMap;
}) => {
	const {topic, topicDefsCount, ruleMap} = props;

	const {fire, on, off} = useRulesEventBus();
	const [visible, setVisible] = useState(true);
	const forceUpdate = useForceUpdate();
	useEffect(() => setVisible(true), [topic, ruleMap]);
	useEffect(() => {
		const onFilterChanged = (all: boolean) => setVisible(all);
		on(RulesEventTypes.FILTER_BY_FACTOR, onFilterChanged);
		return () => {
			off(RulesEventTypes.FILTER_BY_FACTOR, onFilterChanged);
		};
	});

	if (!visible) {
		return null;
	}

	const candidates = sortFactors(topic.factors.filter(factor => !ruleMap[factor.factorId]));
	if (candidates.length === 0) {
		return null;
	}

	const onNewFactorSelected = (option: DropdownOption) => {
		const factorId = option.value as string;
		// eslint-disable-next-line
		const factor = topic.factors.find(factor => factor.factorId == factorId)!;

		fire(RulesEventTypes.ADD_FACTOR, factor, () => forceUpdate());
	};

	const candidatesOptions = candidates.map(factor => {
		return {value: factor.factorId, label: factor.name || 'Noname Factor'} as DropdownOption;
	});

	return <TopicRuleRow>
		<TopicRuleSeqCell>{Object.keys(ruleMap).length + 1 + topicDefsCount}</TopicRuleSeqCell>
		<TopicRuleCell>
			<Dropdown options={candidatesOptions} onChange={onNewFactorSelected}
			          please="Define factor rules..."/>
		</TopicRuleCell>
		<TopicRuleCell/>
		<TopicRuleCell/>
		<TopicRuleCell/>
		<TopicRuleCell/>
	</TopicRuleRow>;
};