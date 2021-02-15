import React from 'react';
import { Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ComputedEditor } from './compute';
import { ConstantEditor } from './constant';
import { ParameterFromEditor } from './param-from';
import { TopicFactorEditor } from './topic-factor';
import { ExpressionSideContainer } from './widgets';

export const ExpressionSide = (props: { parameter: Parameter, topics: Array<Topic> }) => {
	const { parameter, topics } = props;

	return <ExpressionSideContainer>
		<ParameterFromEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter} topics={topics}/>
		<ConstantEditor parameter={parameter}/>
		<ComputedEditor parameter={parameter} topics={topics}/>
	</ExpressionSideContainer>;
};