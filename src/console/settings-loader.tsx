import React, { Fragment, useEffect } from 'react';
import { fetchConsoleSettingsData } from '../services/console/settings';
import { useConsoleEventBus } from './console-event-bus';
import { ConsoleEventTypes } from './console-event-bus-types';

export const SettingsLoader = () => {
	const { fire } = useConsoleEventBus();
	useEffect(() => {
		(async () => {
			const settings = await fetchConsoleSettingsData();
			fire(ConsoleEventTypes.SETTINGS_LOADED, settings);
		})();
	}, [ fire ]);

	return <Fragment/>;
};