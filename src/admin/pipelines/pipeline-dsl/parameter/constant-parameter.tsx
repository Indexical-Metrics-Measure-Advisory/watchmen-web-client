import {Parameter} from '@/services/data/tuples/factor-calculator-types';
import {isConstantParameter} from '@/services/data/tuples/parameter-utils';
import React from 'react';
import {PropName, PropValue} from '../dsl-widgets';

export const ConstantParameterLine = (props: { parameter: Parameter, inList: boolean, indent: number }) => {
	const {parameter, inList, indent} = props;

	if (!isConstantParameter(parameter)) {
		return null;
	}

	return <>
		{inList ? null : <PropName indent={indent}>value</PropName>}
		<PropValue>{parameter.value}</PropValue>
	</>;
};