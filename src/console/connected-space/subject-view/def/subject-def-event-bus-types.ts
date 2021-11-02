import {SubjectDataSetColumn, SubjectDataSetFilter, SubjectDataSetJoin} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';

export interface SubjectDefData {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}

export enum SubjectDefEventTypes {
	DATA_LOADED = 'data-loaded',

	TOPIC_PICKED = 'topic-picked',
	TOPIC_UNPICKED = 'topic-unpicked',

	ASK_PICKED_TOPICS = 'ask-picked-topics',

	DATASET_COLUMN_ADDED = 'dataset-column-added',
	DATASET_COLUMN_REMOVED = 'dataset-column-removed',
	DATASET_COLUMN_CHANGED = 'dataset-column-changed',

	DATASET_FILTER_ADDED = 'dataset-filter-added',
	DATASET_FILTER_REMOVED = 'dataset-filter-removed',
	DATASET_FILTER_CHANGED = 'dataset-filter-changed',

	DATASET_JOIN_ADDED = 'dataset-join-added',
	DATASET_JOIN_REMOVED = 'dataset-join-removed',
	DATASET_JOIN_CHANGED = 'dataset-join-changed'
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

	fire(type: SubjectDefEventTypes.ASK_PICKED_TOPICS, onData: (topics: Array<Topic>) => void): this;
	on(type: SubjectDefEventTypes.ASK_PICKED_TOPICS, listener: (onData: (topics: Array<Topic>) => void) => void): this;
	off(type: SubjectDefEventTypes.ASK_PICKED_TOPICS, listener: (onData: (topics: Array<Topic>) => void) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_COLUMN_ADDED, column: SubjectDataSetColumn): this;
	on(type: SubjectDefEventTypes.DATASET_COLUMN_ADDED, listener: (column: SubjectDataSetColumn) => void): this;
	off(type: SubjectDefEventTypes.DATASET_COLUMN_ADDED, listener: (column: SubjectDataSetColumn) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_COLUMN_REMOVED, column: SubjectDataSetColumn): this;
	on(type: SubjectDefEventTypes.DATASET_COLUMN_REMOVED, listener: (column: SubjectDataSetColumn) => void): this;
	off(type: SubjectDefEventTypes.DATASET_COLUMN_REMOVED, listener: (column: SubjectDataSetColumn) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_COLUMN_CHANGED, column: SubjectDataSetColumn): this;
	on(type: SubjectDefEventTypes.DATASET_COLUMN_CHANGED, listener: (column: SubjectDataSetColumn) => void): this;
	off(type: SubjectDefEventTypes.DATASET_COLUMN_CHANGED, listener: (column: SubjectDataSetColumn) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_FILTER_ADDED, filter: SubjectDataSetFilter): this;
	on(type: SubjectDefEventTypes.DATASET_FILTER_ADDED, listener: (filter: SubjectDataSetFilter) => void): this;
	off(type: SubjectDefEventTypes.DATASET_FILTER_ADDED, listener: (filter: SubjectDataSetFilter) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_FILTER_REMOVED, filter: SubjectDataSetFilter): this;
	on(type: SubjectDefEventTypes.DATASET_FILTER_REMOVED, listener: (filter: SubjectDataSetFilter) => void): this;
	off(type: SubjectDefEventTypes.DATASET_FILTER_REMOVED, listener: (filter: SubjectDataSetFilter) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_FILTER_CHANGED, filter: SubjectDataSetFilter): this;
	on(type: SubjectDefEventTypes.DATASET_FILTER_CHANGED, listener: (filter: SubjectDataSetFilter) => void): this;
	off(type: SubjectDefEventTypes.DATASET_FILTER_CHANGED, listener: (filter: SubjectDataSetFilter) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_JOIN_ADDED, join: SubjectDataSetJoin): this;
	on(type: SubjectDefEventTypes.DATASET_JOIN_ADDED, listener: (join: SubjectDataSetJoin) => void): this;
	off(type: SubjectDefEventTypes.DATASET_JOIN_ADDED, listener: (join: SubjectDataSetJoin) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_JOIN_REMOVED, join: SubjectDataSetJoin): this;
	on(type: SubjectDefEventTypes.DATASET_JOIN_REMOVED, listener: (join: SubjectDataSetJoin) => void): this;
	off(type: SubjectDefEventTypes.DATASET_JOIN_REMOVED, listener: (join: SubjectDataSetJoin) => void): this;

	fire(type: SubjectDefEventTypes.DATASET_JOIN_CHANGED, join: SubjectDataSetJoin): this;
	on(type: SubjectDefEventTypes.DATASET_JOIN_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;
	off(type: SubjectDefEventTypes.DATASET_JOIN_CHANGED, listener: (join: SubjectDataSetJoin) => void): this;
}