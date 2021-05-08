import React, {useEffect} from 'react';
import {Parameter} from '../../../../../../services/tuples/factor-calculator-types';
import {isTopicFactorParameter} from '../../../../../../services/tuples/factor-calculator-utils';
import {
	FromFactor,
	ToFactor
} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {useParameterEventBus} from '../../parameter/parameter/parameter-event-bus';
import {ParameterEventTypes} from '../../parameter/parameter/parameter-event-bus-types';
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

	return <></>;
};