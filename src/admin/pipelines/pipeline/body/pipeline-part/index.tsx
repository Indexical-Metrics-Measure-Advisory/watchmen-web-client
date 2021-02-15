import React from 'react';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { LeadLabel } from '../widgets';
import { TriggerOnButton } from './trigger-on-button';
import { PipelinePartContainer, TopicName } from './widgets';

export const PipelinePart = (props: {
	pipeline: Pipeline;
	topics: Array<Topic>;
}) => {
	const { pipeline, topics } = props;

	const { topicId } = pipeline;
	// eslint-disable-next-line
	const topic = topics.find(topic => topic.topicId == topicId);

	if (!topic) {
		return null;
	}

	return <PipelinePartContainer>
		<LeadLabel>On Topic:</LeadLabel>
		<TopicName>{topic.name}</TopicName>
		<LeadLabel>Trigger On:</LeadLabel>
		<TriggerOnButton pipeline={pipeline}/>
	</PipelinePartContainer>;
};