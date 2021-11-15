import React, {useState} from 'react';
import {ColorPicker} from '../basic/color-picker';

export const ColorValueEditor = (props: {
	value?: string;
	defaultValue?: string;
	onValueChange: (value?: string) => void;
}) => {
	const {value, defaultValue, onValueChange, ...rest} = props;

	const [color, setColor] = useState(value || defaultValue);
	const onColorChange = (color?: string) => {
		onValueChange(color);
		setColor(color || defaultValue);
	};

	return <ColorPicker {...rest} color={color} onChange={onColorChange}/>;
};