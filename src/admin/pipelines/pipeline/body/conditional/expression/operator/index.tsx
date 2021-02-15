import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useRef, useState } from 'react';
import { ICON_EDIT } from '../../../../../../../basic-widgets/constants';
import { useCollapseFixedThing } from '../../../../../../../basic-widgets/utils';
import {
	ParameterExpression,
	ParameterExpressionOperator
} from '../../../../../../../services/tuples/factor-calculator-types';
import { useExpressionEventBus } from '../../event-bus/expression-event-bus';
import { ExpressionEventTypes } from '../../event-bus/expression-event-bus-types';
import {
	EXPRESSION_OPERATOR_DROPDOWN_HEIGHT,
	ExpressionOperatorContainer,
	ExpressionOperatorDropdown,
	ExpressionOperatorIcon,
	ExpressionOperatorLabel,
	ExpressionOperatorOption
} from './widgets';

const AvailableOperators = [
	ParameterExpressionOperator.EMPTY,
	ParameterExpressionOperator.NOT_EMPTY,
	ParameterExpressionOperator.EQUALS,
	ParameterExpressionOperator.NOT_EQUALS,
	ParameterExpressionOperator.LESS,
	ParameterExpressionOperator.LESS_EQUALS,
	ParameterExpressionOperator.MORE,
	ParameterExpressionOperator.MORE_EQUALS,
	ParameterExpressionOperator.IN,
	ParameterExpressionOperator.NOT_IN
];

const FilterExpressionOperatorLabels: { [key in ParameterExpressionOperator]: string } = {
	[ParameterExpressionOperator.EMPTY]: 'Is Empty',
	[ParameterExpressionOperator.NOT_EMPTY]: 'Is Not Empty',
	[ParameterExpressionOperator.EQUALS]: 'Equals',
	[ParameterExpressionOperator.NOT_EQUALS]: 'Not Equals',
	[ParameterExpressionOperator.LESS]: 'Less than',
	[ParameterExpressionOperator.LESS_EQUALS]: 'Less than or Equals',
	[ParameterExpressionOperator.MORE]: 'Greater than',
	[ParameterExpressionOperator.MORE_EQUALS]: 'Greater than or Equals',
	[ParameterExpressionOperator.IN]: 'In',
	[ParameterExpressionOperator.NOT_IN]: 'Not In'
};

interface DropdownState {
	visible: boolean;
	top?: number;
	bottom?: number;
	left: number;
}

export const ExpressionOperator = (props: { expression: ParameterExpression }) => {
	const { expression } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const { fire } = useExpressionEventBus();
	const [ state, setState ] = useState<DropdownState>({ visible: false, top: 0, left: 0 });
	useCollapseFixedThing({ containerRef, hide: () => setState({ visible: false, top: 0, left: 0 }) });

	const onStartClicked = () => {
		if (!containerRef.current) {
			return;
		}

		const { top, left, height } = containerRef.current.getBoundingClientRect();
		if (top + height + 4 + EXPRESSION_OPERATOR_DROPDOWN_HEIGHT > window.innerHeight) {
			// at top
			setState({ visible: true, bottom: window.innerHeight - top + 4, left });
		} else {
			setState({ visible: true, top: top + height + 4, left });
		}
	};
	const onOperatorClick = (operator: ParameterExpressionOperator) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (expression.operator === operator) {
			return;
		} else {
			expression.operator = operator;
			fire(ExpressionEventTypes.OPERATOR_CHANGED, expression);
			setState({ visible: false, top: 0, left: 0 });
		}
	};

	return <ExpressionOperatorContainer onClick={onStartClicked} ref={containerRef}>
		<ExpressionOperatorLabel>{FilterExpressionOperatorLabels[expression.operator]}</ExpressionOperatorLabel>
		<ExpressionOperatorIcon>
			<FontAwesomeIcon icon={ICON_EDIT}/>
		</ExpressionOperatorIcon>
		<ExpressionOperatorDropdown {...state}>
			{AvailableOperators.map(operator => {
				return <ExpressionOperatorOption selected={operator === expression.operator}
				                                 onClick={onOperatorClick(operator)}
				                                 key={operator}>
					{FilterExpressionOperatorLabels[operator]}
				</ExpressionOperatorOption>;
			})}
		</ExpressionOperatorDropdown>
	</ExpressionOperatorContainer>;
};