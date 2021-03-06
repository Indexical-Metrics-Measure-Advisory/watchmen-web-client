import {useEffect, useState} from 'react';
import {usePipelineEventBus} from '../../../pipeline-event-bus';
import {PipelineEventTypes, PipelineFocusMode} from '../../../pipeline-event-bus-types';
import {useUnitEventBus} from '../unit-event-bus';
import {UnitEventTypes} from '../unit-event-bus-types';
import {Pipeline} from '../../../../../../services/tuples/pipeline-types';
import {PipelineStage} from '../../../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../../../../services/tuples/pipeline-stage-unit-types';

export const useExpanded = (pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit) => {
	const {once: oncePipeline, on: onPipeline, off: offPipeline, fire: firePipeline} = usePipelineEventBus();
	const {on, off} = useUnitEventBus();
	const [expanded, setExpanded] = useState(false);
	useEffect(() => {
		const onExpandContent = () => {
			setExpanded(true);
			firePipeline(PipelineEventTypes.UNIT_EXPANDED, pipeline, stage, unit);
		};
		const onCollapseContent = () => setExpanded(false);
		on(UnitEventTypes.EXPAND_CONTENT, onExpandContent);
		on(UnitEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		return () => {
			off(UnitEventTypes.EXPAND_CONTENT, onExpandContent);
			off(UnitEventTypes.COLLAPSE_CONTENT, onCollapseContent);
		};
	}, [firePipeline, on, off, pipeline, stage, unit]);
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
		const onUnitExpanded = (p: Pipeline, s: PipelineStage, u: PipelineStageUnit) => {
			if (p !== pipeline || s !== stage) {
				return;
			}
			if (u !== unit) {
				oncePipeline(PipelineEventTypes.REPLY_FOCUS_MODE, (p, mode) => {
					if (p !== pipeline) {
						return;
					}
					if (mode === PipelineFocusMode.UNIT) {
						setExpanded(false);
					}
				}).fire(PipelineEventTypes.ASK_FOCUS_MODE, pipeline);
			}
		};
		onPipeline(PipelineEventTypes.UNIT_EXPANDED, onUnitExpanded);
		return () => {
			offPipeline(PipelineEventTypes.UNIT_EXPANDED, onUnitExpanded);
		};
	}, [oncePipeline, onPipeline, offPipeline, pipeline, stage, unit]);

	return expanded;
};