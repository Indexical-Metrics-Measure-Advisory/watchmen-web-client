import {useEffect} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {createLogWriter} from './utils';

export const useRunInternalUnits = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	context: UnitRuntimeContext
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const onRunUnits = async (c: UnitRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const logWrite = createLogWriter(pipelineContext, stageContext, context);
			const internalUnits = context.internals;
			if (internalUnits.length === 0) {
				// actually never occurs
				await logWrite(`Ignored since no internal unit declared.`);
				fire(RuntimeEventTypes.UNIT_IGNORED, context);
			} else {
				// run first unit
				fire(RuntimeEventTypes.RUN_INTERNAL_UNIT, internalUnits[0]);
			}
		};
		on(RuntimeEventTypes.RUN_INTERNAL_UNITS, onRunUnits);
		return () => {
			off(RuntimeEventTypes.RUN_INTERNAL_UNITS, onRunUnits);
		};
	}, [on, off, fire, pipelineContext, stageContext, context]);
};