import {Parameter} from '@/services/data/tuples/factor-calculator-types';
import {isComputedParameter} from '@/services/data/tuples/parameter-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import {
	useComputedParameterFromChanged,
	useDelegateComputedParameterChildChangedToMe
} from '@/widgets/parameter/computed/use-computed-parameter';
import React from 'react';
import styled from 'styled-components';
import {ParameterComputeTypeEdit} from '../compute-type';
import {SubParameters} from './sub-parameters';
import {ComputedEditContainer} from './widgets';

const ComputedEdit = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: Parameter
}) => {
	const {availableTopics, pickedTopics, parameter, ...rest} = props;

	useComputedParameterFromChanged();
	const notifyChangeToParent = useDelegateComputedParameterChildChangedToMe(parameter);

	if (!isComputedParameter(parameter)) {
		return null;
	}

	return <ComputedEditContainer {...rest}>
		<ParameterComputeTypeEdit parameter={parameter}/>
		<SubParameters parameter={parameter}
		               availableTopics={availableTopics} pickedTopics={pickedTopics}
		               notifyChangeToParent={notifyChangeToParent}/>
	</ComputedEditContainer>;
};

export const ComputedEditor = styled(ComputedEdit)`
	grid-column : span 4;
`;