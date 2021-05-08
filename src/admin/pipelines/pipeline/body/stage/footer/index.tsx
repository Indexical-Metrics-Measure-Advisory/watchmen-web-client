import React from 'react';
import {PipelineStage} from '../../../../../../services/tuples/pipeline-stage-types';
import {Pipeline} from '../../../../../../services/tuples/pipeline-types';
import {FooterButtons, FooterLeadLabel} from '../../widgets';
import {HeaderOperators, HeaderOperatorsPosition} from '../header-operators';
import {StageFooterContainer} from './widgets';

export const StageFooter = (props: {
    pipeline: Pipeline;
    stage: PipelineStage;
}) => {
    const {pipeline, stage} = props;

    const index = pipeline.stages.indexOf(stage) + 1;

    return <StageFooterContainer>
        <FooterLeadLabel>End of Stage #{index}</FooterLeadLabel>
        <FooterButtons>
            <HeaderOperators pipeline={pipeline} stage={stage} position={HeaderOperatorsPosition.FOOTER}/>
        </FooterButtons>
    </StageFooterContainer>;
};