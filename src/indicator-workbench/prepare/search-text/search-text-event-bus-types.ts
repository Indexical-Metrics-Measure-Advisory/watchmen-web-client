export enum SearchTextEventTypes {
	HIDE_SEARCH = 'hide-search',

	FOCUS = 'focus'
}

export interface SearchTextEventBus {
	fire(type: SearchTextEventTypes.HIDE_SEARCH): this;
	on(type: SearchTextEventTypes.HIDE_SEARCH, listener: () => void): this;
	off(type: SearchTextEventTypes.HIDE_SEARCH, listener: () => void): this;

	fire(type: SearchTextEventTypes.FOCUS): this;
	on(type: SearchTextEventTypes.FOCUS, listener: () => void): this;
	off(type: SearchTextEventTypes.FOCUS, listener: () => void): this;
}