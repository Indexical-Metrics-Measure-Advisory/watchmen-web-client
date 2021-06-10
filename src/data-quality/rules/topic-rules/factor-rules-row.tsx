import {Topic} from '../../../services/tuples/topic-types';
import {Factor} from '../../../services/tuples/factor-types';
import {MonitorRuleDef, prepareRuleParams, SeverityOptions} from '../utils';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {
	MonitorRule,
	MonitorRuleGrade,
	MonitorRuleOnFactor,
	MonitorRuleSeverity
} from '../../../services/data-quality/rules';
import {DropdownOption} from '../../../basic-widgets/types';
import {
	FactorRow,
	FactorRuleNameCell,
	FactorRuleRow,
	FactorRuleSeqCell,
	TopicRuleCell,
	TopicRuleEnablementCell
} from './widgets';
import {ColorfulCheckBox} from '../widgets';
import {Dropdown} from '../../../basic-widgets/dropdown';
import React from 'react';
import {RuleMap} from './types';
import {RulesEventTypes} from '../rules-event-bus-types';
import {useRulesEventBus} from '../rules-event-bus';
import {RuleParameters} from '../parameters';

export const FactorRulesRow = (props: {
	topic: Topic;
	factor: Factor;
	factorIndex: number;
	ruleMap: RuleMap;
	defs: Array<MonitorRuleDef>;
	topicDefsCount: number;
}) => {
	const {topic, factor, factorIndex, ruleMap, defs, topicDefsCount} = props;

	const {fire} = useRulesEventBus();
	const forceUpdate = useForceUpdate();
	const onEnabledChanged = (rule: MonitorRule) => (value: boolean) => {
		rule.enabled = value;
		fire(RulesEventTypes.RULE_CHANGED, rule);
		forceUpdate();
	};
	const onSeverityChanged = (rule: MonitorRule) => (option: DropdownOption) => {
		rule.severity = option.value;
		fire(RulesEventTypes.RULE_CHANGED, rule);
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
				rule = prepareRuleParams({
					code: def.code,
					topicId: topic.topicId,
					factorId,
					grade: MonitorRuleGrade.FACTOR,
					severity: def.severity ?? MonitorRuleSeverity.TRACE,
					enabled: false
				} as MonitorRuleOnFactor, def) as MonitorRuleOnFactor;
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
				<TopicRuleCell>
					{def.parameters ? <RuleParameters rule={rule} def={def}/> : null}
				</TopicRuleCell>
			</FactorRuleRow>;
		})}
	</FactorRow>;
};
