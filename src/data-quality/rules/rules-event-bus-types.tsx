import {MonitorRule, MonitorRules, MonitorRulesCriteria} from '@/services/data/data-quality/rule-types';
import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';

export enum RulesEventTypes {
	DO_SEARCH = 'do-search',

	FILTER_BY_FACTOR = 'filter-by-factor',
	SORT_FACTORS = 'sort-factors',

	ADD_FACTOR = 'add-factor',

	RULE_CHANGED = 'rule-changed',
	ASK_RULE_CHANGED = 'ask-rule-changed',

	SAVED = 'saved',
}

export interface RulesEventBus {
	fire(type: RulesEventTypes.DO_SEARCH, criteria: MonitorRulesCriteria, topic?: Topic): this;
	on(type: RulesEventTypes.DO_SEARCH, listener: (criteria: MonitorRulesCriteria, topic?: Topic) => void): this;
	off(type: RulesEventTypes.DO_SEARCH, listener: (criteria: MonitorRulesCriteria, topic?: Topic) => void): this;

	fire(type: RulesEventTypes.FILTER_BY_FACTOR, all: boolean, topicOnly: boolean, factor?: Factor): this;
	on(type: RulesEventTypes.FILTER_BY_FACTOR, listener: (all: boolean, topicOnly: boolean, factor?: Factor) => void): this;
	off(type: RulesEventTypes.FILTER_BY_FACTOR, listener: (all: boolean, topicOnly: boolean, factor?: Factor) => void): this;

	fire(type: RulesEventTypes.SORT_FACTORS): this;
	on(type: RulesEventTypes.SORT_FACTORS, listener: () => void): this;
	off(type: RulesEventTypes.SORT_FACTORS, listener: () => void): this;

	fire(type: RulesEventTypes.ADD_FACTOR, factor: Factor, onAdded: () => void): this;
	on(type: RulesEventTypes.ADD_FACTOR, listener: (factor: Factor, onAdded: () => void) => void): this;
	off(type: RulesEventTypes.ADD_FACTOR, listener: (factor: Factor, onAdded: () => void) => void): this;

	fire(type: RulesEventTypes.RULE_CHANGED, rule?: MonitorRule): this;
	on(type: RulesEventTypes.RULE_CHANGED, listener: (rule?: MonitorRule) => void): this;
	off(type: RulesEventTypes.RULE_CHANGED, listener: (rule?: MonitorRule) => void): this;

	fire(type: RulesEventTypes.ASK_RULE_CHANGED, onChangedGet: (changed: boolean) => void): this;
	on(type: RulesEventTypes.ASK_RULE_CHANGED, listener: (onChangedGet: (changed: boolean) => void) => void): this;
	off(type: RulesEventTypes.ASK_RULE_CHANGED, listener: (onChangedGet: (changed: boolean) => void) => void): this;

	fire(type: RulesEventTypes.SAVED, rules: MonitorRules): this;
	on(type: RulesEventTypes.SAVED, listener: (rules: MonitorRules) => void): this;
	off(type: RulesEventTypes.SAVED, listener: (rules: MonitorRules) => void): this;
}