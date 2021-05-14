import {PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {createLogWriter} from './utils';

export const useConditionCheck = (
	pipelineContext: PipelineRuntimeContext,
	context: StageRuntimeContext,
	setMessage: (value: (((prevState: string) => string) | string)) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();

	useEffect(() => {
		const logWrite = createLogWriter(pipelineContext, context, setMessage);
		const onConditionCheck = async (c: StageRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const {stage} = context;
			if (!stage.on) {
				await logWrite(`No condition declared in stage, pass condition check.`);
				fire(RuntimeEventTypes.RUN_UNITS, context);
			} else {
				// TODO compute stage condition
				fire(RuntimeEventTypes.STAGE_IGNORED, context);
			}
		};
		on(RuntimeEventTypes.DO_STAGE_CONDITION_CHECK, onConditionCheck);
		return () => {
			off(RuntimeEventTypes.DO_STAGE_CONDITION_CHECK, onConditionCheck);
		};
	}, [on, off, fire, pipelineContext, context, setMessage]);
};