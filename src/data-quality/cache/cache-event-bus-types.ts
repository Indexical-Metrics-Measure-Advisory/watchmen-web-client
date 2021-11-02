import {DQCCacheData} from './types';

export enum DataQualityCacheEventTypes {
	DATA_LOADED = 'data-loaded',

	ASK_DATA_LOADED = 'ask-data-loaded',

	ASK_DATA = 'ask-data',

	ASK_RELOAD = 'ask-reload',
}

export interface DataQualityCacheEventBus {
	fire(type: DataQualityCacheEventTypes.DATA_LOADED, data: DQCCacheData): this;
	on(type: DataQualityCacheEventTypes.DATA_LOADED, listener: (data: DQCCacheData) => void): this;
	off(type: DataQualityCacheEventTypes.DATA_LOADED, listener: (data: DQCCacheData) => void): this;

	fire(type: DataQualityCacheEventTypes.ASK_DATA_LOADED, onDataLoadedGet: (loaded: boolean) => void): this;
	on(type: DataQualityCacheEventTypes.ASK_DATA_LOADED, listener: (onDataLoadedGet: (loaded: boolean) => void) => void): this;
	off(type: DataQualityCacheEventTypes.ASK_DATA_LOADED, listener: (onDataLoadedGet: (loaded: boolean) => void) => void): this;

	fire(type: DataQualityCacheEventTypes.ASK_DATA, onData: (data?: DQCCacheData) => void): this;
	on(type: DataQualityCacheEventTypes.ASK_DATA, listener: (onData: (data?: DQCCacheData) => void) => void): this;
	off(type: DataQualityCacheEventTypes.ASK_DATA, listener: (onData: (data?: DQCCacheData) => void) => void): this;

	fire(type: DataQualityCacheEventTypes.ASK_RELOAD, onReloaded: () => void): this;
	on(type: DataQualityCacheEventTypes.ASK_RELOAD, listener: (onReloaded: () => void) => void): this;
	off(type: DataQualityCacheEventTypes.ASK_RELOAD, listener: (onReloaded: () => void) => void): this;
}