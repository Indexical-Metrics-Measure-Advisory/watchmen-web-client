import React, {useEffect, useState} from 'react';
import {clearAdminData, loadAdminData, prepareAdminDB} from '../../local-persist';
import {useCacheEventBus} from './cache-event-bus';
import {AdminCacheData} from '../../local-persist/types';
import {AdminCacheEventTypes} from './cache-event-bus-types';
import {EventTypes} from '../../events/types';
import {useEventBus} from '../../events/event-bus';
import {Pipeline, PipelinesGraphics} from '../../services/tuples/pipeline-types';
import {saveAdminPipeline, saveAdminPipelinesGraphics, saveAdminTopic} from '../../local-persist/db';
import {Topic} from '../../services/tuples/topic-types';

export interface CacheState {
	initialized: boolean;
	data?: AdminCacheData;
}

export const AdminCache = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useCacheEventBus();
	const [data, setData] = useState<CacheState>({initialized: false});
	useEffect(() => {
		const onAskDataLoaded = () => fire(AdminCacheEventTypes.REPLY_DATA_LOADED, data.initialized);
		// noinspection TypeScriptValidateTypes
		const onAskData = () => fire(AdminCacheEventTypes.REPLY_DATA, data.data);
		on(AdminCacheEventTypes.ASK_DATA_LOADED, onAskDataLoaded);
		on(AdminCacheEventTypes.ASK_DATA, onAskData);

		if (!data.initialized) {
			prepareAdminDB();
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await loadAdminData(),
				(data) => {
					setData({initialized: true, data});
					fire(AdminCacheEventTypes.DATA_LOADED, data);
				});
		}

		return () => {
			off(AdminCacheEventTypes.ASK_DATA_LOADED, onAskDataLoaded);
			off(AdminCacheEventTypes.ASK_DATA, onAskData);
		};
	}, [fireGlobal, on, off, fire, data.initialized, data.data]);

	useEffect(() => {
		const onAskReload = async () => {
			setData({initialized: false});
			await clearAdminData();
			const data = await loadAdminData();
			setData({initialized: true, data});
			fire(AdminCacheEventTypes.REPLY_RELOAD);
		};
		on(AdminCacheEventTypes.ASK_RELOAD, onAskReload);
		return () => {
			off(AdminCacheEventTypes.ASK_RELOAD, onAskReload);
		};
	}, [on, off, fire]);

	useEffect(() => {
		const onSavePipeline = async (pipeline: Pipeline) => {
			await saveAdminPipeline(pipeline);
			if (data.data) {
				data.data.pipelines = [
					pipeline,
					// eslint-disable-next-line
					...(data.data.pipelines || []).filter(p => p.pipelineId != pipeline.pipelineId)
				];
			}
		};
		const onSaveTopic = async (topic: Topic) => {
			await saveAdminTopic(topic);
			if (data.data) {
				data.data.topics = [
					topic,
					// eslint-disable-next-line
					...(data.data.topics || []).filter(t => t.topicId != topic.topicId)
				];
			}
		};
		const onSavePipelinesGraphics = async (graphics: PipelinesGraphics) => {
			await saveAdminPipelinesGraphics(graphics);
			if (data.data) {
				data.data.graphics = graphics;
			}
		};
		on(AdminCacheEventTypes.SAVE_PIPELINE, onSavePipeline);
		on(AdminCacheEventTypes.SAVE_TOPIC, onSaveTopic);
		on(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, onSavePipelinesGraphics);
		return () => {
			off(AdminCacheEventTypes.SAVE_PIPELINE, onSavePipeline);
			off(AdminCacheEventTypes.SAVE_TOPIC, onSaveTopic);
			off(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, onSavePipelinesGraphics);
		};
	});

	return <></>;
};