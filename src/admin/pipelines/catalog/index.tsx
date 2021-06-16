import React, {useEffect, useState} from 'react';
import {CatalogBody} from './body';
import {CatalogEventBusProvider, useCatalogEventBus} from './catalog-event-bus';
import {CatalogHeader} from './header';
import {PipelinesEventTypes} from '../pipelines-event-bus-types';
import {Topic} from '../../../services/tuples/topic-types';
import {Pipeline, PipelinesGraphics} from '../../../services/tuples/pipeline-types';
import {loadAdminLastSnapshot, saveAdminLastSnapshot} from '../../../local-persist/db';
import {createInitGraphics, transformGraphicsToSave} from './graphics-utils';
import {usePipelinesEventBus} from '../pipelines-event-bus';
import {CatalogData} from './types';
import {CatalogEventTypes} from './catalog-event-bus-types';
import {generateUuid, isFakedUuidForGraphics} from '../../../services/tuples/utils';
import {getCurrentTime} from '../../../services/utils';
import {savePipelinesGraphics} from '../../../services/tuples/pipeline';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';
import {useAdminCacheEventBus} from '../../cache/cache-event-bus';

const PipelineCatalogContainer = () => {
	const {fire: fireCache} = useAdminCacheEventBus();
	const {once: oncePipelines} = usePipelinesEventBus();
	const {on, off} = useCatalogEventBus();
	const [data, setData] = useState<CatalogData>({initialized: false, topics: [], pipelines: [], allGraphics: []});

	useEffect(() => {
		oncePipelines(PipelinesEventTypes.REPLY_TOPICS, (topics: Array<Topic>) => {
			oncePipelines(PipelinesEventTypes.REPLY_PIPELINES, (pipelines: Array<Pipeline>) => {
				oncePipelines(PipelinesEventTypes.REPLY_GRAPHICS, async (graphics: Array<PipelinesGraphics>) => {
					const lastSnapshot = await loadAdminLastSnapshot();
					const lastPipelineGraphId = lastSnapshot.lastPipelineGraphId;
					let currentGraphics = graphics.find(g => g.pipelineGraphId === lastPipelineGraphId);
					if (!currentGraphics) {
						currentGraphics = graphics[0];
					}
					let renderAll = false;
					if (!currentGraphics) {
						currentGraphics = {
							pipelineGraphId: generateUuid(),
							name: 'Pipelines Group',
							topics: [],
							createTime: getCurrentTime(),
							lastModifyTime: getCurrentTime()
						};
						renderAll = true;
					}
					const assembled = createInitGraphics({
						topics,
						graphics: currentGraphics!,
						renderAll
					});
					if (isFakedUuidForGraphics(currentGraphics)) {
						currentGraphics = transformGraphicsToSave(assembled);
						await savePipelinesGraphics(currentGraphics);
						if (graphics.filter(g => g.pipelineGraphId === currentGraphics!.pipelineGraphId).length === 0) {
							graphics.push(currentGraphics);
						}
						fireCache(AdminCacheEventTypes.SAVE_PIPELINES_GRAPHICS, currentGraphics);
					}

					await saveAdminLastSnapshot({lastPipelineGraphId: currentGraphics.pipelineGraphId});
					setData({
						initialized: true,
						topics, pipelines,
						allGraphics: graphics,
						graphics: assembled
					});
				}).fire(PipelinesEventTypes.ASK_GRAPHICS);
			}).fire(PipelinesEventTypes.ASK_PIPELINES);
		}).fire(PipelinesEventTypes.ASK_TOPICS);
	}, [oncePipelines, fireCache]);
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