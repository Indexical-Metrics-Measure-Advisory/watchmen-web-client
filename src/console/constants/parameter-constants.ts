import {ParameterExpressionOperator} from '@/services/data/tuples/factor-calculator-types';
import {Lang} from '@/widgets/langs';

export const FilterExpressionOperatorLabels: Record<ParameterExpressionOperator, string> = {
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
