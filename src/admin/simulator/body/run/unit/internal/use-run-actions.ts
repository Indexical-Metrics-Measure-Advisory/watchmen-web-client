import {useEffect} from 'react';
import {useRuntimeEventBus} from '../../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../../runtime/runtime-event-bus-types';
import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../../types';
import {createLogWriter} from './utils';

export const useRunActions = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	context: InternalUnitRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const onActionUnits = async (c: InternalUnitRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const logWrite = createLogWriter(pipelineContext, stageContext, unitContext, context, setMessage);
			const actions = context.actions;
			if (actions.length === 0) {
				await logWrite(`Ignored since no action declared.`);
				fire(RuntimeEventTypes.INTERNAL_UNIT_IGNORED, context);
			} else {
				// run first action
				fire(RuntimeEventTypes.RUN_ACTION, actions[0]);
			}
		};
		on(RuntimeEventTypes.RUN_ACTIONS, onActionUnits);
		return () => {
			off(RuntimeEventTypes.RUN_ACTIONS, onActionUnits);
		};
	}, [on, off, fire, pipelineContext, stageContext, unitContext, context, setMessage]);
};