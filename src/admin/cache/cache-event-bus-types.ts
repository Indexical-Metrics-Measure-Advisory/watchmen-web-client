import {AdminCacheData} from '@/local-persist/types';
import {Pipeline, PipelinesGraphics} from '@/services/tuples/pipeline-types';
import {Topic} from '@/services/tuples/topic-types';

export enum AdminCacheEventTypes {
	DATA_LOADED = 'data-loaded',

	ASK_DATA_LOADED = 'ask-data-loaded',
	REPLY_DATA_LOADED = 'reply-data-loaded',

	ASK_DATA = 'ask-data',
	REPLY_DATA = 'reply-data',

	ASK_RELOAD = 'ask-reload',
	REPLY_RELOAD = 'reply-reload',

	SAVE_PIPELINE = 'save-pipeline',
	SAVE_TOPIC = 'save-topic',
	SAVE_PIPELINES_GRAPHICS = 'save-pipelines-graphics',
	REMOVE_PIPELINES_GRAPHICS = 'remove-pipelines-graphics',

	PIPELINE_LOADED = 'pipeline-loaded',
	TOPIC_LOADED = 'topic-loaded',
}

export interface AdminCacheEventBus {
	fire(type: AdminCacheEventTypes.DATA_LOADED, data: AdminCacheData): this;
	on(type: AdminCacheEventTypes.DATA_LOADED, listener: (data: AdminCacheData) => void): this;
	off(type: AdminCacheEventTypes.DATA_LOADED, listener: (data: AdminCacheData) => void): this;

	fire(type: AdminCacheEventTypes.ASK_DATA_LOADED): this;
	on(type: AdminCacheEventTypes.ASK_DATA_LOADED, listener: () => void): this;
	off(type: AdminCacheEventTypes.ASK_DATA_LOADED, listener: () => void): this;

	fire(type: AdminCacheEventTypes.REPLY_DATA_LOADED, loaded: boolean): this;
	once(type: AdminCacheEventTypes.REPLY_DATA_LOADED, listener: (loaded: boolean) => void): this;

	fire(type: AdminCacheEventTypes.ASK_DATA): this;
	on(type: AdminCacheEventTypes.ASK_DATA, listener: () => void): this;
	off(type: AdminCacheEventTypes.ASK_DATA, listener: () => void): this;

	fire(type: AdminCacheEventTypes.REPLY_DATA, data?: AdminCacheData): this;
	once(type: AdminCacheEventTypes.REPLY_DATA, listener: (data?: AdminCacheData) => void): this;

	fire(type: AdminCacheEventTypes.ASK_RELOAD): this;
	on(type: AdminCacheEventTypes.ASK_RELOAD, listener: () => void): this;
	off(type: AdminCacheEventTypes.ASK_RELOAD, listener: () => void): this;

	fire(type: AdminCacheEventTypes.REPLY_RELOAD): this;
	once(type: AdminCacheEventTypes.REPLY_RELOAD, listener: () => void): this;

	fire(type: AdminCacheEventTypes.SAVE_PIPELINE, pipeline: Pipeline): this;
	on(type: AdminCacheEventTypes.SAVE_PIPELINE, listener: (pipeline: Pipeline) => void): this;
	off(type: AdminCacheEventTypes.SAVE_PIPELINE, listener: (pipeline: Pipeline) => void): this;

	fire(type: AdminCacheEventTypes.SAVE_TOPIC, topic: Topic): this;
	on(type: AdminCacheEventTypes.SAVE_TOPIC, listener: (topic: Topic) => void): this;
	off(type: AdminCacheEventTypes.SAVE_TOPIC, listener: (topic: Topic) => void): this;

	fire(type: AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, graphics: PipelinesGraphics): this;
	on(type: AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, listener: (graphics: PipelinesGraphics) => void): this;
	off(type: AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, listener: (graphics: PipelinesGraphics) => void): this;

	fire(type: AdminCacheEventTypes.REMOVE_PIPELINES_GRAPHICS, pipelineGraphId: string): this;
	on(type: AdminCacheEventTypes.REMOVE_PIPELINES_GRAPHICS, listener: (pipelineGraphId: string) => void): this;
	off(type: AdminCacheEventTypes.REMOVE_PIPELINES_GRAPHICS, listener: (pipelineGraphId: string) => void): this;

	fire(type: AdminCacheEventTypes.PIPELINE_LOADED, pipeline: Pipeline): this;
	on(type: AdminCacheEventTypes.PIPELINE_LOADED, listener: (pipeline: Pipeline) => void): this;
	off(type: AdminCacheEventTypes.PIPELINE_LOADED, listener: (pipeline: Pipeline) => void): this;

	fire(type: AdminCacheEventTypes.TOPIC_LOADED, topic: Topic): this;
	on(type: AdminCacheEventTypes.TOPIC_LOADED, listener: (topic: Topic) => void): this;
	off(type: AdminCacheEventTypes.TOPIC_LOADED, listener: (topic: Topic) => void): this;
}