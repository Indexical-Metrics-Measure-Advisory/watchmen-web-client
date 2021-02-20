import { Report } from '../../../../../services/tuples/report-types';

export enum ReportEditEventTypes {
	NAME_CHANGED = 'name-changed',
	DESCRIPTION_CHANGED = 'description-changed',
	SIZE_CHANGED = 'size-changed',
	BASIC_STYLE_CHANGED = 'basic-style-changed',

	EDIT_COMPLETED = 'edit-completed'
}

export interface ReportEditEventBus {
	fire(type: ReportEditEventTypes.NAME_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.NAME_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.NAME_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.DESCRIPTION_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.DESCRIPTION_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.DESCRIPTION_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.SIZE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.BASIC_STYLE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.BASIC_STYLE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.BASIC_STYLE_CHANGED, listener: (report: Report) => void): this;

	fire(type: ReportEditEventTypes.EDIT_COMPLETED, report: Report): this;
	on(type: ReportEditEventTypes.EDIT_COMPLETED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.EDIT_COMPLETED, listener: (report: Report) => void): this;
}