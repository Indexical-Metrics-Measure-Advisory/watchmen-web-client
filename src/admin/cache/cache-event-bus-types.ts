import {DataSource} from '@/services/data/tuples/data-source-types';
import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {Pipeline, PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AdminCacheData} from '@/services/local-persist/types';

export enum AdminCacheEventTypes {
	DATA_LOADED = 'data-loaded',

	ASK_DATA_LOADED = 'ask-data-loaded',
	ASK_DATA = 'ask-data',
	ASK_RELOAD = 'ask-reload',

	SAVE_PIPELINE = 'save-pipeline',
	SAVE_TOPIC = 'save-topic',
	SAVE_PIPELINES_GRAPHICS = 'save-pipelines-graphics',
	REMOVE_PIPELINES_GRAPHICS = 'remove-pipelines-graphics',
	SAVE_DATA_SOURCE = 'save-data-source',
	SAVE_EXTERNAL_WRITER = 'save-external-writer',

	PIPELINE_LOADED = 'pipeline-loaded',
	TOPIC_LOADED = 'topic-loaded',
}

export interface AdminCacheEventBus {
	fire(type: AdminCacheEventTypes.DATA_LOADED, data: AdminCacheData): this;
	on(type: AdminCacheEventTypes.DATA_LOADED, listener: (data: AdminCacheData) => void): this;
	off(type: AdminCacheEventTypes.DATA_LOADED, listener: (data: AdminCacheData) => void): this;

	fire(type: AdminCacheEventTypes.ASK_DATA_LOADED, onDataLoadedGot: (loaded: boolean) => void): this;
	on(type: AdminCacheEventTypes.ASK_DATA_LOADED, listener: (onDataLoadedGot: (loaded: boolean) => void) => void): this;
	off(type: AdminCacheEventTypes.ASK_DATA_LOADED, listener: (onDataLoadedGot: (loaded: boolean) => void) => void): this;

	fire(type: AdminCacheEventTypes.ASK_DATA, onData: (data?: AdminCacheData) => void): this;
	on(type: AdminCacheEventTypes.ASK_DATA, listener: (onData: (data?: AdminCacheData) => void) => void): this;
	off(type: AdminCacheEventTypes.ASK_DATA, listener: (onData: (data?: AdminCacheData) => void) => void): this;

	fire(type: AdminCacheEventTypes.ASK_RELOAD, onReloaded: () => void): this;
	on(type: AdminCacheEventTypes.ASK_RELOAD, listener: (onReloaded: () => void) => void): this;
	off(type: AdminCacheEventTypes.ASK_RELOAD, listener: (onReloaded: () => void) => void): this;

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

	fire(type: AdminCacheEventTypes.SAVE_DATA_SOURCE, dataSource: DataSource): this;
	on(type: AdminCacheEventTypes.SAVE_DATA_SOURCE, listener: (dataSource: DataSource) => void): this;
	off(type: AdminCacheEventTypes.SAVE_DATA_SOURCE, listener: (dataSource: DataSource) => void): this;

	fire(type: AdminCacheEventTypes.SAVE_EXTERNAL_WRITER, writer: ExternalWriter): this;
	on(type: AdminCacheEventTypes.SAVE_EXTERNAL_WRITER, listener: (writer: ExternalWriter) => void): this;
	off(type: AdminCacheEventTypes.SAVE_EXTERNAL_WRITER, listener: (writer: ExternalWriter) => void): this;

	fire(type: AdminCacheEventTypes.PIPELINE_LOADED, pipeline: Pipeline): this;
	on(type: AdminCacheEventTypes.PIPELINE_LOADED, listener: (pipeline: Pipeline) => void): this;
	off(type: AdminCacheEventTypes.PIPELINE_LOADED, listener: (pipeline: Pipeline) => void): this;

	fire(type: AdminCacheEventTypes.TOPIC_LOADED, topic: Topic): this;
	on(type: AdminCacheEventTypes.TOPIC_LOADED, listener: (topic: Topic) => void): this;
	off(type: AdminCacheEventTypes.TOPIC_LOADED, listener: (topic: Topic) => void): this;
}