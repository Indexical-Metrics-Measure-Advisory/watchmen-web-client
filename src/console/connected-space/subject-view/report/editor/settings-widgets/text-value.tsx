import React, { ChangeEvent, useState } from 'react';
import { PropName, PropValue, PropValueInput } from './widgets';

export const TextValue = (props: {
	label: string;
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	validate?: (value: string) => boolean;
	onValueChange: (value: string) => void;
}) => {
	const {
		label, placeholder,
		value, defaultValue, validate, onValueChange
	} = props;

	const [ delegate, setDelegate ] = useState<{ value: string }>({ value: value || defaultValue || '' });
	const onPropChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setDelegate({ value });
	};
	const onPropBlur = () => {
		const { value: newValue } = delegate;
		if (!validate || validate(newValue)) {
			onValueChange(newValue);
			setDelegate({ value: newValue || defaultValue || '' });
		} else {
			// reset to original value
			setDelegate({ value: value || defaultValue || '' });
		}
	};

	return <>
		<PropName>{label}</PropName>
		<PropValue>
			<PropValueInput value={delegate.value}
			                onChange={onPropChange} onBlur={onPropBlur}
			                placeholder={placeholder}/>
		</PropValue>
	</>;
};