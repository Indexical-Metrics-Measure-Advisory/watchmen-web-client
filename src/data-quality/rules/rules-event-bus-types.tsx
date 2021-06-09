import {MonitorRulesCriteria} from '../../services/data-quality/rules';
import {Topic} from '../../services/tuples/topic-types';

export enum RulesEventTypes {
	DO_SEARCH = 'do-search',
}

export interface RulesEventBus {
	fire(type: RulesEventTypes.DO_SEARCH, criteria: MonitorRulesCriteria, topic?: Topic): this;
	on(type: RulesEventTypes.DO_SEARCH, listener: (criteria: MonitorRulesCriteria, topic?: Topic) => void): this;
	off(type: RulesEventTypes.DO_SEARCH, listener: (criteria: MonitorRulesCriteria, topic?: Topic) => void): this;
}