import {PipelinesSettings} from '@/services/data/pipeline/settings-types';
import {Pipeline, PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';

export enum PipelinesEventTypes {
	SETTINGS_LOADED = 'settings-loaded',

	PIPELINE_ADDED = 'pipeline-added',
	GRAPHICS_CHANGED = 'graphics-changed',

	// ask data
	ASK_SETTINGS_LOADED = 'ask-settings-loaded',

	ASK_PIPELINES = 'ask-pipelines',

	ASK_TOPICS = 'ask-topics',

	ASK_GRAPHICS = 'ask-graphics',
}

export interface PipelinesEventBus {
	// settings load
	fire(type: PipelinesEventTypes.SETTINGS_LOADED, settings: PipelinesSettings): this;
	on(type: PipelinesEventTypes.SETTINGS_LOADED, listener: (settings: PipelinesSettings) => void): this;
	off(type: PipelinesEventTypes.SETTINGS_LOADED, listener: (settings: PipelinesSettings) => void): this;

	fire(type: PipelinesEventTypes.PIPELINE_ADDED, pipeline: Pipeline): this;
	on(type: PipelinesEventTypes.PIPELINE_ADDED, listener: (pipeline: Pipeline) => void): this;
	off(type: PipelinesEventTypes.PIPELINE_ADDED, listener: (pipeline: Pipeline) => void): this;

	fire(type: PipelinesEventTypes.GRAPHICS_CHANGED, graphics: PipelinesGraphics): this;
	on(type: PipelinesEventTypes.GRAPHICS_CHANGED, listener: (graphics: PipelinesGraphics) => void): this;
	off(type: PipelinesEventTypes.GRAPHICS_CHANGED, listener: (graphics: PipelinesGraphics) => void): this;

	// ask state or data
	fire(type: PipelinesEventTypes.ASK_SETTINGS_LOADED, onSettingsLoadedGet: (loaded: boolean) => void): this;
	on(type: PipelinesEventTypes.ASK_SETTINGS_LOADED, listener: (onSettingsLoadedGet: (loaded: boolean) => void) => void): this;
	off(type: PipelinesEventTypes.ASK_SETTINGS_LOADED, listener: (onSettingsLoadedGet: (loaded: boolean) => void) => void): this;

	fire(type: PipelinesEventTypes.ASK_PIPELINES, onData: (pipelines: Array<Pipeline>) => void): this;
	on(type: PipelinesEventTypes.ASK_PIPELINES, listener: (onData: (pipelines: Array<Pipeline>) => void) => void): this;
	off(type: PipelinesEventTypes.ASK_PIPELINES, listener: (onData: (pipelines: Array<Pipeline>) => void) => void): this;

	fire(type: PipelinesEventTypes.ASK_TOPICS, onData: (topics: Array<Topic>) => void): this;
	on(type: PipelinesEventTypes.ASK_TOPICS, listener: (onData: (topics: Array<Topic>) => void) => void): this;
	off(type: PipelinesEventTypes.ASK_TOPICS, listener: (onData: (topics: Array<Topic>) => void) => void): this;

	fire(type: PipelinesEventTypes.ASK_GRAPHICS, onData: (graphics: Array<PipelinesGraphics>) => void): this;
	on(type: PipelinesEventTypes.ASK_GRAPHICS, listener: (onData: (graphics: Array<PipelinesGraphics>) => void) => void): this;
	off(type: PipelinesEventTypes.ASK_GRAPHICS, listener: (onData: (graphics: Array<PipelinesGraphics>) => void) => void): this;
}