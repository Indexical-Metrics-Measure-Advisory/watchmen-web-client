import {DropdownOption} from '@/widgets/basic/types';
import React from 'react';
import {PropName, PropValue, PropValueDropdown} from './widgets';

export const DropdownValue = (props: {
	label?: string;
	options: Array<DropdownOption>
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onValueChange: (option: DropdownOption) => void;
}) => {
	const {label, options, placeholder, value, defaultValue, onValueChange} = props;

	return <>
		{label ? <PropName>{label}</PropName> : null}
		<PropValue>
			<PropValueDropdown value={value} defaultValue={defaultValue} options={options}
			                   placeholder={placeholder} onValueChange={onValueChange}/>
		</PropValue>
	</>;
};