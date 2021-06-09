import {MonitorLogCriteria} from '../../services/admin/logs';

export enum RulesEventTypes {
	DO_SEARCH = 'do-search',
}

export interface RulesEventBus {
	fire(type: RulesEventTypes.DO_SEARCH, criteria: MonitorLogCriteria): this;
	on(type: RulesEventTypes.DO_SEARCH, listener: (criteria: MonitorLogCriteria) => void): this;
	off(type: RulesEventTypes.DO_SEARCH, listener: (criteria: MonitorLogCriteria) => void): this;
}