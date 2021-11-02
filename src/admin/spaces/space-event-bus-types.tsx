import {TopicId} from '@/services/data/tuples/topic-types';

export enum SpaceEventTypes {
	TOPIC_ADDED = 'topic-added',
	TOPIC_REMOVED = 'topic-removed'
}

export interface SpaceEventBus {
	fire(type: SpaceEventTypes.TOPIC_ADDED, topicId: TopicId): this;
	on(type: SpaceEventTypes.TOPIC_ADDED, listener: (topicId: TopicId) => void): this;
	off(type: SpaceEventTypes.TOPIC_ADDED, listener: (topicId: TopicId) => void): this;

	fire(type: SpaceEventTypes.TOPIC_REMOVED, topicId: TopicId): this;
	on(type: SpaceEventTypes.TOPIC_REMOVED, listener: (topicId: TopicId) => void): this;
	off(type: SpaceEventTypes.TOPIC_REMOVED, listener: (topicId: TopicId) => void): this;
}