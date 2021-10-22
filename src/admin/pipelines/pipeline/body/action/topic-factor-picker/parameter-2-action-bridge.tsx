import {Parameter} from '@/services/data/tuples/factor-calculator-types';
import {isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {FromFactor, ToFactor} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {Fragment, useEffect} from 'react';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';

export const Parameter2ActionBridge = (props: { action: FromFactor | ToFactor }) => {
	const {action} = props;

	const {fire: fireAction} = useActionEventBus();
	const {on, off} = useParameterEventBus();
	useEffect(() => {
		const onTopicChanged = (parameter: Parameter) => {
			if (isTopicFactorParameter(parameter)) {
				action.topicId = parameter.topicId;
				fireAction(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
				fireAction(ActionEventTypes.TOPIC_CHANGED, action);
			}
		};
		const onFactorChanged = (parameter: Parameter) => {
			if (isTopicFactorParameter(parameter)) {
				action.factorId = parameter.factorId;
				fireAction(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
			}
		};
		on(ParameterEventTypes.TOPIC_CHANGED, onTopicChanged);
		on(ParameterEventTypes.FACTOR_CHANGED, onFactorChanged);
		return () => {
			off(ParameterEventTypes.TOPIC_CHANGED, onTopicChanged);
			off(ParameterEventTypes.FACTOR_CHANGED, onFactorChanged);
		};
	}, [on, off, fireAction, action]);

	return <Fragment/>;
};