import { Lang } from '../../../../../langs';
import { FilterExpressionOperator } from '../../../../../services/tuples/subject-types';

export const FilterExpressionOperatorLabels: { [key in FilterExpressionOperator]: string } = {
	[FilterExpressionOperator.EMPTY]: Lang.FILTER.EXPRESSION.OPERATOR.EMPTY,
	[FilterExpressionOperator.NOT_EMPTY]: Lang.FILTER.EXPRESSION.OPERATOR.NOT_EMPTY,
	[FilterExpressionOperator.EQUALS]: Lang.FILTER.EXPRESSION.OPERATOR.EQUALS,
	[FilterExpressionOperator.NOT_EQUALS]: Lang.FILTER.EXPRESSION.OPERATOR.NOT_EQUALS,
	[FilterExpressionOperator.LESS]: Lang.FILTER.EXPRESSION.OPERATOR.LESS,
	[FilterExpressionOperator.LESS_EQUALS]: Lang.FILTER.EXPRESSION.OPERATOR.LESS_EQUALS,
	[FilterExpressionOperator.MORE]: Lang.FILTER.EXPRESSION.OPERATOR.MORE,
	[FilterExpressionOperator.MORE_EQUALS]: Lang.FILTER.EXPRESSION.OPERATOR.MORE_EQUALS,
	[FilterExpressionOperator.IN]: Lang.FILTER.EXPRESSION.OPERATOR.IN,
	[FilterExpressionOperator.NOT_IN]: Lang.FILTER.EXPRESSION.OPERATOR.NOT_IN
};
