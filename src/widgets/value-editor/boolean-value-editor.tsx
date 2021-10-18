import React, {useState} from 'react';
import {CheckBox} from '../basic/checkbox';

export const BooleanValueEditor = (props: {
	value?: boolean;
	defaultValue?: boolean;
	onValueChange: (value: boolean) => void;
}) => {
	const {value, defaultValue, onValueChange, ...rest} = props;

	const [delegate, setDelegate] = useState<{ value: boolean }>({value: value || defaultValue || false});
	const onPropChange = (value: boolean) => {
		onValueChange(value);
		setDelegate({value});
	};

	return <CheckBox {...rest} value={delegate.value} onChange={onPropChange}/>;
};