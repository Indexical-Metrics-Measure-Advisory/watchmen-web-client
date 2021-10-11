import {Report} from '@/services/data/tuples/report-types';

export enum ReportViewEventTypes {
	/** @deprecated never used now */
	REFRESH_REPORTS = 'refresh-reports',

	TOGGLE_SETTINGS = 'toggle-settings',
	SHOW_SETTINGS = 'show-settings',
	HIDE_SETTINGS = 'hide-settings',

	TOGGLE_DATASET = 'toggle-dataset',
	TOGGLE_PALETTE = 'toggle-palette'
}

export interface ReportViewEventBus {
	fire(type: ReportViewEventTypes.REFRESH_REPORTS, report: Report): this;
	on(type: ReportViewEventTypes.REFRESH_REPORTS, listener: (report: Report) => void): this;
	off(type: ReportViewEventTypes.REFRESH_REPORTS, listener: (report: Report) => void): this;

	fire(type: ReportViewEventTypes.TOGGLE_SETTINGS, report: Report): this;
	on(type: ReportViewEventTypes.TOGGLE_SETTINGS, listener: (report: Report) => void): this;
	off(type: ReportViewEventTypes.TOGGLE_SETTINGS, listener: (report: Report) => void): this;

	fire(type: ReportViewEventTypes.SHOW_SETTINGS, report: Report): this;
	on(type: ReportViewEventTypes.SHOW_SETTINGS, listener: (report: Report) => void): this;
	off(type: ReportViewEventTypes.SHOW_SETTINGS, listener: (report: Report) => void): this;

	fire(type: ReportViewEventTypes.HIDE_SETTINGS, report: Report): this;
	on(type: ReportViewEventTypes.HIDE_SETTINGS, listener: (report: Report) => void): this;
	off(type: ReportViewEventTypes.HIDE_SETTINGS, listener: (report: Report) => void): this;

	fire(type: ReportViewEventTypes.TOGGLE_DATASET, report: Report): this;
	on(type: ReportViewEventTypes.TOGGLE_DATASET, listener: (report: Report) => void): this;
	off(type: ReportViewEventTypes.TOGGLE_DATASET, listener: (report: Report) => void): this;

	fire(type: ReportViewEventTypes.TOGGLE_PALETTE, report: Report): this;
	on(type: ReportViewEventTypes.TOGGLE_PALETTE, listener: (report: Report) => void): this;
	off(type: ReportViewEventTypes.TOGGLE_PALETTE, listener: (report: Report) => void): this;
}