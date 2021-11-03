export enum SearchTextEventTypes {
	HIDE_SEARCH = 'hide-search',
}

export interface SearchTextEventBus {
	fire(type: SearchTextEventTypes.HIDE_SEARCH): this;
	on(type: SearchTextEventTypes.HIDE_SEARCH, listener: () => void): this;
	off(type: SearchTextEventTypes.HIDE_SEARCH, listener: () => void): this;
}