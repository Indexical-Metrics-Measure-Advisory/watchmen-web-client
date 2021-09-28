import {DataSource} from '@/services/data/tuples/data-source-types';
import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {Pipeline, PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {clearAdminData, loadAdminData, prepareAdminDB} from '@/services/local-persist';
import {
	deleteAdminPipelineGraphics,
	saveAdminPipeline,
	saveAdminPipelinesGraphics,
	saveAdminTopic
} from '@/services/local-persist/db';
import {AdminCacheData} from '@/services/local-persist/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect, useState} from 'react';
import {useAdminCacheEventBus} from './cache-event-bus';
import {AdminCacheEventTypes} from './cache-event-bus-types';

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
						graphics: data.data?.graphics || [],
						dataSources: data.data?.dataSources || [],
						externalWriters: data.data?.externalWriters || []
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
						graphics: data.data?.graphics || [],
						dataSources: data.data?.dataSources || [],
						externalWriters: data.data?.externalWriters || []
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
						],
						dataSources: data.data?.dataSources || [],
						externalWriters: data.data?.externalWriters || []
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
						graphics: (data.data?.graphics || []).filter(g => g.pipelineGraphId != pipelineGraphId),
						dataSources: data.data?.dataSources || [],
						externalWriters: data.data?.externalWriters || []
					}
				};
			});
		};
		const onSaveDataSource = async (dataSource: DataSource) => {
			setData(data => {
				return {
					initialized: data.initialized,
					data: {
						topics: data.data?.topics || [],
						pipelines: data.data?.pipelines || [],
						graphics: data.data?.graphics || [],
						dataSources: [
							dataSource,
							// eslint-disable-next-line
							...(data.data?.dataSources || []).filter(w => w.dataSourceId != dataSource.dataSourceId)
						],
						externalWriters: data.data?.externalWriters || []
					}
				};
			});
		};
		const onSaveExternalWriter = async (writer: ExternalWriter) => {
			setData(data => {
				return {
					initialized: data.initialized,
					data: {
						topics: data.data?.topics || [],
						pipelines: data.data?.pipelines || [],
						graphics: data.data?.graphics || [],
						dataSources: data.data?.dataSources || [],
						externalWriters: [
							writer,
							// eslint-disable-next-line
							...(data.data?.externalWriters || []).filter(w => w.writerId != writer.writerId)
						]
					}
				};
			});
		};

		on(AdminCacheEventTypes.SAVE_PIPELINE, onSavePipeline);
		on(AdminCacheEventTypes.SAVE_TOPIC, onSaveTopic);
		on(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, onSavePipelinesGraphics);
		on(AdminCacheEventTypes.REMOVE_PIPELINES_GRAPHICS, onRemovePipelinesGraphics);
		on(AdminCacheEventTypes.SAVE_DATA_SOURCE, onSaveDataSource);
		on(AdminCacheEventTypes.SAVE_EXTERNAL_WRITER, onSaveExternalWriter);
		on(AdminCacheEventTypes.TOPIC_LOADED, onSaveTopic);
		on(AdminCacheEventTypes.PIPELINE_LOADED, onSavePipeline);
		return () => {
			off(AdminCacheEventTypes.SAVE_PIPELINE, onSavePipeline);
			off(AdminCacheEventTypes.SAVE_TOPIC, onSaveTopic);
			off(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, onSavePipelinesGraphics);
			off(AdminCacheEventTypes.REMOVE_PIPELINES_GRAPHICS, onRemovePipelinesGraphics);
			off(AdminCacheEventTypes.SAVE_DATA_SOURCE, onSaveDataSource);
			off(AdminCacheEventTypes.SAVE_EXTERNAL_WRITER, onSaveExternalWriter);
			off(AdminCacheEventTypes.TOPIC_LOADED, onSaveTopic);
			off(AdminCacheEventTypes.PIPELINE_LOADED, onSavePipeline);
		};
	}, [on, off]);

	return <></>;
};