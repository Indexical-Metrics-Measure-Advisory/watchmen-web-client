import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useRef, useState } from 'react';
import { ICON_EDIT } from '../../../../../../basic-widgets/constants';
import { useCollapseFixedThing } from '../../../../../../basic-widgets/utils';
import {
	FilterExpressionOperator,
	SubjectDataSetFilterExpression
} from '../../../../../../services/tuples/subject-types';
import { FilterExpressionOperatorLabels } from '../constants';
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
	FilterExpressionOperator.EMPTY,
	FilterExpressionOperator.NOT_EMPTY,
	FilterExpressionOperator.EQUALS,
	FilterExpressionOperator.NOT_EQUALS,
	FilterExpressionOperator.LESS,
	FilterExpressionOperator.LESS_EQUALS,
	FilterExpressionOperator.MORE,
	FilterExpressionOperator.MORE_EQUALS,
	FilterExpressionOperator.IN,
	FilterExpressionOperator.NOT_IN
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
	const onOperatorClick = (operator: FilterExpressionOperator) => (event: MouseEvent<HTMLDivElement>) => {
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

	return <ExpressionOperatorContainer onClick={onStartClicked} ref={containerRef}>
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