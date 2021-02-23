import React, { ChangeEvent, useEffect, useState } from 'react';
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

	const [ delegate, setDelegate ] = useState<{ value: string, previousValidValue: string }>({
		value: value || defaultValue || '',
		previousValidValue: value || defaultValue || ''
	});
	useEffect(() => {
		setDelegate({ value: value || defaultValue || '', previousValidValue: value || defaultValue || '' });
	}, [ value ]);

	const onPropChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setDelegate({ ...delegate, value });
	};
	const onKeyPressed = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}
		onConfirm();
	};
	const onConfirm = () => {
		const { value: newValue } = delegate;
		if (!validate || validate(newValue)) {
			onValueChange(newValue);
			setDelegate({ value: newValue || defaultValue || '', previousValidValue: newValue || defaultValue || '' });
		} else {
			// reset to original value
			setDelegate({ ...delegate, value: delegate.previousValidValue });
		}
	};

	return <>
		<PropName>{label}</PropName>
		<PropValue>
			<PropValueInput value={delegate.value}
			                onChange={onPropChange} onKeyPress={onKeyPressed} onBlur={onConfirm}
			                placeholder={placeholder}/>
		</PropValue>
	</>;
};