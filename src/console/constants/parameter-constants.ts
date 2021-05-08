import {Lang} from '../../langs';
import {ParameterExpressionOperator} from '../../services/tuples/factor-calculator-types';

export const FilterExpressionOperatorLabels: { [key in ParameterExpressionOperator]: string } = {
	[ParameterExpressionOperator.EMPTY]: Lang.PARAMETER.EXPRESSION_OPERATOR.EMPTY,
	[ParameterExpressionOperator.NOT_EMPTY]: Lang.PARAMETER.EXPRESSION_OPERATOR.NOT_EMPTY,
	[ParameterExpressionOperator.EQUALS]: Lang.PARAMETER.EXPRESSION_OPERATOR.EQUALS,
	[ParameterExpressionOperator.NOT_EQUALS]: Lang.PARAMETER.EXPRESSION_OPERATOR.NOT_EQUALS,
	[ParameterExpressionOperator.LESS]: Lang.PARAMETER.EXPRESSION_OPERATOR.LESS,
	[ParameterExpressionOperator.LESS_EQUALS]: Lang.PARAMETER.EXPRESSION_OPERATOR.LESS_EQUALS,
	[ParameterExpressionOperator.MORE]: Lang.PARAMETER.EXPRESSION_OPERATOR.MORE,
	[ParameterExpressionOperator.MORE_EQUALS]: Lang.PARAMETER.EXPRESSION_OPERATOR.MORE_EQUALS,
	[ParameterExpressionOperator.IN]: Lang.PARAMETER.EXPRESSION_OPERATOR.IN,
	[ParameterExpressionOperator.NOT_IN]: Lang.PARAMETER.EXPRESSION_OPERATOR.NOT_IN
};
