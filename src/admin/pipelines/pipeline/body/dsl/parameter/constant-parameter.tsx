import React from 'react';
import { Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { isConstantParameter } from '../../../../../../services/tuples/factor-calculator-utils';
import { PropName, PropValue } from '../dsl-widgets';

export const ConstantParameterLine = (props: { parameter: Parameter, indent: number }) => {
	const { parameter, indent } = props;

	if (!isConstantParameter(parameter)) {
		return null;
	}

	return <>
		<PropName indent={indent + 1}>value</PropName>
		<PropValue>{parameter.value}</PropValue>
	</>;
};