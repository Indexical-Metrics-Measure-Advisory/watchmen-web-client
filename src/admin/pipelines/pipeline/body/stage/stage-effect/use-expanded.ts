import {useEffect, useState} from 'react';
import {useStageEventBus} from '../stage-event-bus';
import {StageEventTypes} from '../stage-event-bus-types';
import {usePipelineEventBus} from '../../../pipeline-event-bus';
import {PipelineEventTypes, PipelineFocusMode} from '../../../pipeline-event-bus-types';
import {Pipeline} from '../../../../../../services/tuples/pipeline-types';
import {PipelineStage} from '../../../../../../services/tuples/pipeline-stage-types';

export const useExpanded = (pipeline: Pipeline, stage: PipelineStage) => {
	const {fire: firePipeline, once: oncePipeline, on: onPipeline, off: offPipeline} = usePipelineEventBus();
	const {on, off} = useStageEventBus();
	const [expanded, setExpanded] = useState(false);
	useEffect(() => {
		const onExpandContent = () => {
			setExpanded(true);
			firePipeline(PipelineEventTypes.STAGE_EXPANDED, pipeline, stage);
		};
		const onCollapseContent = () => setExpanded(false);
		on(StageEventTypes.EXPAND_CONTENT, onExpandContent);
		on(StageEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		return () => {
			off(StageEventTypes.EXPAND_CONTENT, onExpandContent);
			off(StageEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		};
	}, [firePipeline, on, off, pipeline, stage]);
	useEffect(() => {
		const onExpandContent = () => setExpanded(true);
		const onCollapseContent = () => setExpanded(false);
		onPipeline(PipelineEventTypes.EXPAND_ALL, onExpandContent);
		onPipeline(PipelineEventTypes.COLLAPSE_ALL, onCollapseContent);
		return () => {
			offPipeline(PipelineEventTypes.EXPAND_ALL, onExpandContent);
			offPipeline(PipelineEventTypes.COLLAPSE_ALL, onCollapseContent);
		};
	}, [onPipeline, offPipeline]);
	useEffect(() => {
		const onStageExpanded = (p: Pipeline, s: PipelineStage) => {
			if (p !== pipeline) {
				return;
			}
			if (s !== stage) {
				oncePipeline(PipelineEventTypes.REPLY_FOCUS_MODE, (p, mode) => {
					if (p !== pipeline) {
						return;
					}
					if (mode === PipelineFocusMode.STAGE || mode === PipelineFocusMode.UNIT) {
						setExpanded(false);
					}
				}).fire(PipelineEventTypes.ASK_FOCUS_MODE, pipeline);
			}
		};
		onPipeline(PipelineEventTypes.STAGE_EXPANDED, onStageExpanded);
		return () => {
			offPipeline(PipelineEventTypes.STAGE_EXPANDED, onStageExpanded);
		};
	}, [oncePipeline, onPipeline, offPipeline, pipeline, stage]);

	return expanded;
};