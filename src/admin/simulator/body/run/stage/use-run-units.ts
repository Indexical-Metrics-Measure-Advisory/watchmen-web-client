import {useEffect} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {createLogWriter} from './utils';

export const useRunUnits = (
	pipelineContext: PipelineRuntimeContext,
	context: StageRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const onRunUnits = async (c: StageRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const logWrite = createLogWriter(pipelineContext, context, setMessage);
			const units = context.units;
			if (units.length === 0) {
				await logWrite(`Ignored since no unit declared.`);
				fire(RuntimeEventTypes.STAGE_IGNORED, context);
			} else {
				// run first unit
				fire(RuntimeEventTypes.RUN_UNIT, units[0]);
			}
		};
		on(RuntimeEventTypes.RUN_UNITS, onRunUnits);
		return () => {
			off(RuntimeEventTypes.RUN_UNITS, onRunUnits);
		};
	}, [on, off, fire, pipelineContext, context, setMessage]);
};