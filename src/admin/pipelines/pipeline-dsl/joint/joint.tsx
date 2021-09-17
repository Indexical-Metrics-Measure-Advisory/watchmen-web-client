import {ParameterJoint} from '@/services/data/tuples/factor-calculator-types';
import {isExpressionParameter, isJointParameter} from '@/services/data/tuples/parameter-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {Fragment} from 'react';
import {v4} from 'uuid';
import {Bracket, ConjunctionWord, JointContainer, PropValue, Whitespace} from '../dsl-widgets';
import {ExpressionLine} from './expression';

export const JointLine = (props: {
	joint?: ParameterJoint;
	topicsMap: Map<string, Topic>;
	indent: number;
	onTop?: boolean;
}) => {
	const {joint, topicsMap, indent, onTop = true} = props;

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
					return <ExpressionLine expression={filter} topicsMap={topicsMap} indent={indent}
					                       key={v4()}/>;
				} else if (isJointParameter(filter)) {
					return <JointLine joint={filter} topicsMap={topicsMap} indent={indent} onTop={false}
					                  key={v4()}/>;
				} else {
					return <PropValue key={v4()}>?</PropValue>;
				}
			} else {
				if (isExpressionParameter(filter)) {
					return <Fragment key={v4()}>
						<Whitespace/>
						<ConjunctionWord>{joint?.jointType}</ConjunctionWord>
						<Whitespace/>
						<ExpressionLine expression={filter} topicsMap={topicsMap} indent={indent}/>
					</Fragment>;
				} else if (isJointParameter(filter)) {
					return <Fragment key={v4()}>
						<Whitespace/>
						<ConjunctionWord>{joint?.jointType}</ConjunctionWord>
						<Whitespace/>
						<JointLine joint={filter} topicsMap={topicsMap} indent={indent} onTop={false}/>
					</Fragment>;
				} else {
					return <Fragment key={v4()}>
						<Whitespace/>
						<ConjunctionWord>{joint?.jointType}</ConjunctionWord>
						<Whitespace/>
						<PropValue>?</PropValue>
					</Fragment>;
				}
			}
		})}
		{!onTop && joint.filters.length !== 1
			? <Bracket>)</Bracket>
			: null}
	</JointContainer>;
};