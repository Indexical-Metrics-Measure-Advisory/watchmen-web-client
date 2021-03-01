import React, { Fragment, useEffect } from 'react';
import { useEventBus } from '../../../../events/event-bus';
import { EventTypes } from '../../../../events/types';
import { renamePipeline, savePipeline, togglePipelineEnabled } from '../../../../services/tuples/pipeline';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { usePipelineEventBus } from '../pipeline-event-bus';
import { PipelineEventTypes } from '../pipeline-event-bus-types';

export const PipelineDataSaver = () => {
	const { fire: fireGlobal } = useEventBus();
	const { on, off, fire } = usePipelineEventBus();
	useEffect(() => {
		const onSavePipeline = async (pipeline: Pipeline) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await savePipeline(pipeline),
				() => {
				});
		};
		const onRenamePipeline = async (pipeline: Pipeline) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await renamePipeline(pipeline.pipelineId, pipeline.name),
				() => {
				});
		};
		const onTogglePipelineEnabled = async (pipeline: Pipeline) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await togglePipelineEnabled(pipeline.pipelineId, pipeline.enabled),
				() => fire(PipelineEventTypes.PIPELINE_ENABLED_TOGGLED, pipeline));
		};
		on(PipelineEventTypes.SAVE_PIPELINE, onSavePipeline);
		on(PipelineEventTypes.RENAME_PIPELINE, onRenamePipeline);
		on(PipelineEventTypes.TOGGLE_PIPELINE_ENABLED, onTogglePipelineEnabled);
		return () => {
			off(PipelineEventTypes.SAVE_PIPELINE, onSavePipeline);
			off(PipelineEventTypes.RENAME_PIPELINE, onRenamePipeline);
			off(PipelineEventTypes.TOGGLE_PIPELINE_ENABLED, onTogglePipelineEnabled);
		};
	}, [ on, off, fire, fireGlobal ]);

	return <Fragment/>;
};