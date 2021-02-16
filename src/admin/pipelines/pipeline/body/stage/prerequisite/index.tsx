import React from 'react';
import { PipelineStage } from '../../../../../../services/tuples/pipeline-stage-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ConditionalEditor } from '../../conditional';
import { LeadLabel } from '../../widgets';
import { useStageEventBus } from '../stage-event-bus';
import { StageEventTypes } from '../stage-event-bus-types';

export const StagePrerequisite = (props: {
	stage: PipelineStage;
	topic: Topic;
}) => {
	const { stage, topic } = props;

	const { fire } = useStageEventBus();

	const onConditionTypeChange = () => {
		fire(StageEventTypes.CONDITION_CHANGED, stage);
	};

	return <>
		<LeadLabel>Stage Prerequisite:</LeadLabel>
		<ConditionalEditor conditional={stage} topics={[ topic ]} onChange={onConditionTypeChange}/>
	</>;
};