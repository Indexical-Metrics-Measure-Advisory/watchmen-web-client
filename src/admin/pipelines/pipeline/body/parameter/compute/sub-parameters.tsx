import React, {useEffect} from 'react';
import {v4} from 'uuid';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {ComputedParameter, Parameter, ValueTypes} from '../../../../../../services/tuples/factor-calculator-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ParameterEventBusProvider, useParameterEventBus} from '../parameter/parameter-event-bus';
import {ParameterEventTypes} from '../parameter/parameter-event-bus-types';
import {SubParameterEditor} from '../sub-param';
import {SubParameterAdd} from '../sub-param/sub-parameter-add';
import {HierarchicalParameterEventBridge} from './hierarchical-parameter-event-bridge';
import {SubParametersContainer} from './widgets';
import {computeValidTypesForSubParameter} from '../../../../../../services/tuples/factor-calculator-utils';

export const SubParameters = (props: {
	parameter: ComputedParameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
	notifyChangeToParent: () => void;
}) => {
	const {parameter, topics, expectedTypes: expectedTypesOfParameter, notifyChangeToParent} = props;

	const {on, off, fire} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.COMPUTE_TYPE_CHANGED, forceUpdate);
		on(ParameterEventTypes.COMPUTE_PARAMETER_ADDED, forceUpdate);
		on(ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, forceUpdate);
		return () => {
			off(ParameterEventTypes.COMPUTE_TYPE_CHANGED, forceUpdate);
			off(ParameterEventTypes.COMPUTE_PARAMETER_ADDED, forceUpdate);
			off(ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const expectedTypesOfSubParameters = computeValidTypesForSubParameter(parameter.type, expectedTypesOfParameter);

	return <SubParametersContainer>
		{parameter.parameters.map(sub => {
			return <ParameterEventBusProvider key={v4()}>
				<HierarchicalParameterEventBridge notifyChangeToParent={notifyChangeToParent}/>
				<SubParameterEditor parameter={sub} parentParameter={parameter}
				                    topics={topics} expectedTypes={expectedTypesOfSubParameters}
				                    onDeleted={() => fire(ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, sub)}/>
			</ParameterEventBusProvider>;
		})}
		<SubParameterAdd parentParameter={parameter}
		                 onAdded={(parameter: Parameter) => fire(ParameterEventTypes.COMPUTE_PARAMETER_ADDED, parameter)}/>
	</SubParametersContainer>;
};
