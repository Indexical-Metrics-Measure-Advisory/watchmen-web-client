import React from 'react';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { usePipelineEventBus } from '../../pipeline-event-bus';
import { PipelineEventTypes } from '../../pipeline-event-bus-types';
import { ConditionalEditor } from '../conditional';
import { LeadLabel } from '../widgets';
import { TriggerOnButton } from './trigger-on-button';
import { PipelinePartContainer, TopicName } from './widgets';

export const PipelinePart = (props: {
	pipeline: Pipeline;
	topic: Topic;
}) => {
	const { pipeline, topic } = props;

	const { fire } = usePipelineEventBus();

	const onConditionTypeChange = () => {
		fire(PipelineEventTypes.CONDITION_CHANGED, pipeline);
	};

	return <PipelinePartContainer>
		<LeadLabel>On Topic:</LeadLabel>
		<TopicName>{topic.name}</TopicName>
		<LeadLabel>Trigger On:</LeadLabel>
		<TriggerOnButton pipeline={pipeline}/>
		<LeadLabel>Prerequisite:</LeadLabel>
		<ConditionalEditor conditional={pipeline} topics={[ topic ]} onChange={onConditionTypeChange}/>
	</PipelinePartContainer>;
};