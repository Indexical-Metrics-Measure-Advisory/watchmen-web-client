import {Paragraph} from './paragraph';
import {ReportRect} from './report-types';
import {Tuple} from './tuple-types';

export type DashboardReportRect = ReportRect;

export interface DashboardReport {
    reportId: string;
    rect: DashboardReportRect;
}

export interface Dashboard extends Tuple {
    dashboardId: string;
    name: string;
    autoRefreshInterval?: number;
    reports?: Array<DashboardReport>;
    paragraphs?: Array<Paragraph>;
    lastVisitTime: string;
}