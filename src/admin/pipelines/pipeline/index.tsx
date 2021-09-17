import {Router} from '@/routes/types';
import {fetchPipeline} from '@/services/data/tuples/pipeline';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useAdminCacheEventBus} from '../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';
import {usePipelinesEventBus} from '../pipelines-event-bus';
import {PipelinesEventTypes} from '../pipelines-event-bus-types';
import {PipelineBody} from './body';
import {PipelineDataSaver} from './data-saver';
import {PipelineHeader} from './header';
import {PipelineEventBusProvider} from './pipeline-event-bus';
import {PipelineState} from './state';

interface WorkbenchData {
	topics: Array<Topic>;
	pipeline?: Pipeline;
}

export const PipelineWorkbench = () => {
	const {pipelineId} = useParams<{ pipelineId: string }>();

	const history = useHistory();
	const {once: onceGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
	const {once: oncePipelines} = usePipelinesEventBus();
	const [data, setData] = useState<WorkbenchData>({topics: []});
	useEffect(() => {
		oncePipelines(PipelinesEventTypes.REPLY_TOPICS, async (topics: Array<Topic>) => {
			const pipeline = await (async () => {
				return new Promise<Pipeline | undefined>(async resolve => {
					const askFromCache = () => {
						oncePipelines(PipelinesEventTypes.REPLY_PIPELINES, (pipelines: Array<Pipeline>) => {
							// eslint-disable-next-line
							const pipeline = pipelines.find(pipeline => pipeline.pipelineId == pipelineId);
							resolve(pipeline);
						}).fire(PipelinesEventTypes.ASK_PIPELINES);
					};

					try {
						let {pipeline} = await fetchPipeline(pipelineId);
						if (pipeline) {
							fireCache(AdminCacheEventTypes.PIPELINE_LOADED, pipeline);
							resolve(pipeline);
						} else {
							askFromCache();
						}
					} catch {
						askFromCache();
					}
				});
			})();
			if (!pipeline) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					history.replace(Router.ADMIN);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>Given pipeline not found.</AlertLabel>);
			} else {
				setData({topics, pipeline});
			}
		}).fire(PipelinesEventTypes.ASK_TOPICS);
	}, [onceGlobal, fireCache, oncePipelines, pipelineId, history]);

	// eslint-disable-next-line
	if (!data.pipeline || data.pipeline.pipelineId != pipelineId) {
		return null;
	}

	return <PipelineEventBusProvider>
		<PipelineState pipeline={data.pipeline}/>
		<PipelineDataSaver/>
		<PipelineHeader pipeline={data.pipeline}/>
		<PipelineBody pipeline={data.pipeline} topics={data.topics}/>
	</PipelineEventBusProvider>;

};