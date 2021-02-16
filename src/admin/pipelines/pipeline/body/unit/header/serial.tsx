import React from 'react';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnit } from '../../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { LeadLabel } from '../../widgets';
import { useExpanded } from '../unit-effect/use-expanded';

export const Serial = (props: { pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit }) => {
	const { pipeline, stage, unit } = props;

	const expanded = useExpanded();

	const stageIndex = pipeline.stages.indexOf(stage) + 1;
	const unitIndex = stage.units.indexOf(unit) + 1;

	return <LeadLabel>Unit #{stageIndex}.{unitIndex}{expanded ? '' : ' (Collapsed)'}:</LeadLabel>;
};