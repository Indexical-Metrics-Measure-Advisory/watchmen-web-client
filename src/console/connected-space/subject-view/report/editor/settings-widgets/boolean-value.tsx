import React, { useState } from 'react';
import { PropName, PropValue, PropValueCheckBox } from './widgets';

export const BooleanValue = (props: {
	label: string;
	value?: boolean;
	defaultValue?: boolean;
	onValueChange: (value: boolean) => void;
}) => {
	const {
		label,
		value, defaultValue, onValueChange
	} = props;

	const [ delegate, setDelegate ] = useState<{ value: boolean }>({ value: value || defaultValue || false });
	const onPropChange = (value: boolean) => {
		onValueChange(value);
		setDelegate({ value });
	};

	return <>
		<PropName>{label}</PropName>
		<PropValue>
			<PropValueCheckBox value={delegate.value} onChange={onPropChange}/>
		</PropValue>
	</>;
};