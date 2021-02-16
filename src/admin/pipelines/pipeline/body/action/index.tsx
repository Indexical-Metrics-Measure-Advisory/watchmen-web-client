import React from 'react';
import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnitAction } from '../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { PipelineStageUnit } from '../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ActionTypeEditor } from './action-type';
import { ActionBody } from './body';
import { Operators } from './operators';
import { ActionContainer, ActionFooterLeadLabel, ActionLeadLabel } from './widgets';

export const ActionEditor = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { pipeline, stage, unit, action, topics, topic } = props;

	const stageIndex = pipeline.stages.indexOf(stage) + 1;
	const unitIndex = stage.units.indexOf(unit) + 1;
	const actionIndex = unit.do.indexOf(action) + 1;

	return <ActionContainer>
		<Operators action={action} unit={unit}/>
		<ActionLeadLabel>#{stageIndex}.{unitIndex}.{actionIndex}:</ActionLeadLabel>
		<ActionTypeEditor action={action}/>
		<ActionBody pipeline={pipeline} stage={stage} unit={unit} action={action} topics={topics} topic={topic}/>
		<ActionFooterLeadLabel>End of Action #{stageIndex}.{unitIndex}.{actionIndex}</ActionFooterLeadLabel>
	</ActionContainer>;
};