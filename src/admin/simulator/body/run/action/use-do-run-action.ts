import {
	ActionRuntimeContext,
	InternalUnitRuntimeContext,
	PipelineRuntimeContext,
	StageRuntimeContext,
	UnitRuntimeContext
} from '../types';
import {
	ReadTopicActionType,
	SystemActionType,
	WriteTopicActionType
} from '../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {useEffect} from 'react';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {createLogWriter} from './utils';
import {runAlarm} from './action-runner/alarm';
import {runCopyToMemory} from './action-runner/copy-to-memory';
import {runExists} from './action-runner/exists';

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
					case ReadTopicActionType.EXISTS:
						await runExists({pipelineContext, internalUnitContext, context, logWrite});
						break;
					case ReadTopicActionType.READ_FACTOR:
						// ReadFactorAction(context, logger).run();
						break;
					case ReadTopicActionType.READ_FACTORS:
						// ReadFactorsAction(context, logger).run();
						break;
					case ReadTopicActionType.READ_ROW:
						// ReadRowAction(context, logger).run();
						break;
					case ReadTopicActionType.READ_ROWS:
						// ReadRowsAction(context, logger).run();
						break;
					case WriteTopicActionType.WRITE_FACTOR:
						// WriteFactorAction(context, logger).run();
						break;
					case WriteTopicActionType.INSERT_ROW:
						// InsertRowAction(context, logger).run();
						break;
					case WriteTopicActionType.MERGE_ROW:
						// MergeRowAction(context, logger).run();
						break;
					case WriteTopicActionType.INSERT_OR_MERGE_ROW:
						// InsertOrMergeRowAction(context, logger).run();
						break;
					default:
						// noinspection ExceptionCaughtLocallyJS
						throw new Error(`Unsupported type of action[${action}].`);
				}
				fire(RuntimeEventTypes.ACTION_DONE, context);
			} catch (e) {
				await logWrite(`Unsupported type of action[type=${action.type}].`, e);
				fire(RuntimeEventTypes.ACTION_FAILED, context);
			}
		};
		on(RuntimeEventTypes.DO_RUN_ACTION, onDoRunAction);
		return () => {
			off(RuntimeEventTypes.DO_RUN_ACTION, onDoRunAction);
		};
	}, [on, off, fire, pipelineContext, stageContext, unitContext, internalUnitContext, context, setMessage]);
};