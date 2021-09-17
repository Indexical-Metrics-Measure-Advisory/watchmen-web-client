import {MonitorLogCriteria} from '@/services/data/admin/logs';

export enum MonitorLogEventTypes {
	DO_SEARCH = 'do-search',
}

export interface MonitorLogEventBus {
	fire(type: MonitorLogEventTypes.DO_SEARCH, criteria: MonitorLogCriteria): this;
	on(type: MonitorLogEventTypes.DO_SEARCH, listener: (criteria: MonitorLogCriteria) => void): this;
	off(type: MonitorLogEventTypes.DO_SEARCH, listener: (criteria: MonitorLogCriteria) => void): this;
}