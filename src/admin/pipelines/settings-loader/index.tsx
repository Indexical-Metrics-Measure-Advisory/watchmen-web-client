import {Pipeline, PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {AdminCacheData} from '@/services/local-persist/types';
import React, {Fragment, useEffect, useState} from 'react';
import {useAdminCacheEventBus} from '../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';
import {usePipelinesEventBus} from '../pipelines-event-bus';
import {PipelinesEventTypes} from '../pipelines-event-bus-types';
import {HoldSettings} from './types';
import {useReplier} from './use-replier';

export const SettingsHolder = () => {
	const {fire: fireCache} = useAdminCacheEventBus();
	const {on, off, fire} = usePipelinesEventBus();
	const [holdSettings, setHoldSettings] = useState<HoldSettings>({
		initialized: false,
		pipelines: [],
		topics: [],
		// generate a fake graphics to defend the scenario which has no graphics yet
		graphics: [{
			pipelineGraphId: generateUuid(),
			name: '',
			topics: [],
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}]
	});

	useEffect(() => {
		if (!holdSettings.initialized) {
			const askData = () => {
				fireCache(AdminCacheEventTypes.ASK_DATA_LOADED, (loaded) => {
					if (loaded) {
						fireCache(AdminCacheEventTypes.ASK_DATA, (data?: AdminCacheData) => {
							setHoldSettings({initialized: true, ...data!});
							fire(PipelinesEventTypes.SETTINGS_LOADED, data!);
						});
					} else {
						setTimeout(() => askData(), 100);
					}
				});
			};
			askData();
		}
	}, [fire, fireCache, holdSettings.initialized]);
	useEffect(() => {
		const onAskSettingsLoaded = (onSettingsLoadedGet: (loaded: boolean) => void) => {
			onSettingsLoadedGet(holdSettings.initialized);
		};
		on(PipelinesEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);
		return () => {
			off(PipelinesEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);
		};
	}, [fire, on, off, holdSettings.initialized]);
	useEffect(() => {
		// handle pipeline added event, add into hold settings
		// since hold settings also is state in AdminCache, which means memory of AdminCache is updated at the same time
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
			holdSettings.graphics = [
				graphics,
				// eslint-disable-next-line
				...holdSettings.graphics.filter(g => g.pipelineGraphId != graphics.pipelineGraphId)
			];
		};
		on(PipelinesEventTypes.GRAPHICS_CHANGED, onGraphicsChanged);
		return () => {
			off(PipelinesEventTypes.GRAPHICS_CHANGED, onGraphicsChanged);
		};
	}, [on, off, holdSettings]);
	useReplier({holdSettings});

	return <Fragment/>;
};