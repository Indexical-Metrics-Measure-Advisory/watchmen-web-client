import React from 'react';
import {PropName, PropValue, PropValueColorPicker} from './widgets';

export const ColorValue = (props: {
	label?: string;
	value?: string;
	defaultValue?: string;
	onValueChange: (value?: string) => void;
}) => {
	const {label, value, defaultValue, onValueChange} = props;

	return <>
		{label ? <PropName>{label}</PropName> : null}
		<PropValue>
			<PropValueColorPicker defaultValue={defaultValue} value={value} onValueChange={onValueChange}/>
		</PropValue>
	</>;
};