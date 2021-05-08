import React, {useEffect, useState} from 'react';
import {useColorPickerEventBus} from './color-picker-event-bus';
import {ColorPickerEventTypes} from './color-picker-event-bus-types';
import {ColorResult} from './widgets';

export const ColorResultRgba = () => {
	const {on, off} = useColorPickerEventBus();
	const [color, setColor] = useState('');
	useEffect(() => {
		const onRgbaChanged = (red: number, green: number, blue: number, alpha: number) => {
			const formattedAlpha = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(alpha);
			setColor(`${red}, ${green}, ${blue}, ${formattedAlpha}`);
		};
		on(ColorPickerEventTypes.RGBA_CHANGED, onRgbaChanged);
		return () => {
			off(ColorPickerEventTypes.RGBA_CHANGED, onRgbaChanged);
		};
	}, [on, off]);

	return <ColorResult>
		<span>RGBa:</span>
		<span>{color.toUpperCase()}</span>
	</ColorResult>;
};