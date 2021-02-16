import React, { useEffect } from 'react';
import { PipelineStageUnitAction } from '../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { PipelineStageUnit } from '../../../../../services/tuples/pipeline-stage-unit-types';
import { useActionEventBus } from '../action/action-event-bus';
import { ActionEventTypes } from '../action/action-event-bus-types';
import { useUnitEventBus } from './unit-event-bus';
import { UnitEventTypes } from './unit-event-bus-types';

export const Action2UnitBridge = (props: { unit: PipelineStageUnit, action: PipelineStageUnitAction }) => {
	const { unit, action } = props;

	const { fire: fireUnit } = useUnitEventBus();
	const { on, off } = useActionEventBus();
	useEffect(() => {
		const onActionChanged = () => {
			fireUnit(UnitEventTypes.ACTION_CHANGED, action, unit);
		};
		on(ActionEventTypes.ACTION_TYPE_CHANGED, onActionChanged);
		on(ActionEventTypes.ACTION_CONTENT_CHANGED, onActionChanged);
		return () => {
			off(ActionEventTypes.ACTION_TYPE_CHANGED, onActionChanged);
			off(ActionEventTypes.ACTION_CONTENT_CHANGED, onActionChanged);
		};
	}, [ on, off, fireUnit, unit, action ]);

	return <></>;
};