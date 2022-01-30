import {ComputedParameter, Parameter, ParameterComputeType} from '@/services/data/tuples/factor-calculator-types';
import {Conditional} from '@/services/data/tuples/pipeline-super-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React from 'react';
import {ConditionalEditor} from '../../conditional';
import {SubParameterConditionContainer} from './widgets';

export const SubParameterCondition = (props: {
	parentParameter: ComputedParameter;
	parameter: Parameter;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {parentParameter, parameter, availableTopics, pickedTopics} = props;

	const {fire} = useParameterEventBus();

	if (parentParameter.type !== ParameterComputeType.CASE_THEN) {
		return null;
	}

	const onConditionChange = () => {
		fire(ParameterEventTypes.CONDITION_CHANGED, parameter);
	};

	return <SubParameterConditionContainer>
		<ConditionalEditor conditional={parameter as Conditional}
		                   availableTopics={availableTopics} pickedTopics={pickedTopics}
		                   onChange={onConditionChange}/>
	</SubParameterConditionContainer>;
};