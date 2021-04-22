import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useRef, useState } from 'react';
import { ICON_EDIT } from '../../../../../../basic-widgets/constants';
import { useCollapseFixedThing } from '../../../../../../basic-widgets/utils';
import { ParameterExpressionOperator } from '../../../../../../services/tuples/factor-calculator-types';
import { SubjectDataSetFilterExpression } from '../../../../../../services/tuples/subject-types';
import { FilterExpressionOperatorLabels } from '../../../../../constants/parameter-constants';
import { useFilterEventBus } from '../filter-event-bus';
import { FilterEventTypes } from '../filter-event-bus-types';
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

interface DropdownState {
	visible: boolean;
	top?: number;
	bottom?: number;
	left: number;
}

export const ExpressionOperator = (props: { filter: SubjectDataSetFilterExpression }) => {
	const { filter } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const { fire } = useFilterEventBus();
	const [ state, setState ] = useState<DropdownState>({ visible: false, top: 0, left: 0 });
	useCollapseFixedThing({
		containerRef,
		visible: state.visible,
		hide: () => setState({ visible: false, top: 0, left: 0 })
	});

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

		if (filter.operator === operator) {
			return;
		} else {
			filter.operator = operator;
			fire(FilterEventTypes.CONTENT_CHANGED, filter);
			setState({ visible: false, top: 0, left: 0 });
		}
	};

	const hasRight = filter.operator !== ParameterExpressionOperator.EMPTY
		&& filter.operator !== ParameterExpressionOperator.NOT_EMPTY;

	return <ExpressionOperatorContainer hasRight={hasRight} onClick={onStartClicked} ref={containerRef}>
		<ExpressionOperatorLabel>{FilterExpressionOperatorLabels[filter.operator]}</ExpressionOperatorLabel>
		<ExpressionOperatorIcon>
			<FontAwesomeIcon icon={ICON_EDIT}/>
		</ExpressionOperatorIcon>
		<ExpressionOperatorDropdown {...state}>
			{AvailableOperators.map(operator => {
				return <ExpressionOperatorOption selected={operator === filter.operator}
				                                 onClick={onOperatorClick(operator)}
				                                 key={operator}>
					{FilterExpressionOperatorLabels[operator]}
				</ExpressionOperatorOption>;
			})}
		</ExpressionOperatorDropdown>
	</ExpressionOperatorContainer>;
};