import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Fragment, useEffect, useState} from 'react';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes, PipelineFocusMode} from '../pipeline-event-bus-types';

export const PipelineState = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;
	const [focusMode, setFocusMode] = useState<PipelineFocusMode>(PipelineFocusMode.FREE_WALK);
	const {on, off, fire} = usePipelineEventBus();
	useEffect(() => {
		setFocusMode(PipelineFocusMode.FREE_WALK);
	}, [pipeline]);
	useEffect(() => {
		const onAskFocusMode = (askPipeline: Pipeline, onModeGet: (mode: PipelineFocusMode) => void) => {
			if (askPipeline !== pipeline) {
				return;
			}
			onModeGet(focusMode);
		};
		const onFocusModeChanged = (changedPipeline: Pipeline, mode: PipelineFocusMode) => {
			if (changedPipeline !== pipeline) {
				return;
			}
			setFocusMode(mode);
		};
		on(PipelineEventTypes.ASK_FOCUS_MODE, onAskFocusMode);
		on(PipelineEventTypes.FOCUS_MODE_CHANGED, onFocusModeChanged);
		return () => {
			off(PipelineEventTypes.ASK_FOCUS_MODE, onAskFocusMode);
			off(PipelineEventTypes.FOCUS_MODE_CHANGED, onFocusModeChanged);
		};
	}, [on, off, fire, pipeline, focusMode]);

	return <Fragment/>;
};