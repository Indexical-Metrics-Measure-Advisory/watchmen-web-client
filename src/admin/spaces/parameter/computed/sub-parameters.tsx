import {ComputedParameter} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {HierarchicalParameterEventBridge} from '@/widgets/parameter/computed/hierarchical-parameter-event-bridge';
import {useSubParameterChanged} from '@/widgets/parameter/computed/use-computed-parameter';
import {ParameterEventBusProvider} from '@/widgets/parameter/parameter-event-bus';
import React from 'react';
import {v4} from 'uuid';
import {SubParameterEdit} from '../sub-param';
import {SubParameterAdd} from '../sub-param/sub-parameter-add';
import {SubParametersContainer} from './widgets';

export const SubParameters = (props: {
	topic: Topic;
	parameter: ComputedParameter;
	notifyChangeToParent: () => void;
}) => {
	const {topic, parameter, notifyChangeToParent} = props;

	const {onDeleted, onAdded} = useSubParameterChanged();

	return <SubParametersContainer>
		{parameter.parameters.map(sub => {
			return <ParameterEventBusProvider key={v4()}>
				<HierarchicalParameterEventBridge notifyChangeToParent={notifyChangeToParent}/>
				<SubParameterEdit parameter={sub} parentParameter={parameter} topic={topic} onDeleted={onDeleted(sub)}/>
			</ParameterEventBusProvider>;
		})}
		<SubParameterAdd parentParameter={parameter} onAdded={onAdded()}/>
	</SubParametersContainer>;
};
