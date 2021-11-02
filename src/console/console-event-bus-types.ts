import {LastSnapshot} from '@/services/data/account/last-snapshot-types';
import {Favorite} from '@/services/data/console/favorite-types';
import {AvailableSpaceInConsole, ConsoleSettings} from '@/services/data/console/settings-types';
import {ConnectedSpace, ConnectedSpaceGraphics, ConnectedSpaceId} from '@/services/data/tuples/connected-space-types';
import {Dashboard, DashboardId} from '@/services/data/tuples/dashboard-types';
import {Enum, EnumId} from '@/services/data/tuples/enum-types';
import {Topic} from '@/services/data/tuples/topic-types';

export enum FavoriteState {
	HIDDEN = 'hidden',
	SHOWN = 'shown',
	PIN = 'pin'
}

export enum ConsoleEventTypes {
	SETTINGS_LOADED = 'settings-loaded',
	ASK_SETTINGS_LOADED = 'ask-settings-loaded',

	SHOW_FAVORITE = 'show-favorite',
	PIN_FAVORITE = 'pin-favorite',
	UNPIN_FAVORITE = 'unpin-favorite',
	HIDE_FAVORITE = 'hide-favorite',
	ASK_FAVORITE_STATE = 'ask-favorite-state',

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
	ASK_FAVORITE = 'ask-favorite',
	ASK_CONNECTED_SPACES = 'ask-connected-spaces',
	ASK_CONNECTED_SPACE_GRAPHICS = 'ask-connected-space-graphics',
	ASK_DASHBOARDS = 'ask-dashboards',
	ASK_AVAILABLE_SPACES = 'ask-available-spaces',
	ASK_AVAILABLE_TOPICS = 'ask-available-topics',
	ASK_ENUM = 'ask-enum',
}

export interface ConsoleEventBus {
	// settings load
	fire(type: ConsoleEventTypes.SETTINGS_LOADED, settings: ConsoleSettings): this;
	on(type: ConsoleEventTypes.SETTINGS_LOADED, listener: (settings: ConsoleSettings) => void): this;
	off(type: ConsoleEventTypes.SETTINGS_LOADED, listener: (settings: ConsoleSettings) => void): this;

	fire(type: ConsoleEventTypes.ASK_SETTINGS_LOADED, onSettingsLoadedGet: (initialized: boolean) => void): this;
	on(type: ConsoleEventTypes.ASK_SETTINGS_LOADED, listener: (onSettingsLoadedGet: (initialized: boolean) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_SETTINGS_LOADED, listener: (onSettingsLoadedGet: (initialized: boolean) => void) => void): this;

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

	fire(type: ConsoleEventTypes.ASK_FAVORITE_STATE, onStateGet: (state: FavoriteState) => void): this;
	on(type: ConsoleEventTypes.ASK_FAVORITE_STATE, listener: (onStateGet: (state: FavoriteState) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_FAVORITE_STATE, listener: (onStateGet: (state: FavoriteState) => void) => void): this;

	fire(type: ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, dashboardId: DashboardId): this;
	on(type: ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, listener: (dashboardId: DashboardId) => void): this;
	off(type: ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, listener: (dashboardId: DashboardId) => void): this;

	fire(type: ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, dashboardId: DashboardId): this;
	on(type: ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, listener: (dashboardId: DashboardId) => void): this;
	off(type: ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, listener: (dashboardId: DashboardId) => void): this;

	fire(type: ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, connectedSpaceId: ConnectedSpaceId): this;
	on(type: ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, listener: (connectedSpaceId: ConnectedSpaceId) => void): this;
	off(type: ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, listener: (connectedSpaceId: ConnectedSpaceId) => void): this;

	fire(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, connectedSpaceId: ConnectedSpaceId): this;
	on(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, listener: (connectedSpaceId: ConnectedSpaceId) => void): this;
	off(type: ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, listener: (connectedSpaceId: ConnectedSpaceId) => void): this;

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
	fire(type: ConsoleEventTypes.ASK_LAST_SNAPSHOT, onData: (lastSnapshot: LastSnapshot) => void): this;
	on(type: ConsoleEventTypes.ASK_LAST_SNAPSHOT, listener: (onData: (lastSnapshot: LastSnapshot) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_LAST_SNAPSHOT, listener: (onData: (lastSnapshot: LastSnapshot) => void) => void): this;

	fire(type: ConsoleEventTypes.ASK_FAVORITE, onData: (favorite: Favorite) => void): this;
	on(type: ConsoleEventTypes.ASK_FAVORITE, listener: (onData: (favorite: Favorite) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_FAVORITE, listener: (onData: (favorite: Favorite) => void) => void): this;

	fire(type: ConsoleEventTypes.ASK_CONNECTED_SPACES, onData: (connectedSpaces: Array<ConnectedSpace>) => void): this;
	on(type: ConsoleEventTypes.ASK_CONNECTED_SPACES, listener: (onData: (connectedSpaces: Array<ConnectedSpace>) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_CONNECTED_SPACES, listener: (onData: (connectedSpaces: Array<ConnectedSpace>) => void) => void): this;

	fire(type: ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, onData: (connectedSpaceGraphics: Array<ConnectedSpaceGraphics>) => void): this;
	on(type: ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, listener: (onData: (connectedSpaceGraphics: Array<ConnectedSpaceGraphics>) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, listener: (onData: (connectedSpaceGraphics: Array<ConnectedSpaceGraphics>) => void) => void): this;

	fire(type: ConsoleEventTypes.ASK_DASHBOARDS, onData: (dashboards: Array<Dashboard>) => void): this;
	on(type: ConsoleEventTypes.ASK_DASHBOARDS, listener: (onData: (dashboards: Array<Dashboard>) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_DASHBOARDS, listener: (onData: (dashboards: Array<Dashboard>) => void) => void): this;

	fire(type: ConsoleEventTypes.ASK_AVAILABLE_SPACES, onData: (availableSpaces: Array<AvailableSpaceInConsole>) => void): this;
	on(type: ConsoleEventTypes.ASK_AVAILABLE_SPACES, listener: (onData: (availableSpaces: Array<AvailableSpaceInConsole>) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_AVAILABLE_SPACES, listener: (onData: (availableSpaces: Array<AvailableSpaceInConsole>) => void) => void): this;

	fire(type: ConsoleEventTypes.ASK_AVAILABLE_TOPICS, onData: (availableTopics: Array<Topic>) => void): this;
	on(type: ConsoleEventTypes.ASK_AVAILABLE_TOPICS, listener: (onData: (availableTopics: Array<Topic>) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_AVAILABLE_TOPICS, listener: (onData: (availableTopics: Array<Topic>) => void) => void): this;

	fire(type: ConsoleEventTypes.ASK_ENUM, enumId: EnumId, onData: (enumeration?: Enum) => void): this;
	on(type: ConsoleEventTypes.ASK_ENUM, listener: (enumId: EnumId, onData: (enumeration?: Enum) => void) => void): this;
	off(type: ConsoleEventTypes.ASK_ENUM, listener: (enumId: EnumId, onData: (enumeration?: Enum) => void) => void): this;
}