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
		dashboards: [],

		lastSnapshot: {
			favoritePin: false,
			language: 'en'
		}
	});

	useEffect(() => {
		if (!holdSettings.initialized) {
			(async () => {
				const settings = await fetchConsoleSettingsData();
				const { favorite, ...rest } = settings;
				setTimeout(() => {
					setHoldSettings({ initialized: true, ...rest });
					fire(ConsoleEventTypes.SETTINGS_LOADED, settings);
				}, 10000);
			})();
		}
	}, [ fire, holdSettings.initialized ]);
	useEffect(() => {
		const onAskSettingsLoaded = () => {
			fire(ConsoleEventTypes.REPLY_SETTINGS_LOADED, holdSettings.initialized);
		};
		const onAskLastSnapshot = () => {
			fire(ConsoleEventTypes.REPLY_LAST_SNAPSHOT, holdSettings.lastSnapshot);
		};
		const onAskConnectedSpaces = () => {
			fire(ConsoleEventTypes.REPLY_CONNECTED_SPACES, holdSettings.connectedSpaces);
		};
		const onAskDashboards = () => {
			fire(ConsoleEventTypes.REPLY_DASHBOARDS, holdSettings.dashboards);
		};

		on(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);
		on(ConsoleEventTypes.ASK_LAST_SNAPSHOT, onAskLastSnapshot);
		on(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
		on(ConsoleEventTypes.ASK_DASHBOARDS, onAskDashboards);
		return () => {
			off(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);
			off(ConsoleEventTypes.ASK_LAST_SNAPSHOT, onAskLastSnapshot);
			off(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
			off(ConsoleEventTypes.ASK_DASHBOARDS, onAskDashboards);
		};
	}, [
		on, off, fire,
		holdSettings.initialized,
		holdSettings.lastSnapshot,
		holdSettings.connectedSpaces, holdSettings.dashboards
	]);

	return <Fragment/>;
};