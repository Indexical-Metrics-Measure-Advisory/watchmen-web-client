import {ParameterExpression, ParameterExpressionOperator} from '@/services/data/tuples/factor-calculator-types';
import {ICON_EDIT} from '@/widgets/basic/constants';
import {useCollapseFixedThing} from '@/widgets/basic/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {MouseEvent, useRef, useState} from 'react';
// noinspection ES6PreferShortImport
import {useFilterEventBus} from '../filter-event-bus';
import {FilterEventTypes} from '../filter-event-bus-types';
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

const FilterExpressionOperatorLabels: Record<ParameterExpressionOperator, string> = {
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
	const {expression} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const {fire} = useFilterEventBus();
	const [state, setState] = useState<DropdownState>({visible: false, top: 0, left: 0});
	useCollapseFixedThing({
		containerRef,
		visible: state.visible,
		hide: () => setState({visible: false, top: 0, left: 0})
	});

	const onStartClicked = () => {
		if (!containerRef.current) {
			return;
		}

		const {top, left, height} = containerRef.current.getBoundingClientRect();
		if (top + height + 4 + EXPRESSION_OPERATOR_DROPDOWN_HEIGHT > window.innerHeight) {
			// at top
			setState({visible: true, bottom: window.innerHeight - top + 4, left});
		} else {
			setState({visible: true, top: top + height + 4, left});
		}
	};
	const onOperatorClick = (operator: ParameterExpressionOperator) => (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (expression.operator === operator) {
			return;
		} else {
			expression.operator = operator;
			fire(FilterEventTypes.CONTENT_CHANGED, expression);
			setState({visible: false, top: 0, left: 0});
		}
	};

	const hasRight = expression.operator !== ParameterExpressionOperator.EMPTY
		&& expression.operator !== ParameterExpressionOperator.NOT_EMPTY;

	return <ExpressionOperatorContainer hasRight={hasRight} onClick={onStartClicked} ref={containerRef}>
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