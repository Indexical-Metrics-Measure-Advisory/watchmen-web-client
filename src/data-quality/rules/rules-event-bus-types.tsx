import {Topic} from '@/services/tuples/topic-types';
import {Factor} from '@/services/tuples/factor-types';
import {MonitorRule, MonitorRules, MonitorRulesCriteria} from '@/services/data-quality/rule-types';

export enum RulesEventTypes {
	DO_SEARCH = 'do-search',

	FILTER_BY_FACTOR = 'filter-by-factor',
	SORT_FACTORS = 'sort-factors',

	ADD_FACTOR = 'add-factor',
	FACTOR_ADDED = 'factor-added',

	RULE_CHANGED = 'rule-changed',
	ASK_RULE_CHANGED = 'ask-rule-changed',
	REPLY_RULE_CHANGED = 'reply-rule-changed',

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

	fire(type: RulesEventTypes.ADD_FACTOR, factor: Factor): this;
	on(type: RulesEventTypes.ADD_FACTOR, listener: (factor: Factor) => void): this;
	off(type: RulesEventTypes.ADD_FACTOR, listener: (factor: Factor) => void): this;

	fire(type: RulesEventTypes.FACTOR_ADDED): this;
	once(type: RulesEventTypes.FACTOR_ADDED, listener: () => void): this;

	fire(type: RulesEventTypes.RULE_CHANGED, rule?: MonitorRule): this;
	on(type: RulesEventTypes.RULE_CHANGED, listener: (rule?: MonitorRule) => void): this;
	off(type: RulesEventTypes.RULE_CHANGED, listener: (rule?: MonitorRule) => void): this;

	fire(type: RulesEventTypes.ASK_RULE_CHANGED): this;
	on(type: RulesEventTypes.ASK_RULE_CHANGED, listener: () => void): this;
	off(type: RulesEventTypes.ASK_RULE_CHANGED, listener: () => void): this;

	fire(type: RulesEventTypes.REPLY_RULE_CHANGED, changed: boolean): this;
	once(type: RulesEventTypes.REPLY_RULE_CHANGED, listener: (changed: boolean) => void): this;

	fire(type: RulesEventTypes.SAVED, rules: MonitorRules): this;
	on(type: RulesEventTypes.SAVED, listener: (rules: MonitorRules) => void): this;
	off(type: RulesEventTypes.SAVED, listener: (rules: MonitorRules) => void): this;
}