import React from 'react';
import {Parameter} from '../../../../../../services/tuples/factor-calculator-types';
import {PropName, PropValue} from '../dsl-widgets';
import {isConstantParameter} from '../../../../../../services/tuples/parameter-utils';

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