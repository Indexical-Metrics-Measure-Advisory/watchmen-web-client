import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AssembledReportGraphics, AssembledSubjectGraphics, AssembledTopicGraphics} from './types';

export enum CatalogEventTypes {
	TOPIC_SELECTED = 'topic-selected',
	SUBJECT_SELECTED = 'subject-selected',
	REPORT_SELECTED = 'report-selected',
	CLEAR_SELECTION = 'clear-selection',

	TOPIC_MOVED = 'topic-moved',
	SUBJECT_MOVED = 'subject-moved',
	REPORT_MOVED = 'report-moved',

	SCROLL = 'scroll',
	RESIZE = 'resize'
}

export interface CatalogEventBus {
	fire(type: CatalogEventTypes.TOPIC_SELECTED, topic: Topic): this;
	on(type: CatalogEventTypes.TOPIC_SELECTED, listener: (topic: Topic) => void): this;
	off(type: CatalogEventTypes.TOPIC_SELECTED, listener: (topic: Topic) => void): this;

	fire(type: CatalogEventTypes.SUBJECT_SELECTED, subject: Subject): this;
	on(type: CatalogEventTypes.SUBJECT_SELECTED, listener: (subject: Subject) => void): this;
	off(type: CatalogEventTypes.SUBJECT_SELECTED, listener: (subject: Subject) => void): this;

	fire(type: CatalogEventTypes.REPORT_SELECTED, subject: Subject, report: Report): this;
	on(type: CatalogEventTypes.REPORT_SELECTED, listener: (subject: Subject, report: Report) => void): this;
	off(type: CatalogEventTypes.REPORT_SELECTED, listener: (subject: Subject, report: Report) => void): this;

	fire(type: CatalogEventTypes.CLEAR_SELECTION): this;
	on(type: CatalogEventTypes.CLEAR_SELECTION, listener: () => void): this;
	off(type: CatalogEventTypes.CLEAR_SELECTION, listener: () => void): this;

	fire(type: CatalogEventTypes.TOPIC_MOVED, topic: Topic, graphics: AssembledTopicGraphics): this;
	on(type: CatalogEventTypes.TOPIC_MOVED, listener: (topic: Topic, graphics: AssembledTopicGraphics) => void): this;
	off(type: CatalogEventTypes.TOPIC_MOVED, listener: (topic: Topic, graphics: AssembledTopicGraphics) => void): this;

	fire(type: CatalogEventTypes.SUBJECT_MOVED, subject: Subject, graphics: AssembledSubjectGraphics): this;
	on(type: CatalogEventTypes.SUBJECT_MOVED, listener: (subject: Subject, graphics: AssembledSubjectGraphics) => void): this;
	off(type: CatalogEventTypes.SUBJECT_MOVED, listener: (subject: Subject, graphics: AssembledSubjectGraphics) => void): this;

	fire(type: CatalogEventTypes.REPORT_MOVED, report: Report, graphics: AssembledReportGraphics): this;
	on(type: CatalogEventTypes.REPORT_MOVED, listener: (report: Report, graphics: AssembledReportGraphics) => void): this;
	off(type: CatalogEventTypes.REPORT_MOVED, listener: (report: Report, graphics: AssembledReportGraphics) => void): this;

	fire(type: CatalogEventTypes.SCROLL): this;
	on(type: CatalogEventTypes.SCROLL, listener: () => void): this;
	off(type: CatalogEventTypes.SCROLL, listener: () => void): this;

	fire(type: CatalogEventTypes.RESIZE): this;
	on(type: CatalogEventTypes.RESIZE, listener: () => void): this;
	off(type: CatalogEventTypes.RESIZE, listener: () => void): this;
}