import React, {useEffect} from 'react';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Parameter, ValueTypes} from '../../../../../../services/tuples/factor-calculator-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ParameterComputeTypeEditor} from '../compute-type';
import {useParameterEventBus} from '../parameter/parameter-event-bus';
import {ParameterEventTypes} from '../parameter/parameter-event-bus-types';
import {SubParameters} from './sub-parameters';
import {ComputedEditContainer} from './widgets';
import {isComputedParameter} from '../../../../../../services/tuples/parameter-utils';

export const ComputedEditor = (props: {
	parameter: Parameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
	expectArray: boolean;
}) => {
	const {parameter, topics, expectedTypes, expectArray} = props;

	const {on, off, fire} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	// all changes occurred in children, will be translated to content change event
	useEffect(() => {
		const onComputeChanged = (param: Parameter) => {
			if (param !== parameter) {
				// my children, proxy to my content change event and fire
				fire(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, parameter);
			}
		};
		on(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, onComputeChanged);
		return () => {
			off(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, onComputeChanged);
		};
	}, [on, off, fire, parameter]);

	if (!isComputedParameter(parameter)) {
		return null;
	}

	return <ComputedEditContainer>
		<ParameterComputeTypeEditor parameter={parameter} expectedTypes={expectedTypes}/>
		<SubParameters parameter={parameter}
		               topics={topics} expectedTypes={expectedTypes} expectArray={expectArray}
		               notifyChangeToParent={() => fire(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, parameter)}/>
	</ComputedEditContainer>;
};
