import {Report} from '../../../services/tuples/report-types';

export enum ReportViewEventTypes {
	REPORT_RENAMED = 'report-renamed',

	REFRESH_REPORTS = 'refresh-reports'
}

export interface ReportViewEventBus {
	fire(type: ReportViewEventTypes.REPORT_RENAMED, report: Report): this;
	on(type: ReportViewEventTypes.REPORT_RENAMED, listener: (report: Report) => void): this;
	off(type: ReportViewEventTypes.REPORT_RENAMED, listener: (report: Report) => void): this;

	fire(type: ReportViewEventTypes.REFRESH_REPORTS, report: Report): this;
	on(type: ReportViewEventTypes.REFRESH_REPORTS, listener: (report: Report) => void): this;
	off(type: ReportViewEventTypes.REFRESH_REPORTS, listener: (report: Report) => void): this;
}