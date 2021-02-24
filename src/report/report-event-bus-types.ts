import { Report } from '../services/tuples/report-types';

export enum ReportEventTypes {
	DO_RELOAD_DATA_ON_EDITING = 'do-reload-data-on-editing',

	DO_EDIT = 'do-edit',
	EDIT_COMPLETED = 'edit-completed',

	DO_DELETE = 'do-delete',

	MOVE_OR_RESIZE_COMPLETED = 'do-drag-completed'
}

export interface ReportEventBus {
	fire(type: ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, report: Report): this;
	on(type: ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.DO_EDIT, report: Report): this;
	on(type: ReportEventTypes.DO_EDIT, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_EDIT, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.EDIT_COMPLETED, report: Report, changed: boolean, shouldReloadData: boolean): this;
	on(type: ReportEventTypes.EDIT_COMPLETED, listener: (report: Report, changed: boolean, shouldReloadData: boolean) => void): this;
	off(type: ReportEventTypes.EDIT_COMPLETED, listener: (report: Report, changed: boolean, shouldReloadData: boolean) => void): this;

	fire(type: ReportEventTypes.DO_DELETE, report: Report): this;
	on(type: ReportEventTypes.DO_DELETE, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.DO_DELETE, listener: (report: Report) => void): this;

	fire(type: ReportEventTypes.MOVE_OR_RESIZE_COMPLETED, report: Report): this;
	on(type: ReportEventTypes.MOVE_OR_RESIZE_COMPLETED, listener: (report: Report) => void): this;
	off(type: ReportEventTypes.MOVE_OR_RESIZE_COMPLETED, listener: (report: Report) => void): this;
}