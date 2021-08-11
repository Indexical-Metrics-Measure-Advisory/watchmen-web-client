import {Report} from '../../../services/tuples/report-types';
import {Subject} from '../../../services/tuples/subject-types';

export enum SubjectEventTypes {
	SUBJECT_RENAMED = 'subject-renamed',

	SUBJECT_DEF_CHANGED = 'subject-def-changed',

	REPORT_ADDED = 'report-added',
	REPORT_REMOVED = 'report-removed',
	REPORT_SWITCHED = 'report-switched',

	TOGGLE_PRINT_PAGE_SIZE = 'toggle-print-page-size',
	REFRESH_REPORTS = 'refresh-reports'
}

export interface SubjectEventBus {
	fire(type: SubjectEventTypes.SUBJECT_RENAMED, subject: Subject): this;
	on(type: SubjectEventTypes.SUBJECT_RENAMED, listener: (subject: Subject) => void): this;
	off(type: SubjectEventTypes.SUBJECT_RENAMED, listener: (subject: Subject) => void): this;

	fire(type: SubjectEventTypes.SUBJECT_DEF_CHANGED, subject: Subject): this;
	on(type: SubjectEventTypes.SUBJECT_DEF_CHANGED, listener: (subject: Subject) => void): this;
	off(type: SubjectEventTypes.SUBJECT_DEF_CHANGED, listener: (subject: Subject) => void): this;

	fire(type: SubjectEventTypes.REPORT_ADDED, report: Report): this;
	on(type: SubjectEventTypes.REPORT_ADDED, listener: (report: Report) => void): this;
	off(type: SubjectEventTypes.REPORT_ADDED, listener: (report: Report) => void): this;

	fire(type: SubjectEventTypes.REPORT_REMOVED, report: Report): this;
	on(type: SubjectEventTypes.REPORT_REMOVED, listener: (report: Report) => void): this;
	off(type: SubjectEventTypes.REPORT_REMOVED, listener: (report: Report) => void): this;

	fire(type: SubjectEventTypes.REPORT_SWITCHED, report: Report): this;
	on(type: SubjectEventTypes.REPORT_SWITCHED, listener: (report: Report) => void): this;
	off(type: SubjectEventTypes.REPORT_SWITCHED, listener: (report: Report) => void): this;

	fire(type: SubjectEventTypes.TOGGLE_PRINT_PAGE_SIZE, visible: boolean): this;
	on(type: SubjectEventTypes.TOGGLE_PRINT_PAGE_SIZE, listener: (visible: boolean) => void): this;
	off(type: SubjectEventTypes.TOGGLE_PRINT_PAGE_SIZE, listener: (visible: boolean) => void): this;

	fire(type: SubjectEventTypes.REFRESH_REPORTS, subject: Subject): this;
	on(type: SubjectEventTypes.REFRESH_REPORTS, listener: (subject: Subject) => void): this;
	off(type: SubjectEventTypes.REFRESH_REPORTS, listener: (subject: Subject) => void): this;
}