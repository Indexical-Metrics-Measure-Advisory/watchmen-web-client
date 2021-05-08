import React, {useState} from 'react';
import {DropdownOption} from '../../../../../../basic-widgets/types';
import {PropName, PropValue, PropValueDropdown} from './widgets';

export const DropdownValue = (props: {
	label: string;
	options: Array<DropdownOption>
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onValueChange: (option: DropdownOption) => void;
}) => {
	const {
		label, options, placeholder,
		value, defaultValue, onValueChange
	} = props;

	const [selection, setSelection] = useState(value || defaultValue);

	const onPropChange = (option: DropdownOption) => {
		onValueChange(option);
		setSelection(option.value);
	};

	return <>
		<PropName>{label}</PropName>
		<PropValue>
			<PropValueDropdown value={selection} options={options}
			                   onChange={onPropChange}
			                   please={placeholder}/>
		</PropValue>
	</>;
};