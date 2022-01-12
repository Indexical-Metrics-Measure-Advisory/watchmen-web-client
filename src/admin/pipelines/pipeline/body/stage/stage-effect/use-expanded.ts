import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {useEffect, useState} from 'react';
import {usePipelineEventBus} from '../../../pipeline-event-bus';
import {PipelineEventTypes, PipelineFocusMode} from '../../../pipeline-event-bus-types';
import {useStageEventBus} from '../stage-event-bus';
import {StageEventTypes} from '../stage-event-bus-types';

export const useExpanded = (pipeline: Pipeline, stage: PipelineStage) => {
	const {fire: firePipeline, on: onPipeline, off: offPipeline} = usePipelineEventBus();
	const {on, off, fire} = useStageEventBus();
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
				firePipeline(PipelineEventTypes.ASK_FOCUS_MODE, pipeline, (mode) => {
					if (mode === PipelineFocusMode.STAGE || mode === PipelineFocusMode.UNIT) {
						setExpanded(false);
					}
				});
			}
		};
		onPipeline(PipelineEventTypes.STAGE_EXPANDED, onStageExpanded);
		return () => {
			offPipeline(PipelineEventTypes.STAGE_EXPANDED, onStageExpanded);
		};
	}, [firePipeline, onPipeline, offPipeline, pipeline, stage]);
	useEffect(() => {
		firePipeline(PipelineEventTypes.ASK_FOCUS_MODE, pipeline, (mode: PipelineFocusMode) => {
			if (mode === PipelineFocusMode.FREE_WALK) {
				setExpanded(true);
			} else {
				fire(StageEventTypes.EXPAND_CONTENT);
			}
		});
	}, [firePipeline, fire, pipeline]);

	return expanded;
};