import {ComputedParameter, Parameter, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {useEffect} from 'react';
import {ParameterFromEditor} from '../param-from';
import {SubParameterEditBody} from './sub-parameter-edit-body';
import {SubParameterEditContainer} from './widgets';

export const SubParameterEdit = (props: {
	topic: Topic;
	parentParameter: ComputedParameter;
	parameter: Parameter;
	onDeleted: () => void;
}) => {
	const {topic, parameter, parentParameter, onDeleted} = props;

	const {on, off} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	return <SubParameterEditContainer shorten={parameter.kind === ParameterKind.COMPUTED}>
		<ParameterFromEditor shorten={parameter.kind === ParameterKind.COMPUTED}
		                     parameter={parameter}/>
		<SubParameterEditBody parameter={parameter} parentParameter={parentParameter}
		                      topic={topic}
		                      onDeleted={onDeleted}/>
	</SubParameterEditContainer>;
};