import React from 'react';
import { Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ParamFrom, PropName, PropNameInListFirst } from '../dsl-widgets';
import { ComputeParameterLine } from './compute-parameter';
import { ConstantParameterLine } from './constant-parameter';
import { TopicFactorParameterLine } from './topic-factor-parameter';

export const ParameterLines = (props: {
	parameter: Parameter;
	topicsMap: Map<string, Topic>;
	inList?: boolean;
	indent: number;
}) => {
	const { parameter, topicsMap, inList = false, indent } = props;

	return <>
		{inList
			? <PropNameInListFirst indent={indent}>from</PropNameInListFirst>
			: <PropName indent={indent}>from</PropName>}
		<ParamFrom>{parameter.from}</ParamFrom>
		<ComputeParameterLine parameter={parameter} topicsMap={topicsMap} indent={indent + 1}/>
		<TopicFactorParameterLine parameter={parameter} topicsMap={topicsMap} indent={indent + 1}/>
		<ConstantParameterLine parameter={parameter} indent={indent + 1}/>
	</>;
};