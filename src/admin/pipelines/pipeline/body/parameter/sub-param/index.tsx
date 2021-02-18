import React, { useEffect } from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { ComputedParameter, Parameter, ParameterFrom } from '../../../../../../services/tuples/factor-calculator-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ParameterFromEditor } from '../param-from';
import { useParameterEventBus } from '../parameter/parameter-event-bus';
import { ParameterEventTypes } from '../parameter/parameter-event-bus-types';
import { SubParameterEditBody } from './sub-parameter-edit-body';
import { SubParameterEditContainer } from './widgets';

export const SubParameterEditor = (props: {
	parentParameter: ComputedParameter;
	parameter: Parameter;
	topics: Array<Topic>;
	onDeleted: () => void;
}) => {
	const {
		parameter, parentParameter,
		topics,
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
		                      topics={topics}
		                      onDeleted={onDeleted}/>
	</SubParameterEditContainer>;
};