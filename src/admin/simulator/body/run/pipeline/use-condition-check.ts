import {PipelineRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {createLogWriter} from './utils';
import {checkPipelineCondition} from '../compute/condition-check';

export const useConditionCheck = (
	context: PipelineRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();

	useEffect(() => {
		const logWrite = createLogWriter(context, setMessage);
		const onConditionCheck = async (c: PipelineRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const {pipeline} = context;
			if (!pipeline.conditional || !pipeline.on) {
				await logWrite('No condition declared in pipeline, pass condition check.');
				fire(RuntimeEventTypes.RUN_STAGES, context);
			} else {
				try {
					const pass = checkPipelineCondition(context);
					if (!pass) {
						// compute pipeline condition
						await logWrite('Failed on condition check.');
						fire(RuntimeEventTypes.PIPELINE_IGNORED, context);
					} else {
						// pass condition check, run stages
						await logWrite('Pass condition check.');
						fire(RuntimeEventTypes.RUN_STAGES, context);
					}
				} catch (e) {
					await logWrite('Error occurs on condition check.', e);
					fire(RuntimeEventTypes.PIPELINE_FAILED, context);
				}
			}
		};
		on(RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, onConditionCheck);
		return () => {
			off(RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, onConditionCheck);
		};
	}, [on, off, fire, context, setMessage]);
};