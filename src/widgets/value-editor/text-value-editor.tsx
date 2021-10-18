import React from 'react';
import {Input} from '../basic/input';
import {useHandleInput} from './use-handle-input';

export const TextValueEditor = (props: {
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	validate: (value: string) => boolean;
	onValueChange: (value?: string) => string | undefined;
}) => {
	const {placeholder, value, defaultValue, validate, onValueChange, ...rest} = props;

	const {delegate, onChange, onKeyPressed, onBlur} = useHandleInput<number | string>({
		value,
		defaultValue,
		validate,
		onValueChange
	});

	return <Input {...rest} value={delegate.value} onChange={onChange} onKeyPress={onKeyPressed} onBlur={onBlur}
	              placeholder={placeholder}/>;
};