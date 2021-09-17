import {Parameter, ParameterComputeType} from '@/services/data/tuples/factor-calculator-types';
import {isComputedParameter} from '@/services/data/tuples/parameter-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {Fragment} from 'react';
import {v4} from 'uuid';
import {ComputeType, PropName, PropValue, Whitespace} from '../dsl-widgets';
import {JointLine} from '../joint/joint';
import {ParameterLines} from './index';

export const ComputeParameterLine = (props: { parameter: Parameter, topicsMap: Map<string, Topic>, inList: boolean, indent: number }) => {
	const {parameter, topicsMap, inList, indent} = props;

	if (!isComputedParameter(parameter)) {
		return null;
	}

	if (parameter.type === ParameterComputeType.CASE_THEN) {
		return <>
			{inList ? null : <PropName indent={indent}>func</PropName>}
			<ComputeType>case(</ComputeType>
			{parameter.parameters.map((sub, subIndex, params) => {
				return <Fragment key={v4()}>
					{subIndex !== 0 ? <Whitespace/> : null}
					{sub.conditional
						? <>
							<ComputeType>when</ComputeType>
							<Whitespace/>
							<JointLine joint={sub.on} topicsMap={topicsMap} indent={indent}/>
							<Whitespace/>
							<ComputeType>then</ComputeType>
							<Whitespace/>
							<ParameterLines parameter={sub} topicsMap={topicsMap}
							                inList={true}
							                indent={indent + 1}/>
						</>
						: <>
							<ComputeType data-incorrect={subIndex !== params.length - 1}>else</ComputeType>
							<Whitespace/>
							<ParameterLines parameter={sub} topicsMap={topicsMap}
							                inList={true}
							                indent={indent + 1}/>
						</>}
				</Fragment>;
			})}
			<Whitespace/>
			<ComputeType>end)</ComputeType>
		</>;
	}

	return <>
		{inList ? null : <PropName indent={indent}>func</PropName>}
		<ComputeType>{parameter.type}(</ComputeType>
		{parameter.parameters.map((sub, subIndex) => {
			return <Fragment key={v4()}>
				{subIndex !== 0
					? <>
						<PropValue>,</PropValue>
						<Whitespace/>
					</>
					: null}
				<ParameterLines parameter={sub} topicsMap={topicsMap}
				                inList={true}
				                indent={indent + 1}/>
			</Fragment>;
		})}
		<ComputeType>)</ComputeType>
	</>;
};