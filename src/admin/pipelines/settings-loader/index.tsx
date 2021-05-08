import React, {Fragment, useEffect, useState} from 'react';
import {useEventBus} from '../../../events/event-bus';
import {EventTypes} from '../../../events/types';
import {fetchPipelinesSettingsData} from '../../../services/pipeline/settings';
import {Pipeline, PipelinesGraphics} from '../../../services/tuples/pipeline-types';
import {usePipelinesEventBus} from '../pipelines-event-bus';
import {PipelinesEventTypes} from '../pipelines-event-bus-types';
import {HoldSettings} from './types';
import {useReplier} from './use-replier';

export const SettingsHolder = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = usePipelinesEventBus();
	const [holdSettings, setHoldSettings] = useState<HoldSettings>({
		initialized: false,
		pipelines: [],
		topics: [],
		graphics: {topics: []}
	});

	useEffect(() => {
		if (!holdSettings.initialized) {
			(async () => {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchPipelinesSettingsData(),
					(settings) => {
						setHoldSettings({initialized: true, ...settings});
						fire(PipelinesEventTypes.SETTINGS_LOADED, settings);
					});
			})();
		}
	}, [fire, fireGlobal, holdSettings.initialized]);
	useEffect(() => {
		const onPipelineAdded = (pipeline: Pipeline) => {
			holdSettings.pipelines.push(pipeline);
		};
		on(PipelinesEventTypes.PIPELINE_ADDED, onPipelineAdded);
		return () => {
			off(PipelinesEventTypes.PIPELINE_ADDED, onPipelineAdded);
		};
	}, [on, off, holdSettings.pipelines]);
	useEffect(() => {
		const onGraphicsChanged = (graphics: PipelinesGraphics) => {
			holdSettings.graphics = graphics;
		};
		on(PipelinesEventTypes.GRAPHICS_CHANGED, onGraphicsChanged);
		return () => {
			off(PipelinesEventTypes.GRAPHICS_CHANGED, onGraphicsChanged);
		};
	}, [on, off, holdSettings]);
	useReplier({holdSettings});

	return <Fragment/>;
};