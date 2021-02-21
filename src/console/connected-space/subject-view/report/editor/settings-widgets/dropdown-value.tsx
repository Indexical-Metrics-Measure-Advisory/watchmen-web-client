import React from 'react';
import { DropdownOption } from '../../../../../../basic-widgets/types';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { PropName, PropValue, PropValueDropdown } from './widgets';

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

	const forceUpdate = useForceUpdate();

	const onPropChange = (option: DropdownOption) => {
		onValueChange(option);
		forceUpdate();
	};

	return <>
		<PropName>{label}</PropName>
		<PropValue>
			<PropValueDropdown value={value || defaultValue} options={options}
			                   onChange={onPropChange}
			                   please={placeholder}/>
		</PropValue>
	</>;
};