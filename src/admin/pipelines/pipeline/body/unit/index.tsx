import React from 'react';
import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnit } from '../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { UnitBody } from './body';
import { UnitHeader } from './header';
import { UnitContainer } from './widgets';

export const UnitEditor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { pipeline, stage, unit, topics, topic } = props;

	return <UnitContainer>
		<UnitHeader pipeline={pipeline} stage={stage} unit={unit} topic={topic}/>
		<UnitBody>
		</UnitBody>
	</UnitContainer>;
};