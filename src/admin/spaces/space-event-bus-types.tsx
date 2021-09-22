export enum SpaceEventTypes {
	TOPIC_ADDED = 'topic-added',
	TOPIC_REMOVED = 'topic-removed'
}

export interface SpaceEventBus {
	fire(type: SpaceEventTypes.TOPIC_ADDED, topicId: string): this;
	on(type: SpaceEventTypes.TOPIC_ADDED, listener: (topicId: string) => void): this;
	off(type: SpaceEventTypes.TOPIC_ADDED, listener: (topicId: string) => void): this;

	fire(type: SpaceEventTypes.TOPIC_REMOVED, topicId: string): this;
	on(type: SpaceEventTypes.TOPIC_REMOVED, listener: (topicId: string) => void): this;
	off(type: SpaceEventTypes.TOPIC_REMOVED, listener: (topicId: string) => void): this;
}