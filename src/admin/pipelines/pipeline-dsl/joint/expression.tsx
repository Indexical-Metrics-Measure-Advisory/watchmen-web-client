import {ParameterExpression, ParameterExpressionOperator} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {Bracket, ExpressionOperator, JointContainer, Whitespace} from '../dsl-widgets';
import {ParameterLines} from '../parameter';

const Labels: Record<ParameterExpressionOperator, string> = {
	[ParameterExpressionOperator.EMPTY]: 'Is Empty',
	[ParameterExpressionOperator.NOT_EMPTY]: 'Is Not Empty',
	[ParameterExpressionOperator.EQUALS]: '=',
	[ParameterExpressionOperator.NOT_EQUALS]: '<>',
	[ParameterExpressionOperator.LESS]: '<',
	[ParameterExpressionOperator.LESS_EQUALS]: '<=',
	[ParameterExpressionOperator.MORE]: '>',
	[ParameterExpressionOperator.MORE_EQUALS]: '>=',
	[ParameterExpressionOperator.IN]: 'In',
	[ParameterExpressionOperator.NOT_IN]: 'Not In'
};
export const ExpressionLine = (props: { expression: ParameterExpression, topicsMap: Map<string, Topic>, indent: number }) => {
	const {expression, topicsMap, indent} = props;

	if (!expression) {
		return null;
	}

	return <JointContainer>
		<ParameterLines parameter={expression.left} topicsMap={topicsMap} inList={true} indent={indent}/>
		<Whitespace/>
		<ExpressionOperator>{Labels[expression.operator]}</ExpressionOperator>
		{expression.operator === ParameterExpressionOperator.EMPTY
		|| expression.operator === ParameterExpressionOperator.NOT_EMPTY
			? null
			: <Whitespace/>}
		{expression.operator === ParameterExpressionOperator.IN
		|| expression.operator === ParameterExpressionOperator.NOT_IN
			? <Bracket>(</Bracket>
			: null}
		{expression.operator === ParameterExpressionOperator.EMPTY
		|| expression.operator === ParameterExpressionOperator.NOT_EMPTY
			? null
			: <ParameterLines parameter={expression.right} topicsMap={topicsMap} inList={true} indent={indent}/>}
		{expression.operator === ParameterExpressionOperator.IN
		|| expression.operator === ParameterExpressionOperator.NOT_IN
			? <Bracket>)</Bracket>
			: null}
	</JointContainer>;
};