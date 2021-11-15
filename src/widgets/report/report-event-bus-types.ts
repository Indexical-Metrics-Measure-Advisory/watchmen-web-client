import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {Paragraph} from '@/services/data/tuples/paragraph';
import {Report} from '@/services/data/tuples/report-types';
import {ChartOptions} from './chart-utils/types';

export enum ReportEventTypes {
	/** use report structure in client side, only works on editing */
	DO_RELOAD_DATA_ON_EDITING = 'do-reload-data-on-editing',
	/** use report structure in client side, force do */
	DO_RELOAD_DATA_BY_CLIENT = 'do-reload-data-by-client',

	DO_DELETE_REPORT = 'do-delete-report',
	DO_DELETE_PARAGRAPH = 'do-delete-paragraph',

	REPORT_MOVE_OR_RESIZE_COMPLETED = 'report-move-or-resize-completed',
	PARAGRAPH_MOVE_OR_RESIZE_COMPLETED = 'paragraph-move-or-resize-completed',

	STRUCTURE_CHANGED = 'structure-changed',
	STYLE_CHANGED = 'styled-changed',
	DATA_SAVED = 'data-saved',
	ASK_REPORT_STRUCTURE_CHANGED = 'ask-report-structure-changed',

	/** use report structure in server side */
	DO_REFRESH = 'do-refresh',

	ASK_DOWNLOAD_CHART = 'ask-download-chart',
	CHART_OPTIONS_READY = 'chart-options-ready',

	ASK_DATA = 'ask-data',
	DATA_LOADED = 'data-loaded',
	REPAINTED = 'repainted',
	THUMBNAIL_CAUGHT = 'thumbnail-caught'
}

export interface ReportEventBus {
	fire(type: ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, report: Report): this;
	on(type: ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.DO_RELOAD_DATA_BY_CLIENT, report: Report): this;
	on(type: ReportEventTypes.DO_RELOAD_DATA_BY_CLIENT, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_RELOAD_DATA_BY_CLIENT, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.DO_DELETE_REPORT, report: Report): this;
	on(type: ReportEventTypes.DO_DELETE_REPORT, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_DELETE_REPORT, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.DO_DELETE_PARAGRAPH, paragraph: Paragraph): this;
	on(type: ReportEventTypes.DO_DELETE_PARAGRAPH, listener: (paragraph: Paragraph) => void): this;
	off(type: ReportEventTypes.DO_DELETE_PARAGRAPH, listener: (paragraph: Paragraph) => void): this;

	fire(type: ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, report: Report): this;
	on(type: ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.PARAGRAPH_MOVE_OR_RESIZE_COMPLETED, paragraph: Paragraph): this;
	on(type: ReportEventTypes.PARAGRAPH_MOVE_OR_RESIZE_COMPLETED, listener: (paragraph: Paragraph) => void): this;
	off(type: ReportEventTypes.PARAGRAPH_MOVE_OR_RESIZE_COMPLETED, listener: (paragraph: Paragraph) => void): this;

	fire(type: ReportEventTypes.STRUCTURE_CHANGED, report: Report): this;
	on(type: ReportEventTypes.STRUCTURE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.STRUCTURE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.STYLE_CHANGED, report: Report): this;
	on(type: ReportEventTypes.STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.ASK_REPORT_STRUCTURE_CHANGED, report: Report, onChangedGet: (changed: boolean) => void): this;
	on(type: ReportEventTypes.ASK_REPORT_STRUCTURE_CHANGED, listener: (report: Report, onChangedGet: (changed: boolean) => void) => void): this;
	off(type: ReportEventTypes.ASK_REPORT_STRUCTURE_CHANGED, listener: (report: Report, onChangedGet: (changed: boolean) => void) => void): this;

	fire(type: ReportEventTypes.DATA_SAVED, report: Report): this;
	on(type: ReportEventTypes.DATA_SAVED, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DATA_SAVED, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.DO_REFRESH, report: Report): this;
	on(type: ReportEventTypes.DO_REFRESH, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_REFRESH, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.ASK_DOWNLOAD_CHART, report: Report, onChartBase64Ready: (base64?: string) => void): this;
	on(type: ReportEventTypes.ASK_DOWNLOAD_CHART, listener: (report: Report, onChartBase64Ready: (base64?: string) => void) => void): this;
	off(type: ReportEventTypes.ASK_DOWNLOAD_CHART, listener: (report: Report, onChartBase64Ready: (base64?: string) => void) => void): this;

	fire(type: ReportEventTypes.CHART_OPTIONS_READY, report: Report, options: ChartOptions): this;
	on(type: ReportEventTypes.CHART_OPTIONS_READY, listener: (report: Report, options: ChartOptions) => void): this;
	off(type: ReportEventTypes.CHART_OPTIONS_READY, listener: (report: Report, options: ChartOptions) => void): this;

	fire(type: ReportEventTypes.ASK_DATA, report: Report, onLoaded: (dataset: ChartDataSet) => void): this;
	on(type: ReportEventTypes.ASK_DATA, listener: (report: Report, onLoaded: (dataset: ChartDataSet) => void) => void): this;
	off(type: ReportEventTypes.ASK_DATA, listener: (report: Report, onLoaded: (dataset: ChartDataSet) => void) => void): this;

	fire(type: ReportEventTypes.DATA_LOADED, report: Report, dataset: ChartDataSet): this;
	on(type: ReportEventTypes.DATA_LOADED, listener: (report: Report, dataset: ChartDataSet) => void): this;
	off(type: ReportEventTypes.DATA_LOADED, listener: (report: Report, dataset: ChartDataSet) => void): this;

	fire(type: ReportEventTypes.REPAINTED, report: Report): this;
	on(type: ReportEventTypes.REPAINTED, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.REPAINTED, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.THUMBNAIL_CAUGHT, report: Report): this;
	on(type: ReportEventTypes.THUMBNAIL_CAUGHT, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.THUMBNAIL_CAUGHT, listener: (report: Report) => void): this;
}