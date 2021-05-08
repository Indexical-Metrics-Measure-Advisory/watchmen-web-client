import {Paragraph} from '../services/tuples/paragraph';
import {Report} from '../services/tuples/report-types';

export enum ReportEventTypes {
	DO_RELOAD_DATA_ON_EDITING = 'do-reload-data-on-editing',

	DO_EDIT = 'do-edit',
	EDIT_COMPLETED = 'edit-completed',

	DO_DELETE_REPORT = 'do-delete-report',
	DO_DELETE_PARAGRAPH = 'do-delete-paragraph',

	REPORT_MOVE_OR_RESIZE_COMPLETED = 'report-move-or-resize-completed',
	PARAGRAPH_MOVE_OR_RESIZE_COMPLETED = 'paragraph-move-or-resize-completed',

	DO_REFRESH = 'do-refresh'
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

	fire(type: ReportEventTypes.DO_REFRESH, report: Report): this;

	on(type: ReportEventTypes.DO_REFRESH, listener: (report: Report) => void): this;

	off(type: ReportEventTypes.DO_REFRESH, listener: (report: Report) => void): this;
}