import { Report } from '../../../services/tuples/report-types';
import { Subject } from '../../../services/tuples/subject-types';

export enum SubjectEventTypes {
	SUBJECT_RENAMED = 'subject-renamed',

	SUBJECT_DEF_CHANGED = 'subject-def-changed',

	REPORT_ADDED = 'report-added',
	REPORT_REMOVED = 'report-removed',

	TOGGLE_PRINT_PAGE_SIZE = 'toggle-print-page-size',
	ASK_SHOW_PRINT_PAGE_SIZE = 'ask-show-print-page-size',
	REPLY_SHOW_PRINT_PAGE_SIZE = 'reply-show-print-page-size',
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

	fire(type: SubjectEventTypes.TOGGLE_PRINT_PAGE_SIZE, visible: boolean): this;
	on(type: SubjectEventTypes.TOGGLE_PRINT_PAGE_SIZE, listener: (visible: boolean) => void): this;
	off(type: SubjectEventTypes.TOGGLE_PRINT_PAGE_SIZE, listener: (visible: boolean) => void): this;

	fire(type: SubjectEventTypes.ASK_SHOW_PRINT_PAGE_SIZE): this;
	on(type: SubjectEventTypes.ASK_SHOW_PRINT_PAGE_SIZE, listener: () => void): this;
	off(type: SubjectEventTypes.ASK_SHOW_PRINT_PAGE_SIZE, listener: () => void): this;

	fire(type: SubjectEventTypes.REPLY_SHOW_PRINT_PAGE_SIZE, visible: boolean): this;
	once(type: SubjectEventTypes.REPLY_SHOW_PRINT_PAGE_SIZE, listener: (visible: boolean) => void): this;
}