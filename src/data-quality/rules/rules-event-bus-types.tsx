import {MonitorRulesCriteria} from '../../services/data-quality/rules';
import {Topic} from '../../services/tuples/topic-types';
import {Factor} from '../../services/tuples/factor-types';

export enum RulesEventTypes {
	DO_SEARCH = 'do-search',

	FILTER_BY_FACTOR = 'filter-by-factor',
	SORT_FACTORS = 'sort-factors',
}

export interface RulesEventBus {
	fire(type: RulesEventTypes.DO_SEARCH, criteria: MonitorRulesCriteria, topic?: Topic): this;
	on(type: RulesEventTypes.DO_SEARCH, listener: (criteria: MonitorRulesCriteria, topic?: Topic) => void): this;
	off(type: RulesEventTypes.DO_SEARCH, listener: (criteria: MonitorRulesCriteria, topic?: Topic) => void): this;

	fire(type: RulesEventTypes.FILTER_BY_FACTOR, factor?: Factor): this;
	on(type: RulesEventTypes.FILTER_BY_FACTOR, listener: (factor?: Factor) => void): this;
	off(type: RulesEventTypes.FILTER_BY_FACTOR, listener: (factor?: Factor) => void): this;

	fire(type: RulesEventTypes.SORT_FACTORS): this;
	on(type: RulesEventTypes.SORT_FACTORS, listener: () => void): this;
	off(type: RulesEventTypes.SORT_FACTORS, listener: () => void): this;
}