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
	topics: Array<Topic>;
}) => {
	const { pipeline, topics } = props;

	const { fire } = usePipelineEventBus();

	const { topicId } = pipeline;
	// eslint-disable-next-line
	const topic = topics.find(topic => topic.topicId == topicId);

	if (!topic) {
		return null;
	}

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