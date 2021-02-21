import React, { ChangeEvent, useState } from 'react';
import { PropName, PropValue, PropValueInput, PropValueUnit } from './widgets';


const asString = (value?: number, defaultValue?: number): string => {
	let v = value;
	if (v == null) {
		v = defaultValue;
	}
	if (v == null) {
		return '';
	} else {
		return `${v}`;
	}
};
export const NumberValue = (props: {
	label: string;
	unitLabel?: string;
	placeholder?: string;
	value?: number;
	defaultValue?: number;
	validate: (value: string) => boolean;
	onValueChange: (value: string) => number;
}) => {
	const {
		label, unitLabel, placeholder,
		value, defaultValue, validate, onValueChange
	} = props;

	const [ delegate, setDelegate ] = useState<{ value: string }>({ value: asString(value, defaultValue) });
	const onPropChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setDelegate({ value });
	};
	const onKeyPressed = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}
		onConfirm();
	};
	const onConfirm = () => {
		const { value: newValue } = delegate;
		if (validate(newValue)) {
			const value = onValueChange(newValue);
			setDelegate({ value: asString(value, defaultValue) });
		} else {
			// reset to original value
			setDelegate({ value: asString(value, defaultValue) });
		}
	};

	return <>
		<PropName>{label}</PropName>
		<PropValue>
			<PropValueInput value={delegate.value}
			                onChange={onPropChange} onKeyPress={onKeyPressed} onBlur={onConfirm}
			                placeholder={placeholder}/>
			{unitLabel ? <PropValueUnit>{unitLabel}</PropValueUnit> : null}
		</PropValue>
	</>;
};