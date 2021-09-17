import {Parameter} from '@/services/data/tuples/factor-calculator-types';
import {isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {FactorName, PropName, PropValue, TopicName} from '../dsl-widgets';

export const TopicFactorParameterLine = (props: { parameter: Parameter, topicsMap: Map<string, Topic>, inList: boolean, indent: number }) => {
	const {parameter, topicsMap, inList, indent} = props;

	if (!isTopicFactorParameter(parameter)) {
		return null;
	}

	let topic, factor;
	const {topicId, factorId} = parameter;
	if (topicId) {
		topic = topicsMap.get(topicId);
	}
	if (topic) {
		// eslint-disable-next-line
		factor = topic.factors.find(factor => factor.factorId == factorId);
	}

	return <>
		{inList ? null : <PropName indent={indent}>topic-factor</PropName>}
		<TopicName>{topic?.name}</TopicName>
		<PropValue>.</PropValue>
		<FactorName>{factor?.name}</FactorName>
	</>;
};