import React, {Fragment, useEffect} from 'react';
import {useExpressionEventBus} from '../event-bus/expression-event-bus';
import {ExpressionEventTypes} from '../event-bus/expression-event-bus-types';

export const Expression2ParentBridge = (props: { onChange: () => void }) => {
	const {onChange} = props;

	const {on, off} = useExpressionEventBus();
	useEffect(() => {
		on(ExpressionEventTypes.LEFT_CHANGED, onChange);
		on(ExpressionEventTypes.OPERATOR_CHANGED, onChange);
		on(ExpressionEventTypes.RIGHT_CHANGED, onChange);
		return () => {
			off(ExpressionEventTypes.LEFT_CHANGED, onChange);
			off(ExpressionEventTypes.OPERATOR_CHANGED, onChange);
			off(ExpressionEventTypes.RIGHT_CHANGED, onChange);
		};
	}, [on, off, onChange]);

	return <Fragment/>;
};