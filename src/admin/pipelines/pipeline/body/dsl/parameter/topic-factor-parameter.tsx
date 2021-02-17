import React from 'react';
import { Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { isTopicFactorParameter } from '../../../../../../services/tuples/factor-calculator-utils';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { FactorName, PropName, TopicName } from '../dsl-widgets';

export const TopicFactorParameterLine = (props: { parameter: Parameter, topicsMap: Map<string, Topic>, indent: number }) => {
	const { parameter, topicsMap, indent } = props;

	if (!isTopicFactorParameter(parameter)) {
		return null;
	}

	let topic, factor;
	const { topicId, factorId } = parameter;
	if (topicId) {
		topic = topicsMap.get(topicId);
	}
	if (topic) {
		// eslint-disable-next-line
		factor = topic.factors.find(factor => factor.factorId == factorId);
	}

	return <>
		<PropName indent={indent + 1}>topic</PropName>
		<TopicName>{topic?.name}</TopicName>
		<PropName indent={indent + 1}>factor</PropName>
		<FactorName>{factor?.name}</FactorName>
	</>;
};