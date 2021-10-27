import {Enum} from '@/services/data/tuples/enum-types';
import {Report, ReportFunnel} from '@/services/data/tuples/report-types';
import {Topic} from '@/services/data/tuples/topic-types';

export type GroupedReportFunnel =
	Omit<ReportFunnel, 'funnelId' | 'columnId' | 'enabled'>
	& { enumId?: string, name?: string };

export interface GroupedFunnel {
	funnel: GroupedReportFunnel;
	/** funnel is one of funnels array form report */
	reports: Array<{ report: Report; funnel: ReportFunnel }>;
}

export interface FunnelDef {
	// when funnel is an enum, find topicId & factorId from subject dataset first,
	// and ask topic definition for server side, to get the enumId
	topicId?: string;
	factorId?: string;
	enumId?: string;
	// when funnel is a number
	name?: string;
}

export type FunnelId = string;
export type FunnelDefs = Record<FunnelId, FunnelDef>;

export interface FunnelsState {
	initialized: boolean;
	topics: Array<Topic>;
	enums: Array<Enum>;
	defs: FunnelDefs;
	groups: Array<GroupedFunnel>;
}
