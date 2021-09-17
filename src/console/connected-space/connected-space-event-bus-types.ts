import {Subject} from '@/services/data/tuples/subject-types';

export enum ConnectedSpaceEventTypes {
	SUBJECT_ADDED = 'subject-added',
	SUBJECT_REMOVED = 'subject-removed'
}

export interface ConnectedSpaceEventBus {
	fire(type: ConnectedSpaceEventTypes.SUBJECT_ADDED, subject: Subject): this;
	on(type: ConnectedSpaceEventTypes.SUBJECT_ADDED, listener: (subject: Subject) => void): this;
	off(type: ConnectedSpaceEventTypes.SUBJECT_ADDED, listener: (subject: Subject) => void): this;

	fire(type: ConnectedSpaceEventTypes.SUBJECT_REMOVED, subject: Subject): this;
	on(type: ConnectedSpaceEventTypes.SUBJECT_REMOVED, listener: (subject: Subject) => void): this;
	off(type: ConnectedSpaceEventTypes.SUBJECT_REMOVED, listener: (subject: Subject) => void): this;
}