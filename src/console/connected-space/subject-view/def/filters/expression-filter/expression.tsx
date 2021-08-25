import React, {useEffect} from 'react';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Parameter, ParameterKind} from '../../../../../../services/tuples/factor-calculator-types';
import {SubjectDataSetFilterExpression} from '../../../../../../services/tuples/subject-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ComputedEditor} from '../../../../../../data-filter/computed';
import {ConstantValueEditor} from '../../../../../../data-filter/constant';
import {ParameterEventBusProvider, useParameterEventBus} from '../../../../../../data-filter/parameter-event-bus';
import {ParameterEventTypes} from '../../../../../../data-filter/parameter-event-bus-types';
import {TopicFactorEditor} from '../../../../../../data-filter/topic-factor';
import {Parameter2FilterEventBridge} from '../parameter-2-filter-event-bridge';
import {ExpressionSide, ParameterFromEditorForExpression} from './widgets';

export const ExpressionBody = (props: {
	filter: SubjectDataSetFilterExpression;
	parameter: Parameter
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	visible: boolean;
}) => {
	const {
		filter, parameter,
		availableTopics, pickedTopics,
		visible
	} = props;

	const {on, off} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	return <ExpressionSide shorten={parameter.kind === ParameterKind.COMPUTED} visible={visible}>
		<ParameterFromEditorForExpression shorten={parameter.kind === ParameterKind.COMPUTED}
		                                  parameter={parameter}/>
		<ConstantValueEditor parameter={parameter}/>
		<TopicFactorEditor parameter={parameter}
		                   availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<ComputedEditor parameter={parameter}
		                availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<Parameter2FilterEventBridge filter={filter}/>
	</ExpressionSide>;
};

export const Expression = (props: {
	filter: SubjectDataSetFilterExpression;
	parameter: Parameter
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	visible: boolean;
}) => {
	return <ParameterEventBusProvider>
		<ExpressionBody {...props}/>
	</ParameterEventBusProvider>;
};