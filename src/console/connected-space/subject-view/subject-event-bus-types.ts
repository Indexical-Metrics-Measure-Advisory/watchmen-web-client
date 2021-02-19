import { Report } from '../../../services/tuples/report-types';
import { Subject } from '../../../services/tuples/subject-types';

export enum SubjectEventTypes {
	SUBJECT_RENAMED = 'subject-renamed',

	SUBJECT_DEF_CHANGED = 'subject-def-changed',

	REPORT_ADDED = 'report-added',
	REPORT_REMOVED = 'report-removed'
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
}