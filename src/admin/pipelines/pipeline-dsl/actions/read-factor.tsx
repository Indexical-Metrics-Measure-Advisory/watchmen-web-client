import React from 'react';
import {PipelineStageUnitAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isReadFactorAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Topic} from '@/services/tuples/topic-types';
import {AggregateArithmeticValue, FactorName, PropName, PropValue, TopicName, VariableName} from '../dsl-widgets';
import {JointLine} from '../joint/joint';
import {AggregateArithmetic} from '@/services/tuples/pipeline-stage-unit-action/aggregate-arithmetic-types';

export const ReadFactor = (props: { action: PipelineStageUnitAction, topicsMap: Map<string, Topic> }) => {
	const {action, topicsMap} = props;

	if (!isReadFactorAction(action)) {
		return null;
	}

	let topic, factor;
	const {topicId, factorId} = action;
	if (topicId) {
		topic = topicsMap.get(topicId);
	}
	if (topic) {
		// eslint-disable-next-line
		factor = topic.factors.find(factor => factor.factorId == factorId);
	}

	return <>
		<PropName indent={7}>variable-name</PropName>
		<VariableName>{action.variableName}</VariableName>
		<PropName indent={7}>source</PropName>
		<TopicName>{topic?.name}</TopicName>
		<PropValue>.</PropValue>
		<FactorName>{factor?.name}</FactorName>
		{action.arithmetic !== AggregateArithmetic.NONE
			? <>
				<PropName indent={7}>use-aggregate</PropName>
				<AggregateArithmeticValue>{action.arithmetic}</AggregateArithmeticValue>
			</>
			: null}
		<PropName indent={7}>by</PropName>
		<JointLine joint={action.by} topicsMap={topicsMap} indent={7}/>
	</>;
};