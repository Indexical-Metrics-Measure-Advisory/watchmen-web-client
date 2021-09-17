import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import React from 'react';
import {useExpanded} from '../unit-effect/use-expanded';
import {UnitLeadLabel} from './widgets';

export const Serial = (props: { pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit }) => {
	const {pipeline, stage, unit} = props;

	const expanded = useExpanded(pipeline, stage, unit);

	const stageIndex = pipeline.stages.indexOf(stage) + 1;
	const unitIndex = stage.units.indexOf(unit) + 1;

	return <UnitLeadLabel>Unit #{stageIndex}.{unitIndex}{expanded ? '' : ' (Collapsed)'}:</UnitLeadLabel>;
};