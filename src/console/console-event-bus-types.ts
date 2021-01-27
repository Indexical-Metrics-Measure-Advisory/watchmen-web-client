import { ConsoleSettings } from '../services/console/settings-types';

export enum ConsoleEventTypes {
	DO_LOAD_SETTINGS = 'do-load-settings',
	SETTINGS_LOADED = 'settings-loaded'
}

export interface ConsoleEventBus {
	fire(type: ConsoleEventTypes.DO_LOAD_SETTINGS): this;
	on(type: ConsoleEventTypes.DO_LOAD_SETTINGS, listener: () => void): this;
	off(type: ConsoleEventTypes.DO_LOAD_SETTINGS, listener: () => void): this;

	fire(type: ConsoleEventTypes.SETTINGS_LOADED, settings: ConsoleSettings): this;
	on(type: ConsoleEventTypes.SETTINGS_LOADED, listener: (settings: ConsoleSettings) => void): this;
	off(type: ConsoleEventTypes.SETTINGS_LOADED, listener: (settings: ConsoleSettings) => void): this;
}