import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import React, {ReactNode} from 'react';
import {useExpanded} from '../unit-effect/use-expanded';
import {UnitBodyContainer} from './widgets';

export const UnitBody = (props: { pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit, children: ReactNode }) => {
	const {pipeline, stage, unit, children} = props;

	const expanded = useExpanded(pipeline, stage, unit);

	return <UnitBodyContainer expanded={expanded}>
		{children}
	</UnitBodyContainer>;
};