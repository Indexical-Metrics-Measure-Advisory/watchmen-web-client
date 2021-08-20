import {Report} from '../../../../../services/tuples/report-types';
import {ChartDataSet} from '../../../../../services/tuples/chart-types';

export enum ReportDataSetEventTypes {
	ASK_LOAD_DATA = 'ask-load-data',
	DATA_LOADED = 'reply-data-loaded',
}

export interface ReportDataSetEventBus {
	fire(type: ReportDataSetEventTypes.ASK_LOAD_DATA, report: Report): this;
	on(type: ReportDataSetEventTypes.ASK_LOAD_DATA, listener: (report: Report) => void): this;
	off(type: ReportDataSetEventTypes.ASK_LOAD_DATA, listener: (report: Report) => void): this;

	fire(type: ReportDataSetEventTypes.DATA_LOADED, report: Report, data: ChartDataSet): this;
	on(type: ReportDataSetEventTypes.DATA_LOADED, listener: (report: Report, data: ChartDataSet) => void): this;
	off(type: ReportDataSetEventTypes.DATA_LOADED, listener: (report: Report, data: ChartDataSet) => void): this;
}