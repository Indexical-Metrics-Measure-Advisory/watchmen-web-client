import React from 'react';
import {PipelineStage} from '../../../../../../services/tuples/pipeline-stage-types';
import {Pipeline} from '../../../../../../services/tuples/pipeline-types';
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