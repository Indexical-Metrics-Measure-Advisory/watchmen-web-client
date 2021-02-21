import React, { ChangeEvent } from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { PropName, PropValue, PropValueInput } from './widgets';

export const TextValue = (props: {
	label: string;
	placeholder?: string;
	value?: string;
	defaultValue?: string;
	onValueChange: (value: string) => void;
}) => {
	const {
		label, placeholder,
		value, defaultValue, onValueChange
	} = props;

	const forceUpdate = useForceUpdate();

	const onPropChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		onValueChange(value);
		forceUpdate();
	};

	return <>
		<PropName>{label}</PropName>
		<PropValue>
			<PropValueInput value={value || defaultValue}
			                onChange={onPropChange}
			                placeholder={placeholder}/>
		</PropValue>
	</>;
};