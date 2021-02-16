import React from 'react';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnitAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { PipelineStageUnit } from '../../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { Alarm } from '../alarm';
import { CopyToMemory } from '../copy-to-memory';
import { ActionBodyContainer } from './widgets';

export const ActionBody = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { pipeline, stage, unit, action, topics, topic } = props;

	return <ActionBodyContainer>
		<Alarm pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<CopyToMemory pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
	</ActionBodyContainer>;
};