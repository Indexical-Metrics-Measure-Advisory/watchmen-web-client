import { ConnectedSpace } from '../services/console/connected-space-types';
import { ConsoleSettings } from '../services/console/settings-types';

export enum FavoriteState {
	HIDDEN = 'hidden',
	SHOWN = 'shown',
	PIN = 'pin'
}

export enum ConsoleEventTypes {
	SETTINGS_LOADED = 'settings-loaded',
	ASK_SETTINGS_LOADED = 'ask-settings-loaded',
	REPLY_SETTINGS_LOADED = 'reply-settings-loaded',

	SIDE_MENU_RESIZED = 'side-menu-resized',

	SHOW_FAVORITE = 'show-favorite',
	PIN_FAVORITE = 'pin-favorite',
	UNPIN_FAVORITE = 'unpin-favorite',
	HIDE_FAVORITE = 'hide-favorite',
	ASK_FAVORITE_STATE = 'ask-favorite-state',
	REPLY_FAVORITE_STATE = 'reply-favorite-state',

	DASHBOARD_REMOVED_FROM_FAVORITE = 'dashboard-removed-from-favorite',
	CONNECTED_SPACE_REMOVED_FROM_FAVORITE = 'connected-space-removed-from-favorite',

	ASK_CONNECTED_SPACES = 'ask-connected-spaces',
	REPLY_CONNECTED_SPACES = 'reply-connected-spaces'
}

export interface ConsoleEventBus {
	// settings load
	fire(type: ConsoleEventTypes.SETTINGS_LOADED, settings: ConsoleSettings): this;
	on(type: ConsoleEventTypes.SETTINGS_LOADED, listener: (settings: ConsoleSettings) => void): this;
	off(type: ConsoleEventTypes.SETTINGS_LOADED, listener: (settings: ConsoleSettings) => void): this;

	fire(type: ConsoleEventTypes.ASK_SETTINGS_LOADED): this;
	on(type: ConsoleEventTypes.ASK_SETTINGS_LOADED, listener: () => void): this;
	off(type: ConsoleEventTypes.ASK_SETTINGS_LOADED, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_SETTINGS_LOADED, initialized: boolean): this;
	once(type: ConsoleEventTypes.REPLY_SETTINGS_LOADED, listener: (initialized: boolean) => void): this;
	off(type: ConsoleEventTypes.REPLY_SETTINGS_LOADED, listener: (initialized: boolean) => void): this;

	// side menu resize
	fire(type: ConsoleEventTypes.SIDE_MENU_RESIZED, width: number): this;
	on(type: ConsoleEventTypes.SIDE_MENU_RESIZED, listener: (width: number) => void): this;
	off(type: ConsoleEventTypes.SIDE_MENU_RESIZED, listener: (width: number) => void): this;

	// favorite
	fire(type: ConsoleEventTypes.SHOW_FAVORITE, position: { top: number, left: number }): this;
	on(type: ConsoleEventTypes.SHOW_FAVORITE, listener: (position: { top: number, left: number }) => void): this;
	off(type: ConsoleEventTypes.SHOW_FAVORITE, listener: (position: { top: number, left: number }) => void): this;

	fire(type: ConsoleEventTypes.PIN_FAVORITE): this;
	on(type: ConsoleEventTypes.PIN_FAVORITE, listener: () => void): this;
	off(type: ConsoleEventTypes.PIN_FAVORITE, listener: () => void): this;

	fire(type: ConsoleEventTypes.UNPIN_FAVORITE): this;
	on(type: ConsoleEventTypes.UNPIN_FAVORITE, listener: () => void): this;
	off(type: ConsoleEventTypes.UNPIN_FAVORITE, listener: () => void): this;

	fire(type: ConsoleEventTypes.HIDE_FAVORITE): this;
	on(type: ConsoleEventTypes.HIDE_FAVORITE, listener: () => void): this;
	off(type: ConsoleEventTypes.HIDE_FAVORITE, listener: () => void): this;

	fire(type: ConsoleEventTypes.ASK_FAVORITE_STATE): this;
	on(type: ConsoleEventTypes.ASK_FAVORITE_STATE, listener: () => void): this;
	off(type: ConsoleEventTypes.ASK_FAVORITE_STATE, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_FAVORITE_STATE, state: FavoriteState): this;
	once(type: ConsoleEventTypes.REPLY_FAVORITE_STATE, listener: (state: FavoriteState) => void): this;
	off(type: ConsoleEventTypes.REPLY_FAVORITE_STATE, listener: (state: FavoriteState) => void): this;

	fire(type: ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, dashboardId: string): this;
	on(type: ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, listener: (dashboardId: string) => void): this;
	off(type: ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, listener: (dashboardId: string) => void): this;

	fire(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, connectedSpaceId: string): this;
	on(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, listener: (connectedSpaceId: string) => void): this;
	off(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, listener: (connectedSpaceId: string) => void): this;

	fire(type: ConsoleEventTypes.ASK_CONNECTED_SPACES): this;
	on(type: ConsoleEventTypes.ASK_CONNECTED_SPACES, listener: () => void): this;
	off(type: ConsoleEventTypes.ASK_CONNECTED_SPACES, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_CONNECTED_SPACES, connectedSpaces: Array<ConnectedSpace>): this;
	once(type: ConsoleEventTypes.REPLY_CONNECTED_SPACES, listener: (connectedSpaces: Array<ConnectedSpace>) => void): this;
	off(type: ConsoleEventTypes.REPLY_CONNECTED_SPACES, listener: (connectedSpaces: Array<ConnectedSpace>) => void): this;
}