import {ParameterExpression} from '@/services/data/tuples/factor-calculator-types';

export enum ExpressionEventTypes {
	LEFT_CHANGED = 'left-changed',
	OPERATOR_CHANGED = 'operator-changed',
	RIGHT_CHANGED = 'right-changed'
}

export interface ExpressionEventBus {
	fire(type: ExpressionEventTypes.LEFT_CHANGED, expression: ParameterExpression): this;
	on(type: ExpressionEventTypes.LEFT_CHANGED, listener: (expression: ParameterExpression) => void): this;
	off(type: ExpressionEventTypes.LEFT_CHANGED, listener: (expression: ParameterExpression) => void): this;

	fire(type: ExpressionEventTypes.OPERATOR_CHANGED, expression: ParameterExpression): this;
	on(type: ExpressionEventTypes.OPERATOR_CHANGED, listener: (expression: ParameterExpression) => void): this;
	off(type: ExpressionEventTypes.OPERATOR_CHANGED, listener: (expression: ParameterExpression) => void): this;

	fire(type: ExpressionEventTypes.RIGHT_CHANGED, expression: ParameterExpression): this;
	on(type: ExpressionEventTypes.RIGHT_CHANGED, listener: (expression: ParameterExpression) => void): this;
	off(type: ExpressionEventTypes.RIGHT_CHANGED, listener: (expression: ParameterExpression) => void): this;
}