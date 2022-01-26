import React, {useEffect, useState} from 'react';
import {Dropdown} from '../basic/dropdown';
import {DropdownOption} from '../basic/types';

export const DropdownValueEditor = (props: {
	options: Array<DropdownOption>
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onValueChange: (option: DropdownOption) => void;
}) => {
	const {options, placeholder, value, defaultValue, onValueChange, ...rest} = props;

	const [selection, setSelection] = useState(value || defaultValue);
	useEffect(() => {
		// any other changed, means whole editor should be force update
		// value must be reset
		setSelection(value || defaultValue);
	}, [onValueChange, options, placeholder, value, defaultValue]);

	const onPropChange = (option: DropdownOption) => {
		onValueChange(option);
		setSelection(option.value);
	};

	return <Dropdown {...rest} value={selection} please={placeholder} options={options} onChange={onPropChange}/>;
};