import {Subject} from '@/services/data/tuples/subject-types';

export enum SubjectEventTypes {
	SUBJECT_RENAMED = 'subject-renamed',

	SUBJECT_DEF_CHANGED = 'subject-def-changed',
}

export interface SubjectEventBus {
	fire(type: SubjectEventTypes.SUBJECT_RENAMED, subject: Subject): this;
	on(type: SubjectEventTypes.SUBJECT_RENAMED, listener: (subject: Subject) => void): this;
	off(type: SubjectEventTypes.SUBJECT_RENAMED, listener: (subject: Subject) => void): this;

	fire(type: SubjectEventTypes.SUBJECT_DEF_CHANGED, subject: Subject): this;
	on(type: SubjectEventTypes.SUBJECT_DEF_CHANGED, listener: (subject: Subject) => void): this;
	off(type: SubjectEventTypes.SUBJECT_DEF_CHANGED, listener: (subject: Subject) => void): this;
}