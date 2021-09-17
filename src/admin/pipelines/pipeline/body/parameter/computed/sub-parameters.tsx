import {HierarchicalParameterEventBridge} from '@/data-filter/computed/hierarchical-parameter-event-bridge';
import {useSubParameterChanged} from '@/data-filter/computed/use-computed-parameter';
import {ParameterEventBusProvider} from '@/data-filter/parameter-event-bus';
import {ComputedParameter, ParameterComputeType, ValueTypes} from '@/services/tuples/factor-calculator-types';
import {computeValidTypesForSubParameter} from '@/services/tuples/factor-calculator-utils';
import {Topic} from '@/services/tuples/topic-types';
import React from 'react';
import {v4} from 'uuid';
import {SubParameterEditor} from '../sub-param';
import {SubParameterAdd} from '../sub-param/sub-parameter-add';
import {SubParametersContainer} from './widgets';

export const SubParameters = (props: {
	parameter: ComputedParameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
	expectArray: boolean;
	notifyChangeToParent: () => void;
}) => {
	const {parameter, topics, expectedTypes: expectedTypesOfParameter, expectArray, notifyChangeToParent} = props;

	const {onDeleted, onAdded} = useSubParameterChanged();

	const expectedTypesOfSubParameters = computeValidTypesForSubParameter(parameter.type, expectedTypesOfParameter);
	const expectArrayOfSubParameters = expectArray && parameter.type === ParameterComputeType.CASE_THEN;

	return <SubParametersContainer>
		{parameter.parameters.map(sub => {
			return <ParameterEventBusProvider key={v4()}>
				<HierarchicalParameterEventBridge notifyChangeToParent={notifyChangeToParent}/>
				<SubParameterEditor parameter={sub} parentParameter={parameter}
				                    topics={topics}
				                    expectedTypes={expectedTypesOfSubParameters}
				                    expectArray={expectArrayOfSubParameters}
				                    onDeleted={onDeleted(sub)}/>
			</ParameterEventBusProvider>;
		})}
		<SubParameterAdd parentParameter={parameter} onAdded={onAdded()}/>
	</SubParametersContainer>;
};
