import {AdminCacheData} from '../../local-persist/types';

export enum AdminCacheEventTypes {
	DATA_LOADED = 'data-loaded',

	ASK_DATA_LOADED = 'ask-data-loaded',
	REPLY_DATA_LOADED = 'reply-data-loaded',

	ASK_DATA = 'ask-data',
	REPLY_DATA = 'reply-data',

	ASK_RELOAD = 'ask-reload',
	REPLY_RELOAD = 'reply-reload'
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
}