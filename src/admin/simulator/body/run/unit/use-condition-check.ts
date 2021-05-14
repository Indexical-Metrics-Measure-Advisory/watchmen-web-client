import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {createLogWriter} from './utils';

export const useConditionCheck = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	context: UnitRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();

	useEffect(() => {
		const logWrite = createLogWriter(pipelineContext, stageContext, context, setMessage);
		const onConditionCheck = async (c: UnitRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const {unit} = context;
			if (!unit.on) {
				await logWrite(`No condition declared in unit, pass condition check.`);
				fire(RuntimeEventTypes.RUN_ACTIONS, context);
			} else {
				// TODO compute unit condition
				fire(RuntimeEventTypes.UNIT_IGNORED, context);
			}
		};
		on(RuntimeEventTypes.DO_UNIT_CONDITION_CHECK, onConditionCheck);
		return () => {
			off(RuntimeEventTypes.DO_UNIT_CONDITION_CHECK, onConditionCheck);
		};
	}, [on, off, fire, pipelineContext, stageContext, context, setMessage]);
};