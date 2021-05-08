import {Favorite} from '../services/console/favorite-types';
import {LastSnapshot} from '../services/console/last-snapshot-types';
import {AvailableSpaceInConsole, ConsoleSettings} from '../services/console/settings-types';
import {ConnectedSpace, ConnectedSpaceGraphics} from '../services/tuples/connected-space-types';
import {Dashboard} from '../services/tuples/dashboard-types';
import {Topic} from '../services/tuples/topic-types';

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

	// data changing
	DASHBOARD_ADDED_INTO_FAVORITE = 'dashboard-added-into-favorite',
	DASHBOARD_REMOVED_FROM_FAVORITE = 'dashboard-removed-from-favorite',
	CONNECTED_SPACE_ADDED_INTO_FAVORITE = 'connected-space-added-into-favorite',
	CONNECTED_SPACE_REMOVED_FROM_FAVORITE = 'connected-space-removed-from-favorite',

	DASHBOARD_CREATED = 'dashboard-created',
	DASHBOARD_RENAMED = 'dashboard-renamed',
	DASHBOARD_REMOVED = 'dashboard-removed',

	CONNECTED_SPACE_CREATED = 'connected-space-created',
	CONNECTED_SPACE_RENAMED = 'connected-space-renamed',
	CONNECTED_SPACE_REMOVED = 'connected-space-removed',

	CONNECTED_SPACE_GRAPHICS_CHANGED = 'connected-space-graphics-changed',

	// ask data
	ASK_LAST_SNAPSHOT = 'ask-last-snapshot',
	REPLY_LAST_SNAPSHOT = 'reply-last-snapshot',

	ASK_FAVORITE = 'ask-favorite',
	REPLY_FAVORITE = 'reply-favorite',

	ASK_CONNECTED_SPACES = 'ask-connected-spaces',
	REPLY_CONNECTED_SPACES = 'reply-connected-spaces',

	ASK_CONNECTED_SPACE_GRAPHICS = 'ask-connected-space-graphics',
	REPLY_CONNECTED_SPACE_GRAPHICS = 'reply-connected-space-graphics',

	ASK_DASHBOARDS = 'ask-dashboards',
	REPLY_DASHBOARDS = 'reply-dashboards',

	ASK_AVAILABLE_SPACES = 'ask-available-spaces',
	REPLY_AVAILABLE_SPACES = 'reply-available-spaces',

	ASK_AVAILABLE_TOPICS = 'ask-available-topics',
	REPLY_AVAILABLE_TOPICS = 'reply-available-topics',
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

	fire(type: ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, dashboardId: string): this;

	on(type: ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, listener: (dashboardId: string) => void): this;

	off(type: ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, listener: (dashboardId: string) => void): this;

	fire(type: ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, dashboardId: string): this;

	on(type: ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, listener: (dashboardId: string) => void): this;

	off(type: ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, listener: (dashboardId: string) => void): this;

	fire(type: ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, connectedSpaceId: string): this;

	on(type: ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, listener: (connectedSpaceId: string) => void): this;

	off(type: ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, listener: (connectedSpaceId: string) => void): this;

	fire(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, connectedSpaceId: string): this;

	on(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, listener: (connectedSpaceId: string) => void): this;

	off(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, listener: (connectedSpaceId: string) => void): this;

	// dashboard
	fire(type: ConsoleEventTypes.DASHBOARD_CREATED, dashboard: Dashboard): this;

	on(type: ConsoleEventTypes.DASHBOARD_CREATED, listener: (dashboard: Dashboard) => void): this;

	off(type: ConsoleEventTypes.DASHBOARD_CREATED, listener: (dashboard: Dashboard) => void): this;

	fire(type: ConsoleEventTypes.DASHBOARD_RENAMED, dashboard: Dashboard): this;

	on(type: ConsoleEventTypes.DASHBOARD_RENAMED, listener: (dashboard: Dashboard) => void): this;

	off(type: ConsoleEventTypes.DASHBOARD_RENAMED, listener: (dashboard: Dashboard) => void): this;

	fire(type: ConsoleEventTypes.DASHBOARD_REMOVED, dashboard: Dashboard): this;

	on(type: ConsoleEventTypes.DASHBOARD_REMOVED, listener: (dashboard: Dashboard) => void): this;

	off(type: ConsoleEventTypes.DASHBOARD_REMOVED, listener: (dashboard: Dashboard) => void): this;

	// connected space
	fire(type: ConsoleEventTypes.CONNECTED_SPACE_CREATED, connectedSpace: ConnectedSpace): this;

	on(type: ConsoleEventTypes.CONNECTED_SPACE_CREATED, listener: (connectedSpace: ConnectedSpace) => void): this;

	off(type: ConsoleEventTypes.CONNECTED_SPACE_CREATED, listener: (connectedSpace: ConnectedSpace) => void): this;

	fire(type: ConsoleEventTypes.CONNECTED_SPACE_RENAMED, connectedSpace: ConnectedSpace): this;

	on(type: ConsoleEventTypes.CONNECTED_SPACE_RENAMED, listener: (connectedSpace: ConnectedSpace) => void): this;

	off(type: ConsoleEventTypes.CONNECTED_SPACE_RENAMED, listener: (connectedSpace: ConnectedSpace) => void): this;

	fire(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED, connectedSpace: ConnectedSpace): this;

	on(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED, listener: (connectedSpace: ConnectedSpace) => void): this;

	off(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED, listener: (connectedSpace: ConnectedSpace) => void): this;

	fire(type: ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, graphics: ConnectedSpaceGraphics): this;

	on(type: ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, listener: (graphics: ConnectedSpaceGraphics) => void): this;

	off(type: ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, listener: (graphics: ConnectedSpaceGraphics) => void): this;

	// ask state or data
	fire(type: ConsoleEventTypes.ASK_LAST_SNAPSHOT): this;

	on(type: ConsoleEventTypes.ASK_LAST_SNAPSHOT, listener: () => void): this;

	off(type: ConsoleEventTypes.ASK_LAST_SNAPSHOT, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_LAST_SNAPSHOT, lastSnapshot: LastSnapshot): this;

	once(type: ConsoleEventTypes.REPLY_LAST_SNAPSHOT, listener: (lastSnapshot: LastSnapshot) => void): this;

	fire(type: ConsoleEventTypes.ASK_FAVORITE): this;

	on(type: ConsoleEventTypes.ASK_FAVORITE, listener: () => void): this;

	off(type: ConsoleEventTypes.ASK_FAVORITE, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_FAVORITE, favorite: Favorite): this;

	once(type: ConsoleEventTypes.REPLY_FAVORITE, listener: (favorite: Favorite) => void): this;

	fire(type: ConsoleEventTypes.ASK_CONNECTED_SPACES): this;

	on(type: ConsoleEventTypes.ASK_CONNECTED_SPACES, listener: () => void): this;

	off(type: ConsoleEventTypes.ASK_CONNECTED_SPACES, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_CONNECTED_SPACES, connectedSpaces: Array<ConnectedSpace>): this;

	once(type: ConsoleEventTypes.REPLY_CONNECTED_SPACES, listener: (connectedSpaces: Array<ConnectedSpace>) => void): this;

	fire(type: ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS): this;

	on(type: ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, listener: () => void): this;

	off(type: ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_CONNECTED_SPACE_GRAPHICS, connectedSpaceGraphics: Array<ConnectedSpaceGraphics>): this;

	once(type: ConsoleEventTypes.REPLY_CONNECTED_SPACE_GRAPHICS, listener: (connectedSpaceGraphics: Array<ConnectedSpaceGraphics>) => void): this;

	fire(type: ConsoleEventTypes.ASK_DASHBOARDS): this;

	on(type: ConsoleEventTypes.ASK_DASHBOARDS, listener: () => void): this;

	off(type: ConsoleEventTypes.ASK_DASHBOARDS, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_DASHBOARDS, dashboards: Array<Dashboard>): this;

	once(type: ConsoleEventTypes.REPLY_DASHBOARDS, listener: (dashboards: Array<Dashboard>) => void): this;

	fire(type: ConsoleEventTypes.ASK_AVAILABLE_SPACES): this;

	on(type: ConsoleEventTypes.ASK_AVAILABLE_SPACES, listener: () => void): this;

	off(type: ConsoleEventTypes.ASK_AVAILABLE_SPACES, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_AVAILABLE_SPACES, availableSpaces: Array<AvailableSpaceInConsole>): this;

	once(type: ConsoleEventTypes.REPLY_AVAILABLE_SPACES, listener: (availableSpaces: Array<AvailableSpaceInConsole>) => void): this;

	fire(type: ConsoleEventTypes.ASK_AVAILABLE_TOPICS): this;

	on(type: ConsoleEventTypes.ASK_AVAILABLE_TOPICS, listener: () => void): this;

	off(type: ConsoleEventTypes.ASK_AVAILABLE_TOPICS, listener: () => void): this;

	fire(type: ConsoleEventTypes.REPLY_AVAILABLE_TOPICS, availableTopics: Array<Topic>): this;

	once(type: ConsoleEventTypes.REPLY_AVAILABLE_TOPICS, listener: (availableTopics: Array<Topic>) => void): this;
}