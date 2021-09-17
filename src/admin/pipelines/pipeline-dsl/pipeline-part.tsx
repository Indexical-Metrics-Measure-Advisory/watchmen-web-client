import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {ConditionalLine} from './conditonal';
import {BooleanValue, LineComment, PropName, PropValue, TopicName, TriggerOn} from './dsl-widgets';

export const PipelinePart = (props: { pipeline: Pipeline, topicsMap: Map<string, Topic> }) => {
	const {pipeline, topicsMap} = props;

	// eslint-disable-next-line
	const topic = topicsMap.get(pipeline.topicId);
	const {name: topicName} = topic || {};

	return <>
		<LineComment>Pipeline</LineComment>
		<PropName>pipeline-id</PropName>
		<PropValue>{pipeline.pipelineId}</PropValue>
		<PropName>name</PropName>
		<PropValue>{pipeline.name}</PropValue>
		<PropName>topic</PropName>
		<TopicName>{topicName}</TopicName>
		<PropName>trigger-on</PropName>
		<TriggerOn>{`${pipeline.type}`}</TriggerOn>
		<ConditionalLine conditional={pipeline} topicsMap={topicsMap}/>
		<PropName>enabled</PropName>
		<BooleanValue>{`${pipeline.enabled}`}</BooleanValue>
		<PropName>created-at</PropName>
		<PropValue>{pipeline.createTime}</PropValue>
		<PropName>last-modified-at</PropName>
		<PropValue>{pipeline.lastModified}</PropValue>
	</>;
};