import React, {useEffect, useState} from 'react';
import {useColorPickerEventBus} from './color-picker-event-bus';
import {ColorPickerEventTypes} from './color-picker-event-bus-types';
import {ColorResult} from './widgets';

export const ColorResultHex = () => {
	const {on, off} = useColorPickerEventBus();
	const [hex, setHex] = useState('');
	useEffect(() => {
		on(ColorPickerEventTypes.RGB_CHANGED, setHex);
		return () => {
			off(ColorPickerEventTypes.RGB_CHANGED, setHex);
		};
	}, [on, off]);

	return <ColorResult>
		<span>RGB:</span>
		<span>{hex.toUpperCase()}</span>
	</ColorResult>;
};