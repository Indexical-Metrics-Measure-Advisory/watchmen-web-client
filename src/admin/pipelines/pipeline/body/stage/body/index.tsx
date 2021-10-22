import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import React, {ReactNode} from 'react';
import {useExpanded} from '../stage-effect/use-expanded';
import {StageBodyContainer} from './widgets';

export const StageBody = (props: { pipeline: Pipeline, stage: PipelineStage, children: ReactNode }) => {
	const {pipeline, stage, children} = props;

	const expanded = useExpanded(pipeline, stage);

	return <StageBodyContainer expanded={expanded}>
		{children}
	</StageBodyContainer>;
};