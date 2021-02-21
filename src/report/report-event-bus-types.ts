import { Report } from '../services/tuples/report-types';

export enum ReportEventTypes {
	DO_EDIT = 'do-edit',
	EDIT_COMPLETED = 'edit-completed',
	SIZE_CHANGED = 'size-changed',

	DO_DELETE = 'do-delete',
}

export interface ReportEventBus {
	fire(type: ReportEventTypes.DO_EDIT, report: Report): this;
	on(type: ReportEventTypes.DO_EDIT, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_EDIT, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.SIZE_CHANGED, report: Report): this;
	on(type: ReportEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.EDIT_COMPLETED, report: Report, shouldReloadData: boolean): this;
	on(type: ReportEventTypes.EDIT_COMPLETED, listener: (report: Report, shouldReloadData: boolean) => void): this;
	off(type: ReportEventTypes.EDIT_COMPLETED, listener: (report: Report, shouldReloadData: boolean) => void): this;

	fire(type: ReportEventTypes.DO_DELETE, report: Report): this;
	on(type: ReportEventTypes.DO_DELETE, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_DELETE, listener: (report: Report) => void): this;
}