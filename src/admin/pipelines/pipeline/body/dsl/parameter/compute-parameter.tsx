import React from 'react';
import { Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { isComputedParameter } from '../../../../../../services/tuples/factor-calculator-utils';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ComputeType, PropName, PropValue } from '../dsl-widgets';
import { ParameterLines } from './index';

export const ComputeParameterLine = (props: { parameter: Parameter, topicsMap: Map<string, Topic>, inList: boolean, indent: number }) => {
	const { parameter, topicsMap, inList, indent } = props;

	if (!isComputedParameter(parameter)) {
		return null;
	}

	return <>
		{inList ? null : <PropName indent={indent}>func</PropName>}
		<ComputeType>{parameter.type}(</ComputeType>
		{parameter.parameters.map((sub, subIndex) => {
			return <>
				{subIndex !== 0 ? <PropValue>, </PropValue> : null}
				<ParameterLines parameter={sub} topicsMap={topicsMap}
				                inList={true}
				                indent={indent + 1}/>
			</>;
		})}
		<ComputeType>)</ComputeType>
	</>;
};