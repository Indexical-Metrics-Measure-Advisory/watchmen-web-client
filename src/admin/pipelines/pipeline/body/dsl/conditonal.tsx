import React from 'react';
import { Conditional } from '../../../../../services/tuples/pipeline-super-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { PropName, BooleanValue } from './dsl-widgets';

export const ConditionalLine = (props: { conditional: Conditional, topicsMap: Map<string, Topic>, indent?: number }) => {
	const { conditional, topicsMap, indent = 0 } = props;

	return <>
		<PropName indent={indent}>conditional</PropName>
		<BooleanValue>{`${conditional.conditional}`}</BooleanValue>
	</>;
};