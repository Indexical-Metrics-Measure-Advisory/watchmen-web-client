import {PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AssembledPipelinesGraphics, AssembledTopicGraphics} from './types';

export enum CatalogEventTypes {
	TOPIC_SELECTED = 'topic-selected',
	CLEAR_SELECTION = 'clear-selection',

	TOPIC_MOVED = 'topic-moved',

	NAME_CHANGED = 'name-changed',

	SCROLL = 'scroll',
	RESIZE = 'resize',

	SWITCH_GRAPHICS = 'switch-graphics',
	TOPICS_SELECTED = 'topics-selected',
	TOPICS_REPAINTED = 'topics-repaint',

	GRAPHICS_REMOVED = 'graphics-removed',

	ASK_GRAPHICS_SVG = 'ask-graphics-svg',
	REPLY_GRAPHICS_SVG = 'replay-graphics-svg'
}

export interface CatalogEventBus {
	fire(type: CatalogEventTypes.TOPIC_SELECTED, topic: Topic): this;
	on(type: CatalogEventTypes.TOPIC_SELECTED, listener: (topic: Topic) => void): this;
	off(type: CatalogEventTypes.TOPIC_SELECTED, listener: (topic: Topic) => void): this;

	fire(type: CatalogEventTypes.CLEAR_SELECTION): this;
	on(type: CatalogEventTypes.CLEAR_SELECTION, listener: () => void): this;
	off(type: CatalogEventTypes.CLEAR_SELECTION, listener: () => void): this;

	fire(type: CatalogEventTypes.TOPIC_MOVED, topic: Topic, graphics: AssembledTopicGraphics): this;
	on(type: CatalogEventTypes.TOPIC_MOVED, listener: (topic: Topic, graphics: AssembledTopicGraphics) => void): this;
	off(type: CatalogEventTypes.TOPIC_MOVED, listener: (topic: Topic, graphics: AssembledTopicGraphics) => void): this;

	fire(type: CatalogEventTypes.NAME_CHANGED, graphics: AssembledPipelinesGraphics): this;
	on(type: CatalogEventTypes.NAME_CHANGED, listener: (graphics: AssembledPipelinesGraphics) => void): this;
	off(type: CatalogEventTypes.NAME_CHANGED, listener: (graphics: AssembledPipelinesGraphics) => void): this;

	fire(type: CatalogEventTypes.SCROLL): this;
	on(type: CatalogEventTypes.SCROLL, listener: () => void): this;
	off(type: CatalogEventTypes.SCROLL, listener: () => void): this;

	fire(type: CatalogEventTypes.RESIZE): this;
	on(type: CatalogEventTypes.RESIZE, listener: () => void): this;
	off(type: CatalogEventTypes.RESIZE, listener: () => void): this;

	fire(type: CatalogEventTypes.SWITCH_GRAPHICS, graphics: PipelinesGraphics): this;
	on(type: CatalogEventTypes.SWITCH_GRAPHICS, listener: (graphics: PipelinesGraphics) => void): this;
	off(type: CatalogEventTypes.SWITCH_GRAPHICS, listener: (graphics: PipelinesGraphics) => void): this;

	fire(type: CatalogEventTypes.TOPICS_SELECTED, graphics: AssembledPipelinesGraphics): this;
	on(type: CatalogEventTypes.TOPICS_SELECTED, listener: (graphics: AssembledPipelinesGraphics) => void): this;
	off(type: CatalogEventTypes.TOPICS_SELECTED, listener: (graphics: AssembledPipelinesGraphics) => void): this;

	fire(type: CatalogEventTypes.TOPICS_REPAINTED, graphics: AssembledPipelinesGraphics): this;
	on(type: CatalogEventTypes.TOPICS_REPAINTED, listener: (graphics: AssembledPipelinesGraphics) => void): this;
	off(type: CatalogEventTypes.TOPICS_REPAINTED, listener: (graphics: AssembledPipelinesGraphics) => void): this;

	fire(type: CatalogEventTypes.GRAPHICS_REMOVED, graphics: AssembledPipelinesGraphics): this;
	on(type: CatalogEventTypes.GRAPHICS_REMOVED, listener: (graphics: AssembledPipelinesGraphics) => void): this;
	off(type: CatalogEventTypes.GRAPHICS_REMOVED, listener: (graphics: AssembledPipelinesGraphics) => void): this;

	fire(type: CatalogEventTypes.ASK_GRAPHICS_SVG, topics: Array<Topic>): this;
	on(type: CatalogEventTypes.ASK_GRAPHICS_SVG, listener: (topics: Array<Topic>) => void): this;
	off(type: CatalogEventTypes.ASK_GRAPHICS_SVG, listener: (topics: Array<Topic>) => void): this;

	fire(type: CatalogEventTypes.REPLY_GRAPHICS_SVG, html: string): this;
	once(type: CatalogEventTypes.REPLY_GRAPHICS_SVG, listener: (html: string) => void): this;
}