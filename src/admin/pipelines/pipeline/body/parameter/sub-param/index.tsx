import {ComputedParameter, Parameter, ParameterKind, ValueTypes} from '@/services/data/tuples/factor-calculator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {useEffect} from 'react';
import {ParameterFromEditor} from '../param-from';
import {SubParameterCondition} from './sub-parameter-condition';
import {SubParameterEditBody} from './sub-parameter-edit-body';
import {SubParameterEditContainer} from './widgets';

export const SubParameterEditor = (props: {
	parentParameter: ComputedParameter;
	parameter: Parameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
	expectArray: boolean;
	onDeleted: () => void;
}) => {
	const {
		parameter, parentParameter,
		topics, expectedTypes, expectArray,
		onDeleted
	} = props;

	const {on, off} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	return <SubParameterEditContainer shorten={parameter.kind === ParameterKind.COMPUTED}>
		<SubParameterCondition parentParameter={parentParameter} parameter={parameter} topics={topics}/>
		<ParameterFromEditor parameter={parameter}/>
		<SubParameterEditBody parameter={parameter} parentParameter={parentParameter}
		                      topics={topics} expectedTypes={expectedTypes} expectArray={expectArray}
		                      onDeleted={onDeleted}/>
	</SubParameterEditContainer>;
};