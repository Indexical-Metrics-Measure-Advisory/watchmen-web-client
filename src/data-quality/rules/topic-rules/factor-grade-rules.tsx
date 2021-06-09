import {Topic} from '../../../services/tuples/topic-types';
import {
	FactorRuleDefs,
	isRuleOnFactor,
	MonitorRule,
	MonitorRuleGrade,
	MonitorRuleOnFactor,
	MonitorRules,
	MonitorRuleSeverity,
	TopicRuleDefs
} from '../../../services/data-quality/rules';
import {MonitorRuleDef, SeverityOptions, transformRuleDefsToDisplay} from '../utils';
import {
	FactorRow,
	FactorRuleNameCell,
	FactorRuleRow,
	FactorRuleSeqCell,
	TopicRuleCell,
	TopicRuleEnablementCell,
	TopicRuleRow,
	TopicRuleSeqCell
} from './widgets';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React, {useEffect, useState} from 'react';
import {DropdownOption} from '../../../basic-widgets/types';
import {Factor} from '../../../services/tuples/factor-types';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {ColorfulCheckBox} from '../widgets';

type RuleMap = { [key in string]: { [key in string]: MonitorRuleOnFactor } }

interface State {
	factors: Array<Factor>;
	candidates: Array<Factor>;
	// first key is factor id, second key is rule code
	ruleMap: RuleMap
}

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

const FactorRulesRow = (props: {
	topic: Topic;
	factor: Factor;
	factorIndex: number;
	ruleMap: RuleMap;
	defs: Array<MonitorRuleDef>;
	topicDefsCount: number;
}) => {
	const {topic, factor, factorIndex, ruleMap, defs, topicDefsCount} = props;

	const forceUpdate = useForceUpdate();
	const onEnabledChanged = (rule: MonitorRule) => (value: boolean) => {
		rule.enabled = value;
		forceUpdate();
	};
	const onSeverityChanged = (rule: MonitorRule) => (option: DropdownOption) => {
		rule.severity = option.value;
		forceUpdate();
	};

	const factorId = factor.factorId;
	let factorRuleMap = ruleMap[factorId];
	if (!factorRuleMap) {
		factorRuleMap = {};
		ruleMap[factorId] = factorRuleMap;
	}
	const factorRuleDefs = defs.filter(def => !def.canApply || def.canApply(topic, factor));
	const rulesCount = factorRuleDefs.length;

	return <FactorRow rows={rulesCount} key={factor.factorId}>
		<FactorRuleSeqCell rows={rulesCount}>{factorIndex + 1 + topicDefsCount}</FactorRuleSeqCell>
		<FactorRuleNameCell rows={rulesCount}>{factor.name || 'Noname Factor'}</FactorRuleNameCell>
		{factorRuleDefs.map(def => {
			let rule = factorRuleMap[def.code];
			if (!rule) {
				rule = {
					code: def.code,
					topicId: topic.topicId,
					factorId,
					grade: MonitorRuleGrade.FACTOR,
					severity: def.severity ?? MonitorRuleSeverity.TRACE,
					enabled: false
				} as MonitorRuleOnFactor;
				factorRuleMap[def.code] = rule;
			}

			return <FactorRuleRow key={def.code}>
				<TopicRuleCell>{def.name}</TopicRuleCell>
				<TopicRuleEnablementCell>
					<ColorfulCheckBox value={rule?.enabled ?? false} onChange={onEnabledChanged(rule)}/>
				</TopicRuleEnablementCell>
				<TopicRuleCell>
					<Dropdown value={rule.severity} options={SeverityOptions}
					          onChange={onSeverityChanged(rule)}/>
				</TopicRuleCell>
				<TopicRuleCell/>
			</FactorRuleRow>;
		})}
	</FactorRow>;
};

export const FactorGradeRules = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	const [state, setState] = useState<State>({ruleMap: {}, factors: [], candidates: []});
	useEffect(() => {
		const ruleMap = buildRuleMap(rules);
		const factors = topic.factors.filter(factor => !!ruleMap[factor.factorId])
			.sort((f1, f2) => (f1.name || '').toLowerCase().localeCompare(f2.name || ''));
		const candidates = topic.factors.filter(factor => !ruleMap[factor.factorId]);
		setState({ruleMap, factors, candidates});
	}, [topic, rules]);

	const onNewFactorSelected = (option: DropdownOption) => {
		const factorId = option.value as string;
		// eslint-disable-next-line
		const factor = topic.factors.find(factor => factor.factorId == factorId)!;

		// doesn't rewrite the rule map
		// rule map will be changed in render
		setState({
			...state,
			factors: [...state.factors, factor],
			// eslint-disable-next-line
			candidates: state.candidates.filter(factor => factor.factorId != factorId)
		});
	};

	const topicDefsCount = transformRuleDefsToDisplay(TopicRuleDefs).filter(def => {
		if (!def.canApply) {
			return true;
		} else {
			return def.canApply(topic);
		}
	}).length;
	const defs = transformRuleDefsToDisplay(FactorRuleDefs);

	const candidatesOptions = state.candidates
		.sort((f1, f2) => (f1.name || '').toLowerCase().localeCompare(f2.name || ''))
		.map(factor => {
			return {value: factor.factorId, label: factor.name || 'Noname Factor'} as DropdownOption;
		});

	return <>
		{state.factors.map((factor, factorIndex) => {
			return <FactorRulesRow topic={topic} factor={factor} factorIndex={factorIndex}
			                       ruleMap={state.ruleMap} defs={defs} topicDefsCount={topicDefsCount}
			                       key={factor.factorId}/>;
		})}
		{candidatesOptions.length !== 0
			? <TopicRuleRow>
				<TopicRuleSeqCell>{state.factors.length + 1 + topicDefsCount}</TopicRuleSeqCell>
				<TopicRuleCell>
					<Dropdown options={candidatesOptions} onChange={onNewFactorSelected}/>
				</TopicRuleCell>
				<TopicRuleCell/>
				<TopicRuleCell/>
				<TopicRuleCell/>
				<TopicRuleCell/>
			</TopicRuleRow>
			: null}
	</>;
};