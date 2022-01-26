import {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';

const asString = (value?: string | number, defaultValue?: string | number): string => {
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

export const useHandleInput = <V extends string | number>(options: {
	value?: V;
	defaultValue?: V;
	validate: (value: string) => boolean;
	onValueChange: (value?: string) => V | undefined;
}) => {
	const {value, defaultValue, validate, onValueChange} = options;

	const [delegate, setDelegate] = useState<{ value: string, previousValidValue: string }>({
		value: asString(value, defaultValue),
		previousValidValue: asString(value, defaultValue)
	});
	useEffect(() => {
		setDelegate({value: asString(value, defaultValue), previousValidValue: asString(value, defaultValue)});
	}, [value, defaultValue, validate, onValueChange]);

	const onPropChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setDelegate({...delegate, value});
	};
	const onKeyPressed = async (event: KeyboardEvent<HTMLInputElement>) => {
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

	return {delegate, onChange: onPropChange, onKeyPressed, onBlur: onConfirm};
};