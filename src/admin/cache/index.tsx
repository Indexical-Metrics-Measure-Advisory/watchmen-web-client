import React, {useEffect, useState} from 'react';
import {clearAdminData, loadAdminData, prepareAdminDB} from '@/local-persist';
import {useAdminCacheEventBus} from './cache-event-bus';
import {AdminCacheData} from '@/local-persist/types';
import {AdminCacheEventTypes} from './cache-event-bus-types';
import {EventTypes} from '@/events/types';
import {useEventBus} from '@/events/event-bus';
import {Pipeline, PipelinesGraphics} from '@/services/tuples/pipeline-types';
import {
	deleteAdminPipelineGraphics,
	saveAdminPipeline,
	saveAdminPipelinesGraphics,
	saveAdminTopic
} from '@/local-persist/db';
import {Topic} from '@/services/tuples/topic-types';

export interface CacheState {
	initialized: boolean;
	data?: AdminCacheData;
}

export const AdminCache = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useAdminCacheEventBus();
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
			setData(data => {
				return {
					initialized: data.initialized,
					data: {
						topics: data.data?.topics || [],
						pipelines: [
							pipeline,
							// eslint-disable-next-line
							...(data.data?.pipelines || []).filter(p => p.pipelineId != pipeline.pipelineId)
						],
						graphics: data.data?.graphics || []
					}
				};
			});
		};
		const onSaveTopic = async (topic: Topic) => {
			await saveAdminTopic(topic);
			setData(data => {
				return {
					initialized: data.initialized,
					data: {
						topics: [
							topic,
							// eslint-disable-next-line
							...(data.data?.topics || []).filter(t => t.topicId != topic.topicId)
						],
						pipelines: data.data?.pipelines || [],
						graphics: data.data?.graphics || []
					}
				};
			});
		};
		const onSavePipelinesGraphics = async (graphics: PipelinesGraphics) => {
			await saveAdminPipelinesGraphics(graphics);
			setData(data => {
				return {
					initialized: data.initialized,
					data: {
						topics: data.data?.topics || [],
						pipelines: data.data?.pipelines || [],
						graphics: [
							graphics,
							// eslint-disable-next-line
							...(data.data?.graphics || []).filter(g => g.pipelineGraphId != graphics.pipelineGraphId)
						]
					}
				};
			});
		};
		const onRemovePipelinesGraphics = async (pipelineGraphId: string) => {
			await deleteAdminPipelineGraphics(pipelineGraphId);
			setData(data => {
				return {
					initialized: data.initialized,
					data: {
						topics: data.data?.topics || [],
						pipelines: data.data?.pipelines || [],
						// eslint-disable-next-line
						graphics: (data.data?.graphics || []).filter(g => g.pipelineGraphId != pipelineGraphId)
					}
				};
			});
		};
		on(AdminCacheEventTypes.SAVE_PIPELINE, onSavePipeline);
		on(AdminCacheEventTypes.SAVE_TOPIC, onSaveTopic);
		on(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, onSavePipelinesGraphics);
		on(AdminCacheEventTypes.REMOVE_PIPELINES_GRAPHICS, onRemovePipelinesGraphics);
		on(AdminCacheEventTypes.TOPIC_LOADED, onSaveTopic);
		on(AdminCacheEventTypes.PIPELINE_LOADED, onSavePipeline);
		return () => {
			off(AdminCacheEventTypes.SAVE_PIPELINE, onSavePipeline);
			off(AdminCacheEventTypes.SAVE_TOPIC, onSaveTopic);
			off(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, onSavePipelinesGraphics);
			off(AdminCacheEventTypes.REMOVE_PIPELINES_GRAPHICS, onRemovePipelinesGraphics);
			off(AdminCacheEventTypes.TOPIC_LOADED, onSaveTopic);
			off(AdminCacheEventTypes.PIPELINE_LOADED, onSavePipeline);
		};
	}, [on, off]);

	return <></>;
};