import { PipelinesSettings } from '../../services/pipeline/settings-types';
import { Pipeline } from '../../services/tuples/pipeline-types';
import { Topic } from '../../services/tuples/topic-types';

export enum PipelinesEventTypes {
	SETTINGS_LOADED = 'settings-loaded',

	// ask data
	ASK_PIPELINES = 'ask-pipelines',
	REPLY_PIPELINES = 'reply-pipelines',

	ASK_TOPICS = 'ask-topics',
	REPLY_TOPICS = 'reply-topics'
}

export interface PipelinesEventBus {
	// settings load
	fire(type: PipelinesEventTypes.SETTINGS_LOADED, settings: PipelinesSettings): this;
	on(type: PipelinesEventTypes.SETTINGS_LOADED, listener: (settings: PipelinesSettings) => void): this;
	off(type: PipelinesEventTypes.SETTINGS_LOADED, listener: (settings: PipelinesSettings) => void): this;

	// ask state or data
	fire(type: PipelinesEventTypes.ASK_PIPELINES): this;
	on(type: PipelinesEventTypes.ASK_PIPELINES, listener: () => void): this;
	off(type: PipelinesEventTypes.ASK_PIPELINES, listener: () => void): this;

	fire(type: PipelinesEventTypes.REPLY_PIPELINES, pipelines: Array<Pipeline>): this;
	once(type: PipelinesEventTypes.REPLY_PIPELINES, listener: (pipelines: Array<Pipeline>) => void): this;

	fire(type: PipelinesEventTypes.ASK_TOPICS): this;
	on(type: PipelinesEventTypes.ASK_TOPICS, listener: () => void): this;
	off(type: PipelinesEventTypes.ASK_TOPICS, listener: () => void): this;

	fire(type: PipelinesEventTypes.REPLY_TOPICS, topics: Array<Topic>): this;
	once(type: PipelinesEventTypes.REPLY_TOPICS, listener: (topics: Array<Topic>) => void): this;
}