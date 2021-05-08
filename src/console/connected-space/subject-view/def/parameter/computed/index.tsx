import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Parameter} from '../../../../../../services/tuples/factor-calculator-types';
import {isComputedParameter} from '../../../../../../services/tuples/factor-calculator-utils';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ParameterComputeTypeEdit} from '../compute-type';
import {useParameterEventBus} from '../parameter-event-bus';
import {ParameterEventTypes} from '../parameter-event-bus-types';
import {SubParameters} from './sub-parameters';
import {ComputedEditContainer} from './widgets';

export const ComputedEdit = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: Parameter
}) => {
	const {availableTopics, pickedTopics, parameter, ...rest} = props;

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

	return <ComputedEditContainer {...rest}>
		<ParameterComputeTypeEdit parameter={parameter}/>
		<SubParameters parameter={parameter}
		               availableTopics={availableTopics} pickedTopics={pickedTopics}
		               notifyChangeToParent={() => fire(ParameterEventTypes.COMPUTE_CONTENT_CHANGED, parameter)}/>
	</ComputedEditContainer>;
};

export const ComputedEditor = styled(ComputedEdit)`
	grid-column : span 4;
`;