import { Subject } from '../../../services/tuples/subject-types';

export enum SubjectEventTypes {
	SUBJECT_RENAMED = 'subject-renamed'
}

export interface SubjectEventBus {
	fire(type: SubjectEventTypes.SUBJECT_RENAMED, subject: Subject): this;
	on(type: SubjectEventTypes.SUBJECT_RENAMED, listener: (subject: Subject) => void): this;
	off(type: SubjectEventTypes.SUBJECT_RENAMED, listener: (subject: Subject) => void): this;
}