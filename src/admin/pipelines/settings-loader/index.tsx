import React, { Fragment, useEffect, useState } from 'react';
import { fetchPipelinesSettingsData } from '../../../services/pipeline/settings';
import { Pipeline } from '../../../services/tuples/pipeline-types';
import { usePipelinesEventBus } from '../pipelines-event-bus';
import { PipelinesEventTypes } from '../pipelines-event-bus-types';
import { HoldSettings } from './types';
import { useReplier } from './use-replier';

export const SettingsHolder = () => {
	const { on, off, fire } = usePipelinesEventBus();
	const [ holdSettings, setHoldSettings ] = useState<HoldSettings>({
		initialized: false,
		pipelines: [],
		topics: [],
		graphics: { topics: [] }
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
	useEffect(() => {
		const onPipelineAdded = (pipeline: Pipeline) => {
			holdSettings.pipelines.push(pipeline);
		};
		on(PipelinesEventTypes.PIPELINE_ADDED, onPipelineAdded);
		return () => {
			off(PipelinesEventTypes.PIPELINE_ADDED, onPipelineAdded);
		};
	}, [ on, off, holdSettings.pipelines ]);
	useReplier({ holdSettings });

	return <Fragment/>;
};