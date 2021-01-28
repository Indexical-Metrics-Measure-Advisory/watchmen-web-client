import React, { Fragment, useEffect, useState } from 'react';
import { fetchConsoleSettingsData } from '../services/console/settings';
import { ConsoleSettings } from '../services/console/settings-types';
import { useConsoleEventBus } from './console-event-bus';
import { ConsoleEventTypes } from './console-event-bus-types';

interface HoldSettings extends Omit<ConsoleSettings, 'favorite'> {
	initialized: boolean;
}

export const SettingsHolder = () => {
	const { on, off, fire } = useConsoleEventBus();
	const [ holdSettings, setHoldSettings ] = useState<HoldSettings>({
		initialized: false,
		connectedSpaces: [],
		availableSpaces: [],
		availableTopics: [],
		dashboards: []
	});

	useEffect(() => {
		if (!holdSettings.initialized) {
			(async () => {
				const settings = await fetchConsoleSettingsData();
				const { favorite, ...rest } = settings;
				setHoldSettings({ initialized: true, ...rest });
				fire(ConsoleEventTypes.SETTINGS_LOADED, settings);
			})();
		}

		const onAskSettingsLoaded = () => {
			fire(ConsoleEventTypes.REPLY_SETTINGS_LOADED, holdSettings.initialized);
		};
		const onAskConnectedSpaces = () => {
			fire(ConsoleEventTypes.REPLY_CONNECTED_SPACES, holdSettings.connectedSpaces);
		};

		on(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);
		on(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
		return () => {
			off(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);
			off(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
		};
	}, [
		on, off, fire,
		holdSettings.initialized,
		holdSettings.connectedSpaces
	]);

	return <Fragment/>;
};