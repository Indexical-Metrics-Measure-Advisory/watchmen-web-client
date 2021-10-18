import React from 'react';
import {PropName, PropNumberInput, PropValue, PropValueUnit} from './widgets';

export const NumberValue = (props: {
	label?: string;
	unitLabel?: string;
	placeholder?: string;
	value?: number;
	defaultValue?: number;
	validate: (value: string) => boolean;
	onValueChange: (value?: string) => number | undefined;
}) => {
	const {
		label, unitLabel, placeholder,
		value, defaultValue, validate, onValueChange
	} = props;

	return <>
		{label ? <PropName>{label}</PropName> : null}
		<PropValue>
			<PropNumberInput defaultValue={defaultValue} value={value} placeholder={placeholder}
			                 validate={validate} onValueChange={onValueChange}/>
			{unitLabel ? <PropValueUnit>{unitLabel}</PropValueUnit> : null}
		</PropValue>
	</>;
};