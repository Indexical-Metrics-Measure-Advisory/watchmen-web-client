import {DataQualityCacheData} from '../../local-persist/types';

export enum DataQualityCacheEventTypes {
	DATA_LOADED = 'data-loaded',

	ASK_DATA_LOADED = 'ask-data-loaded',
	REPLY_DATA_LOADED = 'reply-data-loaded',

	ASK_DATA = 'ask-data',
	REPLY_DATA = 'reply-data',

	ASK_RELOAD = 'ask-reload',
	REPLY_RELOAD = 'reply-reload',
}

export interface DataQualityCacheEventBus {
	fire(type: DataQualityCacheEventTypes.DATA_LOADED, data: DataQualityCacheData): this;
	on(type: DataQualityCacheEventTypes.DATA_LOADED, listener: (data: DataQualityCacheData) => void): this;
	off(type: DataQualityCacheEventTypes.DATA_LOADED, listener: (data: DataQualityCacheData) => void): this;

	fire(type: DataQualityCacheEventTypes.ASK_DATA_LOADED): this;
	on(type: DataQualityCacheEventTypes.ASK_DATA_LOADED, listener: () => void): this;
	off(type: DataQualityCacheEventTypes.ASK_DATA_LOADED, listener: () => void): this;

	fire(type: DataQualityCacheEventTypes.REPLY_DATA_LOADED, loaded: boolean): this;
	once(type: DataQualityCacheEventTypes.REPLY_DATA_LOADED, listener: (loaded: boolean) => void): this;

	fire(type: DataQualityCacheEventTypes.ASK_DATA): this;
	on(type: DataQualityCacheEventTypes.ASK_DATA, listener: () => void): this;
	off(type: DataQualityCacheEventTypes.ASK_DATA, listener: () => void): this;

	fire(type: DataQualityCacheEventTypes.REPLY_DATA, data?: DataQualityCacheData): this;
	once(type: DataQualityCacheEventTypes.REPLY_DATA, listener: (data?: DataQualityCacheData) => void): this;

	fire(type: DataQualityCacheEventTypes.ASK_RELOAD): this;
	on(type: DataQualityCacheEventTypes.ASK_RELOAD, listener: () => void): this;
	off(type: DataQualityCacheEventTypes.ASK_RELOAD, listener: () => void): this;

	fire(type: DataQualityCacheEventTypes.REPLY_RELOAD): this;
	once(type: DataQualityCacheEventTypes.REPLY_RELOAD, listener: () => void): this;
}