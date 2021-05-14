import {PipelineRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';

export const useConditionCheck = (
	context: PipelineRuntimeContext,
	setMessage: (value: (((prevState: string) => string) | string)) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();

	useEffect(() => {
		const raiseMessage = async (message: string) => {
			const db = connectSimulatorDB();
			await db.logs.add({
				pipelineId: context.pipeline.pipelineId,
				pipelineRuntimeId: context.pipelineRuntimeId!,
				message,
				lastModifiedAt: dayjs().toDate()
			});

			setMessage(message);
		};
		const onConditionCheck = async (c: PipelineRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const {pipeline} = context;
			if (!pipeline.on) {
				await raiseMessage(`No condition declared in pipeline, passed condition check.`);
				fire(RuntimeEventTypes.START_PIPELINE, context);
			} else {
				// TODO
				fire(RuntimeEventTypes.PIPELINE_IGNORED, context);
			}
		};
		on(RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, onConditionCheck);
		return () => {
			off(RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, onConditionCheck);
		};
	}, [on, off, fire, context, setMessage]);
};