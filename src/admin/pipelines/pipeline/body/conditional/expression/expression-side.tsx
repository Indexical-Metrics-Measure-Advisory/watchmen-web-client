import React from 'react';
import { Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ParameterFromEditor } from './param-from';
import { TopicFactor } from './topic-factor';
import { ExpressionSideContainer } from './widgets';

export const ExpressionSide = (props: { parameter: Parameter, topics: Array<Topic> }) => {
	const { parameter, topics } = props;

	return <ExpressionSideContainer>
		<ParameterFromEditor parameter={parameter}/>
		<TopicFactor parameter={parameter} topics={topics}/>
	</ExpressionSideContainer>;
};