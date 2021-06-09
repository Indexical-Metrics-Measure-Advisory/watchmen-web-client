import {Topic} from '../../../services/tuples/topic-types';
import {
	FactorRuleDefs,
	isRuleOnFactor,
	MonitorRuleGrade,
	MonitorRuleOnFactor,
	MonitorRules,
	MonitorRuleSeverity,
	TopicRuleDefs
} from '../../../services/data-quality/rules';
import {SeverityOptions, transformRuleDefsToDisplay} from '../utils';
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
import {CheckBox} from '../../../basic-widgets/checkbox';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React, {useEffect, useState} from 'react';
import {useEnabledAndSeverity} from '../use-enabled-and-severity';
import {DropdownOption} from '../../../basic-widgets/types';
import {Factor} from '../../../services/tuples/factor-types';

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
export const FactorGradeRules = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	const [state, setState] = useState<State>({ruleMap: {}, factors: [], candidates: []});
	const {onEnabledChanged, onSeverityChanged} = useEnabledAndSeverity(rules);
	useEffect(() => {
		const ruleMap = buildRuleMap(rules);
		const factors = topic.factors.filter(factor => !!ruleMap[factor.factorId]);
		const candidates = topic.factors.filter(factor => !ruleMap[factor.factorId]);
		setState({ruleMap, factors, candidates});
	}, [topic, rules]);

	const onNewFactorSelected = (option: DropdownOption) => {
		const factorId = option.value as string;
		// eslint-disable-next-line
		const factor = topic.factors.find(factor => factor.factorId == factorId)!;
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
	const defs = transformRuleDefsToDisplay(FactorRuleDefs).filter(def => {
		if (!def.canApply) {
			return true;
		} else {
			return def.canApply(topic);
		}
	});

	const candidatesOptions = state.candidates
		.sort((f1, f2) => (f1.name || '').toLowerCase().localeCompare(f2.name || ''))
		.map(factor => {
			return {value: factor.factorId, label: factor.name || 'Noname Factor'} as DropdownOption;
		});

	return <>
		{state.factors.map((factor, factorIndex) => {
			const factorId = factor.factorId;
			const ruleMap = state.ruleMap[factorId] ?? {};
			const factorRuleDefs = defs.filter(def => !def.canApply || def.canApply(topic, factor));
			const rulesCount = factorRuleDefs.length;

			return <FactorRow rows={rulesCount} key={factor.factorId}>
				<FactorRuleSeqCell rows={rulesCount}>{factorIndex + 1 + topicDefsCount}</FactorRuleSeqCell>
				<FactorRuleNameCell rows={rulesCount}>{factor.name || 'Noname Factor'}</FactorRuleNameCell>
				{factorRuleDefs.map(def => {
					const rule = ruleMap[def.code]
						?? {
							code: def.code,
							topicId: topic.topicId,
							factorId,
							grade: MonitorRuleGrade.FACTOR,
							severity: def.severity ?? MonitorRuleSeverity.TRACE,
							enabled: false
						} as MonitorRuleOnFactor;
					if (!rule) {
						return null;
					}

					return <FactorRuleRow key={def.code}>
						<TopicRuleCell>{def.name}</TopicRuleCell>
						<TopicRuleEnablementCell>
							<CheckBox value={rule?.enabled ?? false} onChange={onEnabledChanged(rule)}/>
						</TopicRuleEnablementCell>
						<TopicRuleCell>
							<Dropdown value={rule.severity} options={SeverityOptions}
							          onChange={onSeverityChanged(rule)}/>
						</TopicRuleCell>
						<TopicRuleCell/>
					</FactorRuleRow>;
				})}
			</FactorRow>;
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