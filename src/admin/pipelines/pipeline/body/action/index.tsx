import React from 'react';
import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnitAction } from '../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { PipelineStageUnit } from '../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ActionTypeEditor } from './action-type';
import { ActionBody } from './body';
import { ActionContainer, ActionLeadLabel } from './widgets';

export const ActionEditor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { pipeline, stage, unit, action, topics, topic } = props;

	return <ActionContainer>
		<ActionLeadLabel/>
		<ActionTypeEditor action={action}/>
		<ActionBody pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
	</ActionContainer>;
};