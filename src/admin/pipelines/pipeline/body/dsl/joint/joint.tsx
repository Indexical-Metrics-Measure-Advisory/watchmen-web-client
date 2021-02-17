import React from 'react';
import { ParameterJoint } from '../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../services/tuples/topic-types';

export const JointLine = (props: { joint?: ParameterJoint, topicsMap: Map<string, Topic> }) => {
	const { joint } = props;

	if (!joint) {
		return null;
	}

	return <>
	</>
};