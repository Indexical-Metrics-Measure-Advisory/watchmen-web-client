import React from 'react';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnit } from '../../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { FooterButtons, FooterLeadLabel } from '../../widgets';
import { HeaderOperators, HeaderOperatorsPosition } from '../header-operators';
import { UnitFooterContainer } from './widgets';

export const UnitFooter = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
}) => {
	const { pipeline, stage, unit } = props;

	const stageIndex = pipeline.stages.indexOf(stage) + 1;
	const unitIndex = stage.units.indexOf(unit) + 1;

	return <UnitFooterContainer>
		<FooterLeadLabel>End of Unit #{stageIndex}.{unitIndex}</FooterLeadLabel>
		<FooterButtons>
			<HeaderOperators pipeline={pipeline} stage={stage} unit={unit} position={HeaderOperatorsPosition.FOOTER}/>
		</FooterButtons>
	</UnitFooterContainer>;
};