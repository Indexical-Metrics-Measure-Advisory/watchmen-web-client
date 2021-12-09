import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEffect} from 'react';
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