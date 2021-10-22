import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {Fragment, useEffect} from 'react';

export const Parameter2ExpressionBridge = (props: { onChange: () => void }) => {
	const {onChange} = props;

	const {on, off} = useParameterEventBus();
	useEffect(() => {
		on(ParameterEventTypes.PARAM_CHANGED, onChange);
		return () => {
			off(ParameterEventTypes.PARAM_CHANGED, onChange);
		};
	}, [on, off, onChange]);

	return <Fragment/>;
};