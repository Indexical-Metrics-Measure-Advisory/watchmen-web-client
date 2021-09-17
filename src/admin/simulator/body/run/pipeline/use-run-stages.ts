import {useEffect} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {PipelineRuntimeContext} from '../types';
import {createLogWriter} from './utils';

export const useRunStages = (
	context: PipelineRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const onRunStages = async (c: PipelineRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const logWrite = createLogWriter(context, setMessage);
			const stages = context.stages;
			if (stages.length === 0) {
				await logWrite(`Ignored since no stage declared.`);
				fire(RuntimeEventTypes.PIPELINE_IGNORED, context);
			} else {
				// run first stage
				fire(RuntimeEventTypes.RUN_STAGE, stages[0]);
			}
		};
		on(RuntimeEventTypes.RUN_STAGES, onRunStages);
		return () => {
			off(RuntimeEventTypes.RUN_STAGES, onRunStages);
		};
	}, [on, off, fire, context, setMessage]);
};