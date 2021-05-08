import React, {Fragment, useEffect, useState} from 'react';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {fetchConsoleSettingsData} from '../../services/console/settings';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {HoldSettings} from './types';
import {useConnectedSpace} from './use-connected-space';
import {useDashboard} from './use-dashboard';
import {useReplier} from './use-replier';

export const SettingsHolder = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useConsoleEventBus();
	const [holdSettings, setHoldSettings] = useState<HoldSettings>({
		initialized: false,
		connectedSpaces: [],
		connectedSpaceGraphics: [],
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
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchConsoleSettingsData(),
					(settings) => {
						setHoldSettings({initialized: true, ...settings});
						if (settings.lastSnapshot && settings.lastSnapshot.language) {
							fireGlobal(EventTypes.CHANGE_LANGUAGE, settings.lastSnapshot.language);
						}
						fire(ConsoleEventTypes.SETTINGS_LOADED, settings);
					});
			})();
		}
	}, [fire, fireGlobal, holdSettings.initialized]);
	useReplier({holdSettings});

	useDashboard({setHoldSettings});
	useConnectedSpace({setHoldSettings});

	return <Fragment/>;
};