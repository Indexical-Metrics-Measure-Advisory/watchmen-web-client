import {useParameterEventBus} from '@/data-filter/parameter-event-bus';
import {ParameterEventTypes} from '@/data-filter/parameter-event-bus-types';
import {PipelineStageUnitAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import React, {useEffect} from 'react';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';

export const Parameter2ActionBridge = (props: { action: PipelineStageUnitAction }) => {
	const {action} = props;

	const {fire: fireAction} = useActionEventBus();
	const {on, off} = useParameterEventBus();
	useEffect(() => {
		const onParamChanged = () => {
			fireAction(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
		};
		on(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		return () => {
			off(ParameterEventTypes.PARAM_CHANGED, onParamChanged);
		};
	}, [on, off, fireAction, action]);

	return <></>;
};