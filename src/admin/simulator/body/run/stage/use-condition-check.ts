import {useEffect} from 'react';
import {checkStageCondition} from '../compute/condition-check';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {PipelineRuntimeContext, StageRuntimeContext} from '../types';
import {createLogWriter} from './utils';

export const useConditionCheck = (
	pipelineContext: PipelineRuntimeContext,
	context: StageRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();

	useEffect(() => {
		const logWrite = createLogWriter(pipelineContext, context, setMessage);
		const onConditionCheck = async (c: StageRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const {stage} = context;
			if (!stage.conditional || !stage.on) {
				await logWrite('No condition declared in stage, pass condition check.');
				fire(RuntimeEventTypes.RUN_UNITS, context);
			} else {
				try {
					const pass = checkStageCondition(pipelineContext, context);
					if (!pass) {
						// compute stage condition
						await logWrite('Failed on condition check.');
						fire(RuntimeEventTypes.STAGE_IGNORED, context);
					} else {
						await logWrite('Pass condition check.');
						fire(RuntimeEventTypes.RUN_UNITS, context);
					}
				} catch (e: any) {
					await logWrite('Error occurs on condition check.', e);
					fire(RuntimeEventTypes.STAGE_FAILED, context, e);
				}
			}
		};
		on(RuntimeEventTypes.DO_STAGE_CONDITION_CHECK, onConditionCheck);
		return () => {
			off(RuntimeEventTypes.DO_STAGE_CONDITION_CHECK, onConditionCheck);
		};
	}, [on, off, fire, pipelineContext, context, setMessage]);
};