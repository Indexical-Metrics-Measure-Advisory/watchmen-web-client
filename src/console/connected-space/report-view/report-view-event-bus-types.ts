import {Report} from '../../../services/tuples/report-types';

export enum ReportViewEventTypes {
	REFRESH_REPORTS = 'refresh-reports',

	SHOW_DATASET = 'show-dateset'
}

export interface ReportViewEventBus {
	fire(type: ReportViewEventTypes.REFRESH_REPORTS, report: Report): this;
	on(type: ReportViewEventTypes.REFRESH_REPORTS, listener: (report: Report) => void): this;
	off(type: ReportViewEventTypes.REFRESH_REPORTS, listener: (report: Report) => void): this;

	fire(type: ReportViewEventTypes.SHOW_DATASET, report: Report, shown: boolean): this;
	on(type: ReportViewEventTypes.SHOW_DATASET, listener: (report: Report, shown: boolean) => void): this;
	off(type: ReportViewEventTypes.SHOW_DATASET, listener: (report: Report, shown: boolean) => void): this;
}