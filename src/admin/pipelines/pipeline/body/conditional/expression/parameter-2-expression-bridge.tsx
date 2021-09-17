import {useParameterEventBus} from '@/data-filter/parameter-event-bus';
import {ParameterEventTypes} from '@/data-filter/parameter-event-bus-types';
import React, {useEffect} from 'react';

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