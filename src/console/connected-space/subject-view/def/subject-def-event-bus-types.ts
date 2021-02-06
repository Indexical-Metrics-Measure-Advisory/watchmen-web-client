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
	REPLY_PICKED_TOPICS = 'reply-picked-topics'
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
}