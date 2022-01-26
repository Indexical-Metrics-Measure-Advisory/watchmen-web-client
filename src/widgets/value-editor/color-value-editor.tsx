import React, {useEffect, useState} from 'react';
import {ColorPicker} from '../basic/color-picker';

export const ColorValueEditor = (props: {
	value?: string;
	defaultValue?: string;
	onValueChange: (value?: string) => void;
}) => {
	const {value, defaultValue, onValueChange, ...rest} = props;

	const [color, setColor] = useState(value || defaultValue);
	useEffect(() => {
		// any other changed, means whole editor should be force update
		// value must be reset
		setColor(value || defaultValue);
	}, [onValueChange, value, defaultValue]);

	const onColorChange = (color?: string) => {
		onValueChange(color);
		setColor(color || defaultValue);
	};

	return <ColorPicker {...rest} color={color} onChange={onColorChange}/>;
};