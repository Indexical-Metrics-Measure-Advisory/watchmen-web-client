import React from 'react';
import {Input} from '../basic/input';
import {useHandleInput} from './use-handle-input';

export const NumberValueEditor = (props: {
	placeholder?: string;
	value?: number;
	defaultValue?: number;
	validate: (value: string) => boolean;
	onValueChange: (value?: string) => number | undefined;
}) => {
	const {placeholder, value, defaultValue, validate, onValueChange, ...rest} = props;

	const {delegate, onChange, onKeyPressed, onBlur} = useHandleInput<number>({
		value,
		defaultValue,
		validate,
		onValueChange
	});

	return <Input {...rest} value={delegate.value} onChange={onChange} onKeyPress={onKeyPressed} onBlur={onBlur}
	              placeholder={placeholder}/>;
};