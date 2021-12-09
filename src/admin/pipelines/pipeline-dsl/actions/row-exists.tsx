import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isExistsAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {PropName, TopicName, VariableName} from '../dsl-widgets';
import {JointLine} from '../joint/joint';

export const RowExists = (props: { action: PipelineStageUnitAction, topicsMap: Map<string, Topic> }) => {
	const {action, topicsMap} = props;

	if (!isExistsAction(action)) {
		return null;
	}

	let topic;
	const {topicId} = action;
	if (topicId) {
		topic = topicsMap.get(topicId);
	}

	return <>
		<PropName indent={7}>variable-name</PropName>
		<VariableName>{action.variableName}</VariableName>
		<PropName indent={7}>source</PropName>
		<TopicName>{topic?.name}</TopicName>
		<PropName indent={7}>by</PropName>
		<JointLine joint={action.by} topicsMap={topicsMap} indent={7}/>
	</>;
};