import React from 'react';
import {useExpanded} from '../unit-effect/use-expanded';
import {UnitBodyContainer} from './widgets';
import {Pipeline} from '../../../../../../services/tuples/pipeline-types';
import {PipelineStage} from '../../../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../../../../services/tuples/pipeline-stage-unit-types';

export const UnitBody = (props: { pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit, children: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {pipeline, stage, unit, children} = props;

	const expanded = useExpanded(pipeline, stage, unit);

	return <UnitBodyContainer expanded={expanded}>
		{children}
	</UnitBodyContainer>;
};