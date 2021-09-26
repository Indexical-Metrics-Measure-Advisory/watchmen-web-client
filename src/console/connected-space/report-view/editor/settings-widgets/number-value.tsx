import React, {ChangeEvent, useEffect, useState} from 'react';
import {PropName, PropValue, PropValueInput, PropValueUnit} from './widgets';

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

	const [delegate, setDelegate] = useState<{ value: string, previousValidValue: string }>({
		value: asString(value, defaultValue),
		previousValidValue: asString(value, defaultValue)
	});
	useEffect(() => {
		setDelegate({value: asString(value, defaultValue), previousValidValue: asString(value, defaultValue)});
	}, [value, defaultValue]);

	const onPropChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setDelegate({...delegate, value});
	};
	const onKeyPressed = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}
		onConfirm();
	};
	const onConfirm = () => {
		const {value: newValue} = delegate;
		if (newValue.trim().length === 0 || validate(newValue)) {
			const value = onValueChange(newValue);
			const strValue = asString(value, defaultValue);
			setDelegate({value: strValue, previousValidValue: strValue});
		} else {
			// reset to original value
			setDelegate({...delegate, value: delegate.previousValidValue});
		}
	};

	return <>
		{label ? <PropName>{label}</PropName> : null}
		<PropValue>
			<PropValueInput value={delegate.value}
			                onChange={onPropChange} onKeyPress={onKeyPressed} onBlur={onConfirm}
			                placeholder={placeholder}/>
			{unitLabel ? <PropValueUnit>{unitLabel}</PropValueUnit> : null}
		</PropValue>
	</>;
};