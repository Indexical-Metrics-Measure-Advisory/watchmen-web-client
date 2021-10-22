import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import React, {Fragment, useEffect} from 'react';
import {usePipelineEventBus} from '../../pipeline-event-bus';
import {PipelineEventTypes} from '../../pipeline-event-bus-types';
import {useStageEventBus} from '../stage/stage-event-bus';
import {StageEventTypes} from '../stage/stage-event-bus-types';

export const Stage2PipelineBridge = (props: { pipeline: Pipeline, stage: PipelineStage }) => {
	const {pipeline, stage} = props;

	const {fire: firePipeline} = usePipelineEventBus();
	const {on, off} = useStageEventBus();
	useEffect(() => {
		const onStageChanged = () => {
			firePipeline(PipelineEventTypes.STAGE_CHANGED, stage, pipeline);
		};
		on(StageEventTypes.RENAME_STAGE, onStageChanged);
		on(StageEventTypes.CONDITION_CHANGED, onStageChanged);
		on(StageEventTypes.UNIT_ADDED, onStageChanged);
		on(StageEventTypes.UNIT_REMOVED, onStageChanged);
		on(StageEventTypes.UNIT_CHANGED, onStageChanged);
		on(StageEventTypes.UNIT_SORTED, onStageChanged);
		return () => {
			off(StageEventTypes.RENAME_STAGE, onStageChanged);
			off(StageEventTypes.CONDITION_CHANGED, onStageChanged);
			off(StageEventTypes.UNIT_ADDED, onStageChanged);
			off(StageEventTypes.UNIT_REMOVED, onStageChanged);
			off(StageEventTypes.UNIT_CHANGED, onStageChanged);
			off(StageEventTypes.UNIT_SORTED, onStageChanged);
		};
	}, [on, off, firePipeline, pipeline, stage]);

	return <Fragment/>;
};