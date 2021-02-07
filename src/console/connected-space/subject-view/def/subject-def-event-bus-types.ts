import { SubjectDataSetColumn } from '../../../../services/tuples/subject-types';
import { Topic } from '../../../../services/tuples/topic-types';

export interface SubjectDefData {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}

export enum SubjectDefEventTypes {
	DATA_LOADED = 'data-loaded',

	TOPIC_PICKED = 'topic-picked',
	TOPIC_UNPICKED = 'topic-unpicked',

	ASK_PICKED_TOPICS = 'ask-picked-topics',
	REPLY_PICKED_TOPICS = 'reply-picked-topics',

	DATASET_COLUMN_ADDED = 'dataset-column-added',
	DATASET_COLUMN_REMOVED = 'dataset-column-removed'
}

export interface SubjectDefEventBus {
	fire(type: SubjectDefEventTypes.DATA_LOADED, data: SubjectDefData): this;
	on(type: SubjectDefEventTypes.DATA_LOADED, listener: (data: SubjectDefData) => void): this;
	off(type: SubjectDefEventTypes.DATA_LOADED, listener: (data: SubjectDefData) => void): this;

	fire(type: SubjectDefEventTypes.TOPIC_PICKED, topic: Topic): this;
	on(type: SubjectDefEventTypes.TOPIC_PICKED, listener: (topic: Topic) => void): this;
	off(type: SubjectDefEventTypes.TOPIC_PICKED, listener: (topic: Topic) => void): this;

	fire(type: SubjectDefEventTypes.TOPIC_UNPICKED, topic: Topic): this;
	on(type: SubjectDefEventTypes.TOPIC_UNPICKED, listener: (topic: Topic) => void): this;
	off(type: SubjectDefEventTypes.TOPIC_UNPICKED, listener: (topic: Topic) => void): this;

	fire(type: SubjectDefEventTypes.ASK_PICKED_TOPICS): this;
	on(type: SubjectDefEventTypes.ASK_PICKED_TOPICS, listener: () => void): this;
	off(type: SubjectDefEventTypes.ASK_PICKED_TOPICS, listener: () => void): this;

	fire(type: SubjectDefEventTypes.REPLY_PICKED_TOPICS, topics: Array<Topic>): this;
	once(type: SubjectDefEventTypes.REPLY_PICKED_TOPICS, listener: (topics: Array<Topic>) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_COLUMN_ADDED, column: SubjectDataSetColumn): this;
	on(type: SubjectDefEventTypes.DATASET_COLUMN_ADDED, listener: (column: SubjectDataSetColumn) => void): this;
	off(type: SubjectDefEventTypes.DATASET_COLUMN_ADDED, listener: (column: SubjectDataSetColumn) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_COLUMN_REMOVED, column: SubjectDataSetColumn): this;
	on(type: SubjectDefEventTypes.DATASET_COLUMN_REMOVED, listener: (column: SubjectDataSetColumn) => void): this;
	off(type: SubjectDefEventTypes.DATASET_COLUMN_REMOVED, listener: (column: SubjectDataSetColumn) => void): this;
}