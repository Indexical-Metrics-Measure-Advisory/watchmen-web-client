import React, { Fragment, useEffect, useState } from 'react';
import { useEventBus } from '../events/event-bus';
import { EventTypes } from '../events/types';
import { fetchConsoleSettingsData } from '../services/console/settings';
import { ConsoleSettings } from '../services/console/settings-types';
import { Dashboard } from '../services/tuples/dashboard-types';
import { useConsoleEventBus } from './console-event-bus';
import { ConsoleEventTypes } from './console-event-bus-types';

interface HoldSettings extends ConsoleSettings {
	initialized: boolean;
}

export const SettingsHolder = () => {
	const { fire: fireGlobal } = useEventBus();
	const { on, off, fire } = useConsoleEventBus();
	const [ holdSettings, setHoldSettings ] = useState<HoldSettings>({
		initialized: false,
		connectedSpaces: [],
		availableSpaces: [],
		availableTopics: [],
		dashboards: [],

		favorite: {
			connectedSpaceIds: [],
			dashboardIds: []
		},
		lastSnapshot: {
			favoritePin: false,
			language: 'en'
		}
	});

	useEffect(() => {
		if (!holdSettings.initialized) {
			(async () => {
				const settings = await fetchConsoleSettingsData();
				setHoldSettings({ initialized: true, ...settings });
				if (settings.lastSnapshot && settings.lastSnapshot.language) {
					fireGlobal(EventTypes.CHANGE_LANGUAGE, settings.lastSnapshot.language);
				}
				fire(ConsoleEventTypes.SETTINGS_LOADED, settings);
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
		const onAskFavorite = () => {
			fire(ConsoleEventTypes.REPLY_FAVORITE, holdSettings.favorite);
		};
		const onAskConnectedSpaces = () => {
			fire(ConsoleEventTypes.REPLY_CONNECTED_SPACES, holdSettings.connectedSpaces);
		};
		const onAskDashboards = () => {
			fire(ConsoleEventTypes.REPLY_DASHBOARDS, holdSettings.dashboards);
		};

		on(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);

		on(ConsoleEventTypes.ASK_LAST_SNAPSHOT, onAskLastSnapshot);
		on(ConsoleEventTypes.ASK_FAVORITE, onAskFavorite);

		on(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
		on(ConsoleEventTypes.ASK_DASHBOARDS, onAskDashboards);
		return () => {
			off(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);

			off(ConsoleEventTypes.ASK_LAST_SNAPSHOT, onAskLastSnapshot);
			off(ConsoleEventTypes.ASK_FAVORITE, onAskFavorite);

			off(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
			off(ConsoleEventTypes.ASK_DASHBOARDS, onAskDashboards);
		};
	}, [
		on, off, fire,
		holdSettings.initialized,
		holdSettings.lastSnapshot, holdSettings.favorite,
		holdSettings.connectedSpaces, holdSettings.dashboards
	]);
	useEffect(() => {
		const onDashboardCreated = (dashboard: Dashboard) => {
			// refresh is unnecessary
			setHoldSettings({ ...holdSettings, dashboards: [ ...holdSettings.dashboards, dashboard ] });
		};
		on(ConsoleEventTypes.DASHBOARD_CREATED, onDashboardCreated);
		return () => {
			off(ConsoleEventTypes.DASHBOARD_CREATED, onDashboardCreated);
		};
	}, [ on, off ]);

	return <Fragment/>;
};