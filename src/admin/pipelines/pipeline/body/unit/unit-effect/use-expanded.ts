import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {useEffect, useState} from 'react';
import {usePipelineEventBus} from '../../../pipeline-event-bus';
import {PipelineEventTypes, PipelineFocusMode} from '../../../pipeline-event-bus-types';
import {useUnitEventBus} from '../unit-event-bus';
import {UnitEventTypes} from '../unit-event-bus-types';

export const useExpanded = (pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit) => {
	const {on: onPipeline, off: offPipeline, fire: firePipeline} = usePipelineEventBus();
	const {on, off, fire} = useUnitEventBus();
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
				firePipeline(PipelineEventTypes.ASK_FOCUS_MODE, pipeline, (mode) => {
					if (p !== pipeline) {
						return;
					}
					if (mode === PipelineFocusMode.UNIT) {
						setExpanded(false);
					}
				});
			}
		};
		onPipeline(PipelineEventTypes.UNIT_EXPANDED, onUnitExpanded);
		return () => {
			offPipeline(PipelineEventTypes.UNIT_EXPANDED, onUnitExpanded);
		};
	}, [firePipeline, onPipeline, offPipeline, pipeline, stage, unit]);
	useEffect(() => {
		firePipeline(PipelineEventTypes.ASK_FOCUS_MODE, pipeline, (mode: PipelineFocusMode) => {
			if (mode === PipelineFocusMode.FREE_WALK) {
				setExpanded(true);
			} else {
				fire(UnitEventTypes.EXPAND_CONTENT);
			}
		});
	}, [firePipeline, fire, pipeline]);

	return expanded;
};