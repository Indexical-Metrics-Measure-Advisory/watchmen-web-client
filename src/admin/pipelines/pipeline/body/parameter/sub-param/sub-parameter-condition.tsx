import {useParameterEventBus} from '@/data-filter/parameter-event-bus';
import {ParameterEventTypes} from '@/data-filter/parameter-event-bus-types';
import {ComputedParameter, Parameter, ParameterComputeType} from '@/services/tuples/factor-calculator-types';
import {Conditional} from '@/services/tuples/pipeline-super-types';
import {Topic} from '@/services/tuples/topic-types';
import React from 'react';
import {ConditionalEditor} from '../../conditional';
import {SubParameterConditionContainer} from './widgets';

export const SubParameterCondition = (props: {
	parentParameter: ComputedParameter;
	parameter: Parameter;
	topics: Array<Topic>;
}) => {
	const {parentParameter, parameter, topics} = props;

	const {fire} = useParameterEventBus();

	if (parentParameter.type !== ParameterComputeType.CASE_THEN) {
		return null;
	}

	const onConditionChange = () => {
		fire(ParameterEventTypes.CONDITION_CHANGED, parameter);
	};

	return <SubParameterConditionContainer>
		<ConditionalEditor conditional={parameter as Conditional} topics={topics} onChange={onConditionChange}/>
	</SubParameterConditionContainer>;
};