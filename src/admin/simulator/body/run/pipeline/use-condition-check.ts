import {PipelineRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {createLogWriter} from './utils';

export const useConditionCheck = (
	context: PipelineRuntimeContext,
	setMessage: (value: (((prevState: string) => string) | string)) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();

	useEffect(() => {
		const logWrite = createLogWriter(context, setMessage);
		const onConditionCheck = async (c: PipelineRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const {pipeline} = context;
			if (!pipeline.on) {
				await logWrite(`No condition declared in pipeline, pass condition check.`);
				fire(RuntimeEventTypes.RUN_STAGES, context);
			} else {
				// TODO compute pipeline condition
				fire(RuntimeEventTypes.PIPELINE_IGNORED, context);
			}
		};
		on(RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, onConditionCheck);
		return () => {
			off(RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, onConditionCheck);
		};
	}, [on, off, fire, context, setMessage]);
};