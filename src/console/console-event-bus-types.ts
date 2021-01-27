import { ConsoleSettings } from '../services/console/settings-types';

export enum FavoriteState {
	HIDDEN = 'hidden',
	SHOWN = 'shown',
	PIN = 'pin'
}

export enum ConsoleEventTypes {
	DO_LOAD_SETTINGS = 'do-load-settings',
	SETTINGS_LOADED = 'settings-loaded',

	SHOW_FAVORITE = 'show-favorite',
	PIN_FAVORITE = 'pin-favorite',
	HIDE_FAVORITE = 'hide-favorite',
	ASK_FAVORITE_STATE = 'ask-favorite-state',
	REPLY_FAVORITE_STATE = 'reply-favorite-state'
}

export interface ConsoleEventBus {
	// settings load
	fire(type: ConsoleEventTypes.DO_LOAD_SETTINGS): this;
	on(type: ConsoleEventTypes.DO_LOAD_SETTINGS, listener: () => void): this;
	off(type: ConsoleEventTypes.DO_LOAD_SETTINGS, listener: () => void): this;

	fire(type: ConsoleEventTypes.SETTINGS_LOADED, settings: ConsoleSettings): this;
	on(type: ConsoleEventTypes.SETTINGS_LOADED, listener: (settings: ConsoleSettings) => void): this;
	off(type: ConsoleEventTypes.SETTINGS_LOADED, listener: (settings: ConsoleSettings) => void): this;

	// favorite
	fire(type: ConsoleEventTypes.SHOW_FAVORITE): this;
	on(type: ConsoleEventTypes.SHOW_FAVORITE, listener: () => void): this;
	off(type: ConsoleEventTypes.SHOW_FAVORITE, listener: () => void): this;

	fire(type: ConsoleEventTypes.PIN_FAVORITE): this;
	on(type: ConsoleEventTypes.PIN_FAVORITE, listener: () => void): this;
	off(type: ConsoleEventTypes.PIN_FAVORITE, listener: () => void): this;

	fire(type: ConsoleEventTypes.HIDE_FAVORITE): this;
	on(type: ConsoleEventTypes.HIDE_FAVORITE, listener: () => void): this;
	off(type: ConsoleEventTypes.HIDE_FAVORITE, listener: () => void): this;

	fire(type: ConsoleEventTypes.ASK_FAVORITE_STATE): this;
	on(type: ConsoleEventTypes.ASK_FAVORITE_STATE, listener: () => void): this;
	off(type: ConsoleEventTypes.ASK_FAVORITE_STATE, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_FAVORITE_STATE, state: FavoriteState): this;
	once(type: ConsoleEventTypes.REPLY_FAVORITE_STATE, listener: (state: FavoriteState) => void): this;
	off(type: ConsoleEventTypes.REPLY_FAVORITE_STATE, listener: (state: FavoriteState) => void): this;
}