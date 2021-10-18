import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Paragraph} from '@/services/data/tuples/paragraph';
import {Report} from '@/services/data/tuples/report-types';

export enum DashboardEventTypes {
	SAVE_DASHBOARD = 'save-dashboard',
	REFRESH_INTERVAL_CHANGED = 'refresh-interval-changed',

	REPORT_ADDED = 'report-added',
	REPORT_REMOVED = 'report-removed',

	PARAGRAPH_ADDED = 'paragraph-added',
	PARAGRAPH_REMOVED = 'paragraph-removed',

	TOGGLE_PRINT_PAGE_SIZE = 'toggle-print-page-size',
	REFRESH_REPORTS = 'refresh-reports',

	REPAINT_REPORTS = 'repaint-reports',
	REPAINT_REPORTS_ON_ADDED = 'repaint-reports-on-added',
	REPAINT_REPORTS_ON_REMOVED = 'repaint-reports-on-removed',
}

export interface DashboardEventBus {
	fire(type: DashboardEventTypes.SAVE_DASHBOARD, dashboard: Dashboard): this;
	on(type: DashboardEventTypes.SAVE_DASHBOARD, listener: (dashboard: Dashboard) => void): this;
	off(type: DashboardEventTypes.SAVE_DASHBOARD, listener: (dashboard: Dashboard) => void): this;

	fire(type: DashboardEventTypes.REFRESH_INTERVAL_CHANGED, dashboard: Dashboard): this;
	on(type: DashboardEventTypes.REFRESH_INTERVAL_CHANGED, listener: (dashboard: Dashboard) => void): this;
	off(type: DashboardEventTypes.REFRESH_INTERVAL_CHANGED, listener: (dashboard: Dashboard) => void): this;

	fire(type: DashboardEventTypes.REPORT_ADDED, report: Report): this;
	on(type: DashboardEventTypes.REPORT_ADDED, listener: (report: Report) => void): this;
	off(type: DashboardEventTypes.REPORT_ADDED, listener: (report: Report) => void): this;

	fire(type: DashboardEventTypes.REPORT_REMOVED, report: Report): this;
	on(type: DashboardEventTypes.REPORT_REMOVED, listener: (report: Report) => void): this;
	off(type: DashboardEventTypes.REPORT_REMOVED, listener: (report: Report) => void): this;

	fire(type: DashboardEventTypes.PARAGRAPH_ADDED, paragraph: Paragraph): this;
	on(type: DashboardEventTypes.PARAGRAPH_ADDED, listener: (paragraph: Paragraph) => void): this;
	off(type: DashboardEventTypes.PARAGRAPH_ADDED, listener: (paragraph: Paragraph) => void): this;

	fire(type: DashboardEventTypes.PARAGRAPH_REMOVED, paragraph: Paragraph): this;
	on(type: DashboardEventTypes.PARAGRAPH_REMOVED, listener: (paragraph: Paragraph) => void): this;
	off(type: DashboardEventTypes.PARAGRAPH_REMOVED, listener: (paragraph: Paragraph) => void): this;

	fire(type: DashboardEventTypes.TOGGLE_PRINT_PAGE_SIZE, visible: boolean): this;
	on(type: DashboardEventTypes.TOGGLE_PRINT_PAGE_SIZE, listener: (visible: boolean) => void): this;
	off(type: DashboardEventTypes.TOGGLE_PRINT_PAGE_SIZE, listener: (visible: boolean) => void): this;

	fire(type: DashboardEventTypes.REFRESH_REPORTS, dashboard: Dashboard): this;
	on(type: DashboardEventTypes.REFRESH_REPORTS, listener: (dashboard: Dashboard) => void): this;
	off(type: DashboardEventTypes.REFRESH_REPORTS, listener: (dashboard: Dashboard) => void): this;

	fire(type: DashboardEventTypes.REPAINT_REPORTS, dashboard: Dashboard, reports: Array<Report>): this;
	on(type: DashboardEventTypes.REPAINT_REPORTS, listener: (dashboard: Dashboard, reports: Array<Report>) => void): this;
	off(type: DashboardEventTypes.REPAINT_REPORTS, listener: (dashboard: Dashboard, reports: Array<Report>) => void): this;

	fire(type: DashboardEventTypes.REPAINT_REPORTS_ON_ADDED, dashboard: Dashboard): this;
	on(type: DashboardEventTypes.REPAINT_REPORTS_ON_ADDED, listener: (dashboard: Dashboard) => void): this;
	off(type: DashboardEventTypes.REPAINT_REPORTS_ON_ADDED, listener: (dashboard: Dashboard) => void): this;

	fire(type: DashboardEventTypes.REPAINT_REPORTS_ON_REMOVED, dashboard: Dashboard): this;
	on(type: DashboardEventTypes.REPAINT_REPORTS_ON_REMOVED, listener: (dashboard: Dashboard) => void): this;
	off(type: DashboardEventTypes.REPAINT_REPORTS_ON_REMOVED, listener: (dashboard: Dashboard) => void): this;
}