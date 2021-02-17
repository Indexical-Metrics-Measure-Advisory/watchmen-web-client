import React from 'react';
import { Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ParamFrom, PropName } from '../dsl-widgets';
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
			? null
			: <>
				<PropName indent={indent}>parameter-type</PropName>
				<ParamFrom>{parameter.from}</ParamFrom>
			</>}
		<ComputeParameterLine parameter={parameter} topicsMap={topicsMap} inList={inList} indent={indent}/>
		<TopicFactorParameterLine parameter={parameter} topicsMap={topicsMap} inList={inList} indent={indent}/>
		<ConstantParameterLine parameter={parameter} inList={inList} indent={indent}/>
	</>;
};