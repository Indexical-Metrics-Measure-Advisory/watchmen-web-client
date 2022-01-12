import {renamePipeline, savePipeline} from '@/services/data/tuples/pipeline';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {Fragment, useEffect} from 'react';
// noinspection ES6PreferShortImport
import {useAdminCacheEventBus} from '../../../cache/cache-event-bus';
// noinspection ES6PreferShortImport
import {AdminCacheEventTypes} from '../../../cache/cache-event-bus-types';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline-event-bus-types';

export const PipelineDataSaver = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useAdminCacheEventBus();
	const {on, off, fire} = usePipelineEventBus();
	useEffect(() => {
		const onSavePipeline = async (pipeline: Pipeline, onSaved: (saved: boolean) => void) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await savePipeline(pipeline),
				() => {
					onSaved(true);
					fire(PipelineEventTypes.PIPELINE_SAVED, pipeline, true);
					fireCache(AdminCacheEventTypes.SAVE_PIPELINE, pipeline);
				},
				() => {
					onSaved(false);
					fireCache(AdminCacheEventTypes.SAVE_PIPELINE, pipeline);
				}
			);
		};
		const onRenamePipeline = async (pipeline: Pipeline) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await renamePipeline(pipeline.pipelineId, pipeline.name),
				() => {
					fireCache(AdminCacheEventTypes.SAVE_PIPELINE, pipeline);
				}
			);
		};
		const onTogglePipelineEnabled = async (pipeline: Pipeline) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await savePipeline(pipeline),
				() => {
					fire(PipelineEventTypes.PIPELINE_SAVED, pipeline, true);
					fireCache(AdminCacheEventTypes.SAVE_PIPELINE, pipeline);
				});
		};
		on(PipelineEventTypes.SAVE_PIPELINE, onSavePipeline);
		on(PipelineEventTypes.RENAME_PIPELINE, onRenamePipeline);
		on(PipelineEventTypes.TOGGLE_PIPELINE_ENABLEMENT, onTogglePipelineEnabled);
		return () => {
			off(PipelineEventTypes.SAVE_PIPELINE, onSavePipeline);
			off(PipelineEventTypes.RENAME_PIPELINE, onRenamePipeline);
			off(PipelineEventTypes.TOGGLE_PIPELINE_ENABLEMENT, onTogglePipelineEnabled);
		};
	}, [on, off, fire, fireGlobal, fireCache]);

	return <Fragment/>;
};