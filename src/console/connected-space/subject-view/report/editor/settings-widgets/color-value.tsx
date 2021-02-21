import React from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { ChartColorPicker } from '../styles/widgets';
import { PropName, PropValue } from './widgets';

export const ColorValue = (props: {
	label: string;
	value?: string;
	defaultValue?: string;
	onValueChange: (value?: string) => void;
}) => {
	const {  label, value, defaultValue = 'rgba(0,0,0,1)', onValueChange } = props;

	const forceUpdate = useForceUpdate();
	const onColorChange = (color?: string) => {
		onValueChange(color);
		forceUpdate();
	};

	const color = value || defaultValue;

	return <>
		<PropName>{label}</PropName>
		<PropValue>
			<ChartColorPicker color={color} onChange={onColorChange}/>
		</PropValue>
	</>;
};