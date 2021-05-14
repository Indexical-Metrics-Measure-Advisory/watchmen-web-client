import {PipelineRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {PipelineTriggerType} from '../../../../../services/tuples/pipeline-types';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {createLogWriter} from './utils';

export const useTriggerTypeCheck = (
	context: PipelineRuntimeContext,
	setMessage: (value: (((prevState: string) => string) | string)) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const onTriggerTypeCheck = async (c: PipelineRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const logWrite = createLogWriter(context, setMessage);
			const {existsData, triggerData, pipeline} = context;
			const isInsert = existsData.includes(triggerData);
			const type = isInsert ? PipelineTriggerType.INSERT : PipelineTriggerType.MERGE;
			switch (pipeline.type) {
				case PipelineTriggerType.MERGE:
					if (isInsert) {
						await logWrite(`Ignored by trigger type not match[expect=${PipelineTriggerType.MERGE}, actual=${type}].`);
						fire(RuntimeEventTypes.PIPELINE_IGNORED, context);
					} else {
						await logWrite(`Pass trigger type[expect=${PipelineTriggerType.MERGE}, actual=${type}] check.`);
						fire(RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, context);
					}
					break;
				case PipelineTriggerType.INSERT:
					if (!isInsert) {
						await logWrite(`Ignored by trigger type not match[expect=${PipelineTriggerType.INSERT}, actual=${type}].`);
						fire(RuntimeEventTypes.PIPELINE_IGNORED, context);
					} else {
						await logWrite(`Pass trigger type[expect=${PipelineTriggerType.INSERT}, actual=${type}] check.`);
						fire(RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, context);
					}
					break;
				case PipelineTriggerType.INSERT_OR_MERGE:
					await logWrite(`Pass trigger type[expect=${PipelineTriggerType.INSERT_OR_MERGE}, actual=${type}] check.`);
					fire(RuntimeEventTypes.DO_PIPELINE_CONDITION_CHECK, context);
					break;
				case PipelineTriggerType.DELETE:
					await logWrite(`Ignored by trigger type not match[expect=${PipelineTriggerType.DELETE}, actual=${type}].`);
					fire(RuntimeEventTypes.PIPELINE_IGNORED, context);
					break;
			}
		};
		on(RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, onTriggerTypeCheck);
		return () => {
			off(RuntimeEventTypes.DO_PIPELINE_TRIGGER_TYPE_CHECK, onTriggerTypeCheck);
		};
	}, [on, off, fire, context, setMessage]);
};