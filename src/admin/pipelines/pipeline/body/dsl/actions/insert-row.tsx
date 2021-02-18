import React from 'react';
import { Factor } from '../../../../../../services/tuples/factor-types';
import { PipelineStageUnitAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { isInsertRowAction } from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import { AggregateArithmetic } from '../../../../../../services/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import {
	AggregateArithmeticValue,
	FactorName,
	PropName,
	PropNameInListFirst,
	PropValue,
	TopicName
} from '../dsl-widgets';
import { ParameterLines } from '../parameter';

export const InsertRow = (props: { action: PipelineStageUnitAction, topicsMap: Map<string, Topic> }) => {
	const { action, topicsMap } = props;

	if (!isInsertRowAction(action)) {
		return null;
	}

	let topic: Topic | undefined = (void 0);
	const { topicId } = action;
	if (topicId) {
		topic = topicsMap.get(topicId);
	}

	return <>
		<PropName indent={7}>mapping</PropName>
		{action.mapping.map(mapping => {
			let factor: Factor | undefined = (void 0);
			if (topic) {
				// eslint-disable-next-line
				factor = topic.factors.find(factor => factor.factorId == mapping.factorId);
			}
			return <>
				<PropNameInListFirst indent={8}>source</PropNameInListFirst>
				<ParameterLines parameter={mapping.source} topicsMap={topicsMap} indent={10}/>
				{mapping.arithmetic !== AggregateArithmetic.NONE
					? <>
						<PropName indent={9}>use-aggregate</PropName>
						<AggregateArithmeticValue>{mapping.arithmetic}</AggregateArithmeticValue>
					</>
					: null}
				<PropName indent={9}>target</PropName>
				<TopicName>{topic?.name}</TopicName>
				<PropValue>.</PropValue>
				<FactorName>{factor?.name}</FactorName>
			</>;
		})}
	</>;
};