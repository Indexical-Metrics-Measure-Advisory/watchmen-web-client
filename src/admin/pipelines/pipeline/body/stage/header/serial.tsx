import React from 'react';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { LeadLabel } from '../../widgets';
import { useExpanded } from '../stage-effect/use-expanded';

export const Serial = (props: { pipeline: Pipeline, stage: PipelineStage }) => {
	const { pipeline, stage } = props;

	const expanded = useExpanded();

	const index = pipeline.stages.indexOf(stage) + 1;

	return <LeadLabel>Stage #{index}{expanded ? '' : ' (Collapsed)'}:</LeadLabel>;
};