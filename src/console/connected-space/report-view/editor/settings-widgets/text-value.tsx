import React from 'react';
import {PropName, PropTextInput, PropValue} from './widgets';

export const TextValue = (props: {
	label?: string;
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	validate?: (value: string) => boolean;
	onValueChange: (value: string) => void;
}) => {
	const {label, placeholder, value, defaultValue, validate, onValueChange} = props;

	const onValidate = (value: string): boolean => {
		return validate ? validate(value) : true;
	};
	const onChange = (value?: string): string | undefined => {
		onValueChange(value ?? '');
		return value ?? '';
	};

	return <>
		{label ? <PropName>{label}</PropName> : null}
		<PropValue>
			<PropTextInput defaultValue={defaultValue} value={value} placeholder={placeholder}
			               validate={onValidate} onValueChange={onChange}/>
		</PropValue>
	</>;
};