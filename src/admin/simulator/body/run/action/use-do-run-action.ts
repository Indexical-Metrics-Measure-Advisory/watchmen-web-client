import {
	ReadTopicActionType,
	SystemActionType,
	WriteTopicActionType
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {useEffect} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {
	ActionRuntimeContext,
	InternalUnitRuntimeContext,
	PipelineRuntimeContext,
	StageRuntimeContext,
	UnitRuntimeContext
} from '../types';
import {runAlarm} from './action-runner/alarm';
import {runCopyToMemory} from './action-runner/copy-to-memory';
import {runExists} from './action-runner/exists';
import {runInsertOrMergeRow} from './action-runner/insert-or-merge-row';
import {runInsertRow} from './action-runner/insert-row';
import {runMergeRow} from './action-runner/merge-row';
import {runReadFactor} from './action-runner/read-factor';
import {runReadFactors} from './action-runner/read-factors';
import {runReadRow} from './action-runner/read-row';
import {runReadRows} from './action-runner/read-rows';
import {runWriteFactor} from './action-runner/write-factor';
import {runWriteToExternal} from './action-runner/write-to-external';
import {createLogWriter} from './utils';

export const useDoRunAction = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();

	useEffect(() => {
		const onDoRunAction = async (c: ActionRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const logWrite = createLogWriter(pipelineContext, stageContext, unitContext, context, setMessage);
			const {action} = context;

			try {
				switch (action.type) {
					case SystemActionType.ALARM:
						await runAlarm({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case SystemActionType.COPY_TO_MEMORY:
						await runCopyToMemory({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case SystemActionType.WRITE_TO_EXTERNAL:
						await runWriteToExternal({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case ReadTopicActionType.EXISTS:
						await runExists({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case ReadTopicActionType.READ_FACTOR:
						await runReadFactor({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case ReadTopicActionType.READ_FACTORS:
						await runReadFactors({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case ReadTopicActionType.READ_ROW:
						await runReadRow({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case ReadTopicActionType.READ_ROWS:
						await runReadRows({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case WriteTopicActionType.WRITE_FACTOR:
						await runWriteFactor({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case WriteTopicActionType.INSERT_ROW:
						await runInsertRow({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case WriteTopicActionType.MERGE_ROW:
						await runMergeRow({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case WriteTopicActionType.INSERT_OR_MERGE_ROW:
						await runInsertOrMergeRow({pipelineContext, internalUnitContext, context, logWrite});
						break;
					default:
						// noinspection ExceptionCaughtLocallyJS
						throw new Error(`Unsupported type of action[${action}].`);
				}
				fire(RuntimeEventTypes.ACTION_DONE, context);
			} catch (e: unknown) {
				console.error(e);
				await logWrite(`Error occurred.`, e as Error);
				fire(RuntimeEventTypes.ACTION_FAILED, context, e as Error);
			}
		};
		on(RuntimeEventTypes.DO_RUN_ACTION, onDoRunAction);
		return () => {
			off(RuntimeEventTypes.DO_RUN_ACTION, onDoRunAction);
		};
	}, [on, off, fire, pipelineContext, stageContext, unitContext, internalUnitContext, context, setMessage]);
};