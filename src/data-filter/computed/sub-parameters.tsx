import {ComputedParameter} from '@/services/tuples/factor-calculator-types';
import {Topic} from '@/services/tuples/topic-types';
import React from 'react';
import {v4} from 'uuid';
import {ParameterEventBusProvider} from '../parameter-event-bus';
import {SubParameterEdit} from '../sub-param';
import {SubParameterAdd} from '../sub-param/sub-parameter-add';
import {HierarchicalParameterEventBridge} from './hierarchical-parameter-event-bridge';
import {useSubParameterChanged} from './use-computed-parameter';
import {SubParametersContainer} from './widgets';

export const SubParameters = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: ComputedParameter;
	notifyChangeToParent: () => void;
}) => {
	const {availableTopics, pickedTopics, parameter, notifyChangeToParent} = props;

	const {onDeleted, onAdded} = useSubParameterChanged();

	return <SubParametersContainer>
		{parameter.parameters.map(sub => {
			return <ParameterEventBusProvider key={v4()}>
				<HierarchicalParameterEventBridge notifyChangeToParent={notifyChangeToParent}/>
				<SubParameterEdit parameter={sub} parentParameter={parameter}
				                  availableTopics={availableTopics} pickedTopics={pickedTopics}
				                  onDeleted={onDeleted(sub)}/>
			</ParameterEventBusProvider>;
		})}
		<SubParameterAdd parentParameter={parameter} onAdded={onAdded()}/>
	</SubParametersContainer>;
};
