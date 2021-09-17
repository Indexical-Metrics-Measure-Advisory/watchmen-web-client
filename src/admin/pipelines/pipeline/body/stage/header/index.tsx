import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import React from 'react';
import {HeaderButtons} from '../../widgets';
import {HeaderOperators, HeaderOperatorsPosition} from '../header-operators';
import {NameEditor} from './name-editor';
import {Serial} from './serial';
import {StageHeaderContainer} from './widgets';

export const StageHeader = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
}) => {
	const {pipeline, stage} = props;

	return <StageHeaderContainer>
		<Serial pipeline={pipeline} stage={stage}/>
		<NameEditor stage={stage}/>
		<HeaderButtons>
			<HeaderOperators pipeline={pipeline} stage={stage} position={HeaderOperatorsPosition.HEADER}/>
		</HeaderButtons>
	</StageHeaderContainer>;
};