import {Enum, EnumId} from '@/services/data/tuples/enum-types';
import {FactorId} from '@/services/data/tuples/factor-types';
import {Report, ReportFunnel, ReportFunnelId} from '@/services/data/tuples/report-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';

export type GroupedReportFunnel =
	Omit<ReportFunnel, 'funnelId' | 'columnId' | 'enabled'>
	& { enumId?: EnumId, name?: string };

export interface GroupedFunnel {
	funnel: GroupedReportFunnel;
	/** funnel is one of funnels array form report */
	reports: Array<{ report: Report; funnel: ReportFunnel }>;
}

export interface FunnelDef {
	// when funnel is an enum, find topicId & factorId from subject dataset first,
	// and ask topic definition for server side, to get the enumId
	topicId?: TopicId;
	factorId?: FactorId;
	enumId?: EnumId;
	// when funnel is a number
	name?: string;
}

export type FunnelDefs = Record<ReportFunnelId, FunnelDef>;

export interface FunnelsState {
	initialized: boolean;
	topics: Array<Topic>;
	enums: Array<Enum>;
	defs: FunnelDefs;
	groups: Array<GroupedFunnel>;
}
