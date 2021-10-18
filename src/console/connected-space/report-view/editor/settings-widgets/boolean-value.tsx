import React from 'react';
import {PropName, PropValue, PropValueCheckBox} from './widgets';

export const BooleanValue = (props: {
	label?: string;
	value?: boolean;
	defaultValue?: boolean;
	onValueChange: (value: boolean) => void;
}) => {
	const {label, value, defaultValue, onValueChange} = props;

	return <>
		{label ? <PropName>{label}</PropName> : null}
		<PropValue>
			<PropValueCheckBox value={value} defaultValue={defaultValue} onValueChange={onValueChange}/>
		</PropValue>
	</>;
};