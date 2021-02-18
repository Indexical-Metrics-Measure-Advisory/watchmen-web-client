import React from 'react';
import { ParameterJoint } from '../../../../../../services/tuples/factor-calculator-types';
import { isExpressionParameter, isJointParameter } from '../../../../../../services/tuples/factor-calculator-utils';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { Bracket, ConjunctionWord, JointContainer, PropValue, Whitespace } from '../dsl-widgets';
import { ExpressionLine } from './expression';

export const JointLine = (props: {
	joint?: ParameterJoint;
	topicsMap: Map<string, Topic>;
	indent: number;
	onTop?: boolean;
}) => {
	const { joint, topicsMap, indent, onTop = true } = props;

	if (!joint) {
		return null;
	}

	return <JointContainer>
		{!onTop && joint.filters.length !== 1
			? <Bracket>(</Bracket>
			: null}
		{joint.filters.map((filter, filterIndex) => {
			if (filterIndex === 0) {
				if (isExpressionParameter(filter)) {
					return <ExpressionLine expression={filter} topicsMap={topicsMap} indent={indent}/>;
				} else if (isJointParameter(filter)) {
					return <JointLine joint={filter} topicsMap={topicsMap} indent={indent} onTop={false}/>;
				} else {
					return <PropValue>?</PropValue>;
				}
			} else {
				if (isExpressionParameter(filter)) {
					return <>
						<Whitespace/>
						<ConjunctionWord>{joint?.jointType}</ConjunctionWord>
						<Whitespace/>
						<ExpressionLine expression={filter} topicsMap={topicsMap} indent={indent}/>
					</>;
				} else if (isJointParameter(filter)) {
					return <>
						<Whitespace/>
						<ConjunctionWord>{joint?.jointType}</ConjunctionWord>
						<Whitespace/>
						<JointLine joint={filter} topicsMap={topicsMap} indent={indent} onTop={false}/>
					</>;
				} else {
					return <>
						<Whitespace/>
						<ConjunctionWord>{joint?.jointType}</ConjunctionWord>
						<Whitespace/>
						<PropValue>?</PropValue>
					</>;
				}
			}
		})}
		{!onTop && joint.filters.length !== 1
			? <Bracket>)</Bracket>
			: null}
	</JointContainer>;
};