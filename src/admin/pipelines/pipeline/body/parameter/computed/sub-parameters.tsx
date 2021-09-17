import {ComputedParameter, ParameterComputeType, ValueTypes} from '@/services/data/tuples/factor-calculator-types';
import {computeValidTypesForSubParameter} from '@/services/data/tuples/factor-calculator-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import {HierarchicalParameterEventBridge} from '@/widgets/parameter/computed/hierarchical-parameter-event-bridge';
import {useSubParameterChanged} from '@/widgets/parameter/computed/use-computed-parameter';
import {ParameterEventBusProvider} from '@/widgets/parameter/parameter-event-bus';
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
