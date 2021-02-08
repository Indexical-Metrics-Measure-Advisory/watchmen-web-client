import React, { useEffect } from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { ComputedParameter, Parameter, ParameterFrom } from '../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { SubParameterEditBody } from './sub-parameter-edit-body';
import { SubParameterEditContainer } from '../computed/widgets';
import { ParameterFromEditor } from '../param-from';
import { useParameterEventBus } from '../parameter-event-bus';
import { ParameterEventTypes } from '../parameter-event-bus-types';

export const SubParameterEdit = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parentParameter: ComputedParameter;
	parameter: Parameter;
	onDeleted: () => void;
}) => {
	const {
		availableTopics, pickedTopics,
		parameter, parentParameter,
		onDeleted
	} = props;

	const { on, off } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <SubParameterEditContainer shorten={parameter.from === ParameterFrom.COMPUTED}>
		<ParameterFromEditor parameter={parameter}/>
		<SubParameterEditBody parameter={parameter} parentParameter={parentParameter}
		                      availableTopics={availableTopics} pickedTopics={pickedTopics}
		                      onDeleted={onDeleted}/>
	</SubParameterEditContainer>;
};