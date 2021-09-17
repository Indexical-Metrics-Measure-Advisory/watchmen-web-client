import {Parameter, ValueTypes} from '@/services/data/tuples/factor-calculator-types';
import {isComputedParameter} from '@/services/data/tuples/parameter-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import {
	useComputedParameterFromChanged,
	useDelegateComputedParameterChildChangedToMe
} from '@/widgets/parameter/computed/use-computed-parameter';
import React from 'react';
import {ParameterComputeTypeEditor} from '../compute-type';
import {SubParameters} from './sub-parameters';
import {ComputedEditContainer} from './widgets';

export const ComputedEditor = (props: {
	parameter: Parameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
	expectArray: boolean;
}) => {
	const {parameter, topics, expectedTypes, expectArray} = props;

	useComputedParameterFromChanged();
	const notifyChangeToParent = useDelegateComputedParameterChildChangedToMe(parameter);

	if (!isComputedParameter(parameter)) {
		return null;
	}

	return <ComputedEditContainer>
		<ParameterComputeTypeEditor parameter={parameter} expectedTypes={expectedTypes}/>
		<SubParameters parameter={parameter}
		               topics={topics} expectedTypes={expectedTypes} expectArray={expectArray}
		               notifyChangeToParent={notifyChangeToParent}/>
	</ComputedEditContainer>;
};
