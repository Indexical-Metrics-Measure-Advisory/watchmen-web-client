import React from 'react';
import {PipelineStage} from '@/services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '@/services/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/tuples/pipeline-types';
import {HeaderButtons} from '../../widgets';
import {HeaderOperators, HeaderOperatorsPosition} from '../header-operators';
import {NameEditor} from './name-editor';
import {Serial} from './serial';
import {UnitHeaderContainer} from './widgets';

export const UnitHeader = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
}) => {
	const {pipeline, stage, unit} = props;

	return <UnitHeaderContainer>
		<Serial pipeline={pipeline} stage={stage} unit={unit}/>
		<NameEditor unit={unit}/>
		<HeaderButtons>
			<HeaderOperators pipeline={pipeline} stage={stage} unit={unit} position={HeaderOperatorsPosition.HEADER}/>
		</HeaderButtons>
	</UnitHeaderContainer>;
};