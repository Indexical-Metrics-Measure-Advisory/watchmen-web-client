import {DateTime} from '../types';
import {Paragraph} from './paragraph';
import {ReportFunnel, ReportId, ReportRect} from './report-types';
import {Tuple} from './tuple-types';

export type DashboardReportRect = ReportRect;

export interface DashboardReport {
	reportId: ReportId;
	funnels?: Array<ReportFunnel>;
	rect: DashboardReportRect;
}

export type DashboardId = string;

export interface Dashboard extends Tuple {
	dashboardId: DashboardId;
	name: string;
	autoRefreshInterval?: number;
	reports?: Array<DashboardReport>;
	paragraphs?: Array<Paragraph>;
	lastVisitTime: DateTime;
}