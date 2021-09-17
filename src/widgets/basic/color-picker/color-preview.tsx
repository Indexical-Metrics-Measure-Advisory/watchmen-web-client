import React, {useEffect, useState} from 'react';
import {useColorPickerEventBus} from './color-picker-event-bus';
import {ColorPickerEventTypes} from './color-picker-event-bus-types';
import {ColorPreviewContainer} from './widgets';

export const ColorPreview = () => {
	const {on, off} = useColorPickerEventBus();
	const [color, setColor] = useState('');
	useEffect(() => {
		const onRgbaChanged = (red: number, green: number, blue: number, alpha: number) => {
			setColor(`rgba(${red}, ${green}, ${blue}, ${alpha})`);
		};
		on(ColorPickerEventTypes.RGBA_CHANGED, onRgbaChanged);
		return () => {
			off(ColorPickerEventTypes.RGBA_CHANGED, onRgbaChanged);
		};
	}, [on, off]);

	return <ColorPreviewContainer color={color}/>;
};

