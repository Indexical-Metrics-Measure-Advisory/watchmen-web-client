import React, { Fragment, useEffect, useState } from 'react';
import { fetchPipelinesSettingsData } from '../../../services/pipeline/settings';
import { usePipelinesEventBus } from '../pipelines-event-bus';
import { PipelinesEventTypes } from '../pipelines-event-bus-types';
import { HoldSettings } from './types';
import { useReplier } from './use-replier';

export const SettingsHolder = () => {
	const { fire } = usePipelinesEventBus();
	const [ holdSettings, setHoldSettings ] = useState<HoldSettings>({
		initialized: false,
		pipelines: [],
		topics: []
	});

	useEffect(() => {
		if (!holdSettings.initialized) {
			(async () => {
				const settings = await fetchPipelinesSettingsData();
				setHoldSettings({ initialized: true, ...settings });
				fire(PipelinesEventTypes.SETTINGS_LOADED, settings);
			})();
		}
	}, [ fire, holdSettings.initialized ]);
	useReplier({ holdSettings });

	return <Fragment/>;
};