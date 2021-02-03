import { Subject } from '../../../services/tuples/subject-types';
import { Topic } from '../../../services/tuples/topic-types';

export enum CatalogEventTypes {
	TOPIC_SELECTED = 'topic-selected',
	SUBJECT_SELECTED = 'subject-selected',
	CLEAR_SELECTION = 'clear-selection',

	TOPIC_MOVED = 'topic-moved',
	SUBJECT_MOVED = 'subject-moved',
}

export interface CatalogEventBus {
	fire(type: CatalogEventTypes.TOPIC_SELECTED, topic: Topic): this;
	on(type: CatalogEventTypes.TOPIC_SELECTED, listener: (topic: Topic) => void): this;
	off(type: CatalogEventTypes.TOPIC_SELECTED, listener: (topic: Topic) => void): this;

	fire(type: CatalogEventTypes.SUBJECT_SELECTED, subject: Subject): this;
	on(type: CatalogEventTypes.SUBJECT_SELECTED, listener: (subject: Subject) => void): this;
	off(type: CatalogEventTypes.SUBJECT_SELECTED, listener: (subject: Subject) => void): this;

	fire(type: CatalogEventTypes.CLEAR_SELECTION): this;
	on(type: CatalogEventTypes.CLEAR_SELECTION, listener: () => void): this;
	off(type: CatalogEventTypes.CLEAR_SELECTION, listener: () => void): this;

	fire(type: CatalogEventTypes.TOPIC_MOVED, topic: Topic): this;
	on(type: CatalogEventTypes.TOPIC_MOVED, listener: (topic: Topic) => void): this;
	off(type: CatalogEventTypes.TOPIC_MOVED, listener: (topic: Topic) => void): this;

	fire(type: CatalogEventTypes.SUBJECT_MOVED, subject: Subject): this;
	on(type: CatalogEventTypes.SUBJECT_MOVED, listener: (subject: Subject) => void): this;
	off(type: CatalogEventTypes.SUBJECT_MOVED, listener: (subject: Subject) => void): this;
}