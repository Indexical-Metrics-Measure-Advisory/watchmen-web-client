import React from 'react';
import {useExpanded} from '../stage-effect/use-expanded';
import {StageBodyContainer} from './widgets';
import {Pipeline} from '@/services/tuples/pipeline-types';
import {PipelineStage} from '@/services/tuples/pipeline-stage-types';

export const StageBody = (props: { pipeline: Pipeline, stage: PipelineStage, children: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {pipeline, stage, children} = props;

	const expanded = useExpanded(pipeline, stage);

	return <StageBodyContainer expanded={expanded}>
		{children}
	</StageBodyContainer>;
};