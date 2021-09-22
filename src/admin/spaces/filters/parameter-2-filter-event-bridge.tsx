import {ParameterExpression} from '@/services/data/tuples/factor-calculator-types';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {Fragment, useEffect} from 'react';
import {useFilterEventBus} from './filter-event-bus';
import {FilterEventTypes} from './filter-event-bus-types';

export const Parameter2FilterEventBridge = (props: { expression: ParameterExpression }) => {
	const {expression} = props;

	const {fire: fireFilter} = useFilterEventBus();
	const {on, off} = useParameterEventBus();
	useEffect(() => {
		const onParamChanged = () => {
			fireFilter(FilterEventTypes.CONTENT_CHANGED, expression);
		};
		on(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		return () => {
			off(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		};
	}, [on, off, fireFilter, expression]);

	return <Fragment/>;
};