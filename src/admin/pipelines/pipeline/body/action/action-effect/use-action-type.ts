import {useEffect} from 'react';
import {useForceUpdate} from '@/basic-widgets/utils';
import {PipelineStageUnitAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';

export const useActionType = (action: PipelineStageUnitAction) => {
	const forceUpdate = useForceUpdate();
	const {on, off} = useActionEventBus();
	useEffect(() => {
		const onActionTypeChanged = (changedAction: PipelineStageUnitAction) => {
			if (changedAction !== action) {
				return;
			}
			forceUpdate();
		};
		on(ActionEventTypes.ACTION_TYPE_CHANGED, onActionTypeChanged);
		return () => {
			off(ActionEventTypes.ACTION_TYPE_CHANGED, onActionTypeChanged);
		};
	}, [on, off, forceUpdate, action]);
};