import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {ConditionalEditor} from '../../conditional';
import {LeadLabel} from '../../widgets';
import {useStageEventBus} from '../stage-event-bus';
import {StageEventTypes} from '../stage-event-bus-types';

export const StagePrerequisite = (props: {
	stage: PipelineStage;
	triggerTopic: Topic;
}) => {
	const {stage, triggerTopic} = props;

	const {fire} = useStageEventBus();

	const onConditionTypeChange = () => {
		fire(StageEventTypes.CONDITION_CHANGED, stage);
	};

	return <>
		<LeadLabel>Stage Prerequisite:</LeadLabel>
		<ConditionalEditor conditional={stage} topics={[triggerTopic]} onChange={onConditionTypeChange}/>
	</>;
};