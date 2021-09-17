import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import React from 'react';
import {useExpanded} from '../stage-effect/use-expanded';
import {StageLeadLabel} from './widgets';

export const Serial = (props: { pipeline: Pipeline, stage: PipelineStage }) => {
	const {pipeline, stage} = props;

	const expanded = useExpanded(pipeline, stage);

	const index = pipeline.stages.indexOf(stage) + 1;

	return <StageLeadLabel>Stage #{index}{expanded ? '' : ' (Collapsed)'}:</StageLeadLabel>;
};