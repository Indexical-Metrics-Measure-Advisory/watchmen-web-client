import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {createLogWriter} from './utils';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';

export const useRunActions = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	context: UnitRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const onActionUnits = async (c: UnitRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const logWrite = createLogWriter(pipelineContext, stageContext, context, setMessage);
			const actions = context.actions;
			if (actions.length === 0) {
				await logWrite(`Ignored since no action declared.`);
				fire(RuntimeEventTypes.UNIT_IGNORED, context);
			} else {
				// run first action
				fire(RuntimeEventTypes.RUN_ACTION, actions[0]);
			}
		};
		on(RuntimeEventTypes.RUN_ACTIONS, onActionUnits);
		return () => {
			off(RuntimeEventTypes.RUN_ACTIONS, onActionUnits);
		};
	}, [on, off, fire, pipelineContext, stageContext, context, setMessage]);
};