import { Report } from '../../../../../services/tuples/report-types';

export enum ReportEditEventTypes {
	SIZE_CHANGED = 'size-changed'
}

export interface ReportEditEventBus {
	fire(type: ReportEditEventTypes.SIZE_CHANGED, report: Report): this;
	on(type: ReportEditEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;
	off(type: ReportEditEventTypes.SIZE_CHANGED, listener: (report: Report) => void): this;
}