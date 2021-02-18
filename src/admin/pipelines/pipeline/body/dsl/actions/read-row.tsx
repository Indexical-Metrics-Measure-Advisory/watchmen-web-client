import React from 'react';
import { PipelineStageUnitAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { isReadRowAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { PropName, TopicName, VariableName } from '../dsl-widgets';
import { JointLine } from '../joint/joint';

export const ReadRow = (props: { action: PipelineStageUnitAction, topicsMap: Map<string, Topic> }) => {
	const { action, topicsMap } = props;

	if (!isReadRowAction(action)) {
		return null;
	}

	let topic;
	const { topicId } = action;
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