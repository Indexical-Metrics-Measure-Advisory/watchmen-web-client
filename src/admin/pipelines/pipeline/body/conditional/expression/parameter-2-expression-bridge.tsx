import React, {useEffect} from 'react';
import {useParameterEventBus} from '../../parameter/parameter/parameter-event-bus';
import {ParameterEventTypes} from '../../parameter/parameter/parameter-event-bus-types';

export const Parameter2ExpressionBridge = (props: { onChange: () => void }) => {
	const {onChange} = props;

	const {on, off} = useParameterEventBus();
	useEffect(() => {
		on(ParameterEventTypes.PARAM_CHANGED, onChange);
		return () => {
			off(ParameterEventTypes.PARAM_CHANGED, onChange);
		};
	}, [on, off, onChange]);

	return <></>;
};