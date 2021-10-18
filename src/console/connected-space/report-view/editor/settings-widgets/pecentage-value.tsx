import React from 'react';
import {PropName, PropPercentageInput, PropValue, PropValueUnit} from './widgets';

export const PercentageValue = (props: {
	label: string;
	unitLabel?: string;
	placeholder?: string;
	value?: number | string;
	defaultValue?: number | string;
	validate: (value: string) => boolean;
	onValueChange: (value?: string) => number | string | undefined;
}) => {
	const {
		label, unitLabel, placeholder,
		value, defaultValue, validate, onValueChange
	} = props;

	return <>
		{label ? <PropName>{label}</PropName> : null}
		<PropValue>
			<PropPercentageInput defaultValue={defaultValue} value={value} placeholder={placeholder}
			                     validate={validate} onValueChange={onValueChange}/>
			{unitLabel ? <PropValueUnit>{unitLabel}</PropValueUnit> : null}
		</PropValue>
	</>;
};