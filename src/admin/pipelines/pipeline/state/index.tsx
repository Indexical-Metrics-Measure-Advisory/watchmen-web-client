import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {useEffect, useState} from 'react';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes, PipelineFocusMode} from '../pipeline-event-bus-types';

export const PipelineState = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;
	const [focusMode, setFocusMode] = useState(PipelineFocusMode.UNIT);
	const {on, off, fire} = usePipelineEventBus();
	useEffect(() => {
		setFocusMode(PipelineFocusMode.UNIT);
	}, [pipeline]);
	useEffect(() => {
		const onAskFocusMode = (askPipeline: Pipeline) => {
			if (askPipeline !== pipeline) {
				return;
			}
			fire(PipelineEventTypes.REPLY_FOCUS_MODE, pipeline, focusMode);
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

	return <></>;
};