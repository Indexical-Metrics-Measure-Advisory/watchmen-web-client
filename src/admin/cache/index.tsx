import {DataSource} from '@/services/data/tuples/data-source-types';
import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {Pipeline, PipelinesGraphics, PipelinesGraphicsId} from '@/services/data/tuples/pipeline-types';
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
import React, {Fragment, useEffect, useState} from 'react';
import {useAdminCacheEventBus} from './cache-event-bus';
import {AdminCacheEventTypes} from './cache-event-bus-types';

export interface CacheState {
	initialized: boolean;
	data?: AdminCacheData;
}

type X = Pipeline | Topic | DataSource | ExternalWriter | PipelinesGraphics;

const replaceOrAppend = <T extends X>(element: T, elementToBeRemoved: (e: T) => boolean, array?: Array<T>): Array<T> => {
	array = array || [];
	const existingIndex = array.findIndex(elementToBeRemoved);
	if (existingIndex !== -1) {
		array.splice(existingIndex, 1, element);
	} else {
		array.push(element);
	}

	return array;
};

export const AdminCache = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useAdminCacheEventBus();
	const [data, setData] = useState<CacheState>({initialized: false});
	useEffect(() => {
		const onAskDataLoaded = (onDataLoadedGot: (loaded: boolean) => void) => {
			onDataLoadedGot(data.initialized);
		};
		// noinspection TypeScriptValidateTypes
		const onAskData = (onData: (data?: AdminCacheData) => void) => {
			// share memories
			onData(data.data);
		};
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
		const onAskReload = async (onReloaded: () => void) => {
			await clearAdminData();
			const data = await loadAdminData();
			setData({initialized: true, data});
			onReloaded();
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
						// eslint-disable-next-line
						pipelines: replaceOrAppend<Pipeline>(pipeline, p => p.pipelineId == pipeline.pipelineId, data.data?.pipelines),
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
						// eslint-disable-next-line
						topics: replaceOrAppend<Topic>(topic, t => t.topicId == topic.topicId, data.data?.topics),
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
						// eslint-disable-next-line
						graphics: replaceOrAppend<PipelinesGraphics>(graphics, g => g.pipelineGraphId == graphics.pipelineGraphId, data.data?.graphics),
						dataSources: data.data?.dataSources || [],
						externalWriters: data.data?.externalWriters || []
					}
				};
			});
		};
		const onRemovePipelinesGraphics = async (pipelineGraphId: PipelinesGraphicsId) => {
			await deleteAdminPipelineGraphics(pipelineGraphId);
			setData(data => {
				return {
					initialized: data.initialized,
					data: {
						topics: data.data?.topics || [],
						pipelines: data.data?.pipelines || [],
						// eslint-disable-next-line
						graphics: (() => {
							const array = data.data?.graphics || [];
							// eslint-disable-next-line
							const index = array.findIndex(g => g.pipelineGraphId == pipelineGraphId);
							if (index !== -1) {
								array.splice(index, 1);
							}
							return array;
						})(),
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
						// eslint-disable-next-line
						dataSources: replaceOrAppend<DataSource>(dataSource, ds => ds.dataSourceId == dataSource.dataSourceId, data.data?.dataSources),
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
						// eslint-disable-next-line
						externalWriters: replaceOrAppend<ExternalWriter>(writer, w => w.writerId == writer.writerId, data.data?.externalWriters)
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

	return <Fragment/>;
};