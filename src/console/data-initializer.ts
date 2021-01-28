import { useEffect, useState } from 'react';
import { useForceUpdate } from '../basic-widgets/utils';
import { ConsoleSettings } from '../services/console/settings-types';
import { useConsoleEventBus } from './console-event-bus';
import { ConsoleEventTypes } from './console-event-bus-types';

export const useSettingsLoaded = (onSettingsLoaded: (settings: ConsoleSettings) => void) => {
	const { on, off } = useConsoleEventBus();
	useEffect(() => {
		on(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		return () => {
			off(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		};
	}, [ on, off, onSettingsLoaded ]);
};

export const useSettingsInitialized = (onSettingsInitialized: () => void, frequency: number = 3000) => {
	const { once } = useConsoleEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		once(ConsoleEventTypes.REPLY_SETTINGS_LOADED, (initialized) => {
			if (!initialized) {
				if (frequency > 0) {
					setTimeout(forceUpdate, frequency);
				}
				return;
			}
			onSettingsInitialized();
		}).fire(ConsoleEventTypes.ASK_SETTINGS_LOADED);
	});
};

export const useConsoleSettings = (options: {
	onSettingsLoaded: (settings: ConsoleSettings) => void;
	onSettingsInitialized: () => void;
	frequency?: number
}) => {
	const { onSettingsLoaded, onSettingsInitialized, frequency } = options;
	const [ functions ] = useState({ onSettingsLoaded, onSettingsInitialized });
	useSettingsLoaded(functions.onSettingsLoaded);
	useSettingsInitialized(functions.onSettingsInitialized, frequency);
};