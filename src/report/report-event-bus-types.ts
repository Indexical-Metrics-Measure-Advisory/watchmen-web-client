import { Report } from '../services/tuples/report-types';

export enum ReportEventTypes {
	DO_EDIT = 'do-edit',
	EDIT_COMPLETED = 'edit-completed',

	DO_DELETE = 'do-delete',
}

export interface ReportEventBus {
	fire(type: ReportEventTypes.DO_EDIT, report: Report): this;
	on(type: ReportEventTypes.DO_EDIT, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_EDIT, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.EDIT_COMPLETED, report: Report): this;
	on(type: ReportEventTypes.EDIT_COMPLETED, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.EDIT_COMPLETED, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.DO_DELETE, report: Report): this;
	on(type: ReportEventTypes.DO_DELETE, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_DELETE, listener: (report: Report) => void): this;
}