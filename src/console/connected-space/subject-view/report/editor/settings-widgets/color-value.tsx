import React, { useState } from 'react';
import { ChartColorPicker } from '../styles/widgets';
import { PropName, PropValue } from './widgets';

export const ColorValue = (props: {
	label: string;
	value?: string;
	defaultValue?: string;
	onValueChange: (value?: string) => void;
}) => {
	const { label, value, defaultValue = 'rgba(255,255,255,0)', onValueChange } = props;

	const [ color, setColor ] = useState(value || defaultValue);
	const onColorChange = (color?: string) => {
		onValueChange(color);
		setColor(color || defaultValue);
	};

	return <>
		<PropName>{label}</PropName>
		<PropValue>
			<ChartColorPicker color={color} onChange={onColorChange}/>
		</PropValue>
	</>;
};