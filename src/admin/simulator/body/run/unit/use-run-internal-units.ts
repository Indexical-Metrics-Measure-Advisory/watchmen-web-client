import {PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {createLogWriter} from './utils';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';

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