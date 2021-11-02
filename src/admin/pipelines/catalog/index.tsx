import {savePipelinesGraphics} from '@/services/data/tuples/pipeline';
import {Pipeline, PipelinesGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {generateUuid, isFakedUuidForGraphics} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {loadAdminLastSnapshot, saveAdminLastSnapshot} from '@/services/local-persist/db';
import React, {useEffect, useState} from 'react';
import {useAdminCacheEventBus} from '../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';
import {usePipelinesEventBus} from '../pipelines-event-bus';
import {PipelinesEventTypes} from '../pipelines-event-bus-types';
import {CatalogBody} from './body';
import {CatalogEventBusProvider, useCatalogEventBus} from './catalog-event-bus';
import {CatalogEventTypes} from './catalog-event-bus-types';
import {createInitGraphics, transformGraphicsToSave} from './graphics-utils';
import {CatalogHeader} from './header';
import {AssembledPipelinesGraphics, CatalogData} from './types';

const saveAndPutIntoState = async (
	currentGraphics: PipelinesGraphics,
	assembled: AssembledPipelinesGraphics,
	allGraphics: Array<PipelinesGraphics>,
	notify: (graphics: PipelinesGraphics) => void
): Promise<PipelinesGraphics> => {
	if (isFakedUuidForGraphics(currentGraphics)) {
		currentGraphics = transformGraphicsToSave(assembled);
		await savePipelinesGraphics(currentGraphics);
		if (allGraphics.filter(g => g.pipelineGraphId === currentGraphics!.pipelineGraphId).length === 0) {
			allGraphics.push(currentGraphics);
		}
		notify(currentGraphics);
	}
	return currentGraphics;
};
const PipelineCatalogContainer = () => {
	const {fire: fireCache} = useAdminCacheEventBus();
	const {fire: firePipelines} = usePipelinesEventBus();
	const {on, off} = useCatalogEventBus();
	const [data, setData] = useState<CatalogData>({
		initialized: false,
		topics: [],
		pipelines: [],
		allGraphics: []
	});

	useEffect(() => {
		(async () => {
			const [topics, pipelines, allGraphics] = await Promise.all([
				new Promise<Array<Topic>>(resolve => {
					firePipelines(PipelinesEventTypes.ASK_TOPICS, (topics: Array<Topic>) => {
						resolve(topics);
					});
				}),
				new Promise<Array<Pipeline>>(resolve => {
					firePipelines(PipelinesEventTypes.ASK_PIPELINES, (pipelines: Array<Pipeline>) => {
						resolve(pipelines);
					});
				}),
				new Promise<Array<PipelinesGraphics>>(resolve => {
					firePipelines(PipelinesEventTypes.ASK_GRAPHICS, (allGraphics: Array<PipelinesGraphics>) => {
						resolve(allGraphics);
					});
				})
			]);

			const lastSnapshot = await loadAdminLastSnapshot();
			const lastPipelineGraphId = lastSnapshot.lastPipelineGraphId;
			let currentGraphics = allGraphics.find(g => g.pipelineGraphId === lastPipelineGraphId);
			if (!currentGraphics) {
				currentGraphics = allGraphics[0];
			}
			if (!currentGraphics) {
				currentGraphics = {
					pipelineGraphId: generateUuid(),
					name: 'Pipelines Group',
					topics: [],
					createTime: getCurrentTime(),
					lastModified: getCurrentTime()
				};
			}
			const assembled = createInitGraphics({
				topics,
				graphics: currentGraphics!,
				renderAll: allGraphics.length < 2
			});
			currentGraphics = await saveAndPutIntoState(currentGraphics, assembled, allGraphics, (graphics: PipelinesGraphics) => {
				fireCache(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, graphics);
			});

			await saveAdminLastSnapshot({lastPipelineGraphId: currentGraphics.pipelineGraphId});
			setData({
				initialized: true,
				topics, pipelines,
				allGraphics: allGraphics,
				graphics: assembled
			});
		})();
	}, [firePipelines, fireCache]);
	useEffect(() => {
		const onSwitchGraphics = async (graphics: PipelinesGraphics) => {
			await saveAdminLastSnapshot({lastPipelineGraphId: graphics.pipelineGraphId});
			// just render exists topics
			// switch graphics may lead by create a new one
			// in this case, data might not be store in cache instantly
			// so build state by myself instead of ask from cache
			setData(data => {
				return {
					...data,
					allGraphics: [
						graphics,
						...data.allGraphics.filter(g => g.pipelineGraphId !== graphics.pipelineGraphId)
					],
					graphics: createInitGraphics({topics: data.topics, graphics, renderAll: false})
				};
			});
		};
		on(CatalogEventTypes.SWITCH_GRAPHICS, onSwitchGraphics);
		return () => {
			off(CatalogEventTypes.SWITCH_GRAPHICS, onSwitchGraphics);
		};
	}, [on, off]);
	useEffect(() => {
		const onNameChanged = (assembled: AssembledPipelinesGraphics) => {
			// synchronize name to state
			data.graphics!.name = assembled.name;
		};
		on(CatalogEventTypes.NAME_CHANGED, onNameChanged);
		return () => {
			off(CatalogEventTypes.NAME_CHANGED, onNameChanged);
		};
	}, [on, off, data.graphics]);
	useEffect(() => {
		const onTopicMoved = () => {
			const graphics = transformGraphicsToSave(data.graphics!);
			const exists = data.allGraphics.find(g => g.pipelineGraphId === graphics.pipelineGraphId);
			if (exists) {
				// sync topics to state
				exists.topics = graphics.topics;
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		};
	}, [on, off, data.graphics, data.allGraphics]);
	useEffect(() => {
		const onGraphicsRemoved = async (removed: AssembledPipelinesGraphics) => {
			const allGraphics = data.allGraphics.filter(g => g.pipelineGraphId !== removed.pipelineGraphId);
			let graphics = allGraphics[0] ?? {
				pipelineGraphId: generateUuid(),
				name: 'Pipelines Group',
				topics: [],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			const assembled = createInitGraphics({
				topics: data.topics,
				graphics,
				renderAll: allGraphics.length < 2
			});
			graphics = await saveAndPutIntoState(graphics, assembled, allGraphics, (graphics: PipelinesGraphics) => {
				fireCache(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, graphics);
			});

			await saveAdminLastSnapshot({lastPipelineGraphId: graphics.pipelineGraphId});
			setData(data => {
				return {
					...data,
					allGraphics,
					graphics: createInitGraphics({topics: data.topics, graphics, renderAll: allGraphics.length < 2})
				};
			});
		};
		on(CatalogEventTypes.GRAPHICS_REMOVED, onGraphicsRemoved);
		return () => {
			off(CatalogEventTypes.GRAPHICS_REMOVED, onGraphicsRemoved);
		};
	}, [on, off, fireCache, data.allGraphics, data.topics]);

	return <>
		{data.graphics
			? <CatalogHeader topics={data.topics} allGraphics={data.allGraphics} graphics={data.graphics}/>
			: null}
		{data.graphics ? <CatalogBody topics={data.topics} pipelines={data.pipelines} graphics={data.graphics}/> : null}
	</>;
};

export const PipelinesCatalog = () => {
	return <CatalogEventBusProvider>
		<PipelineCatalogContainer/>
	</CatalogEventBusProvider>;
};