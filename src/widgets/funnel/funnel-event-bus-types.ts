import {Enum} from '@/services/data/tuples/enum-types';
import {ReportFunnel} from '@/services/data/tuples/report-types';

export enum FunnelEventTypes {
	VALUE_CHANGED = 'value-changed',

	RANGE_CHANGED = 'range-changed',

	ASK_ENUM = 'ask-enum',
	REPLY_ENUM = 'reply-enum'
}

export interface FunnelEventBus {
	fire(type: FunnelEventTypes.VALUE_CHANGED, funnel: ReportFunnel): this;
	on(type: FunnelEventTypes.VALUE_CHANGED, listener: (funnel: ReportFunnel) => void): this;
	off(type: FunnelEventTypes.VALUE_CHANGED, listener: (funnel: ReportFunnel) => void): this;

	fire(type: FunnelEventTypes.RANGE_CHANGED, funnel: ReportFunnel): this;
	on(type: FunnelEventTypes.RANGE_CHANGED, listener: (funnel: ReportFunnel) => void): this;
	off(type: FunnelEventTypes.RANGE_CHANGED, listener: (funnel: ReportFunnel) => void): this;

	fire(type: FunnelEventTypes.ASK_ENUM, funnel: ReportFunnel, ticket: string): this;
	on(type: FunnelEventTypes.ASK_ENUM, listener: (funnel: ReportFunnel, ticket: string) => void): this;
	off(type: FunnelEventTypes.ASK_ENUM, listener: (funnel: ReportFunnel, ticket: string) => void): this;

	fire(type: FunnelEventTypes.REPLY_ENUM, funnel: ReportFunnel, ticket: string, enumeration: Enum): this;
	once(type: FunnelEventTypes.REPLY_ENUM, listener: (funnel: ReportFunnel, ticket: string, enumeration: Enum) => void): this;
}