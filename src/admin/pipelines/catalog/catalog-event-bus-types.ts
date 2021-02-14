import { Topic } from '../../../services/tuples/topic-types';

export enum CatalogEventTypes {
	TOPIC_SELECTED = 'topic-selected',
	CLEAR_SELECTION = 'clear-selection',

	TOPIC_MOVED = 'topic-moved'
}

export interface CatalogEventBus {
	fire(type: CatalogEventTypes.TOPIC_SELECTED, topic: Topic): this;
	on(type: CatalogEventTypes.TOPIC_SELECTED, listener: (topic: Topic) => void): this;
	off(type: CatalogEventTypes.TOPIC_SELECTED, listener: (topic: Topic) => void): this;

	fire(type: CatalogEventTypes.CLEAR_SELECTION): this;
	on(type: CatalogEventTypes.CLEAR_SELECTION, listener: () => void): this;
	off(type: CatalogEventTypes.CLEAR_SELECTION, listener: () => void): this;

	fire(type: CatalogEventTypes.TOPIC_MOVED, topic: Topic): this;
	on(type: CatalogEventTypes.TOPIC_MOVED, listener: (topic: Topic) => void): this;
	off(type: CatalogEventTypes.TOPIC_MOVED, listener: (topic: Topic) => void): this;
}