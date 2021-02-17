import React from 'react';
import { Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { isComputedParameter } from '../../../../../../services/tuples/factor-calculator-utils';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { PropName, ComputeType } from '../dsl-widgets';
import { ParameterLines } from './index';

export const ComputeParameterLine = (props: { parameter: Parameter, topicsMap: Map<string, Topic>, indent: number }) => {
	const { parameter, topicsMap, indent } = props;

	if (!isComputedParameter(parameter)) {
		return null;
	}

	return <>
		<PropName indent={indent}>type</PropName>
		<ComputeType>{parameter.type}</ComputeType>
		<PropName indent={indent}>parameters</PropName>
		{parameter.parameters.map((sub) => {
			return <ParameterLines parameter={sub} topicsMap={topicsMap}
			                       inList={true}
			                       indent={indent + 1}/>;
		})}
	</>;
};