import {connectSimulatorDB} from '@/services/local-persist/db';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {
	ActionRunStatus,
	ActionRuntimeContext,
	InternalUnitRuntimeContext,
	PipelineRuntimeContext,
	StageRuntimeContext,
	UnitRuntimeContext
} from '../types';
import {buildContextBody, createLogWriter} from './utils';

export const useCompleted = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const logWrite = createLogWriter(pipelineContext, stageContext, unitContext, context, setMessage);
		const finishAction = async () => {
			await connectSimulatorDB().actions.update(context.actionRuntimeId!, {
				status: context.status,
				context: buildContextBody(context),
				dataAfter: pipelineContext.runtimeData,
				lastModifiedAt: dayjs().toDate()
			});
			if (context.status === ActionRunStatus.FAIL) {
				// unit failed, break;
				fire(RuntimeEventTypes.INTERNAL_UNIT_FAILED, internalUnitContext);
			} else {
				// try to run next stage
				const actions = internalUnitContext.actions;
				const index = actions.indexOf(context);
				if (index === actions.length - 1) {
					// last finished
					fire(RuntimeEventTypes.INTERNAL_UNIT_DONE, internalUnitContext);
				} else {
					// run next stage
					fire(RuntimeEventTypes.RUN_ACTION, actions[index + 1]);
				}
			}
		};
		const onActionDone = async (c: ActionRuntimeContext) => {
			if (c !== context) {
				return;
			}
			context.status = ActionRunStatus.DONE;
			await logWrite(`Action done.`);
			await finishAction();
		};
		const onActionFailed = async (c: ActionRuntimeContext, error: Error) => {
			if (c !== context) {
				return;
			}
			context.status = ActionRunStatus.FAIL;
			await logWrite(`Action failed on error[${error.message}].`);
			await finishAction();
		};
		on(RuntimeEventTypes.ACTION_DONE, onActionDone);
		on(RuntimeEventTypes.ACTION_FAILED, onActionFailed);
		return () => {
			off(RuntimeEventTypes.ACTION_DONE, onActionDone);
			off(RuntimeEventTypes.ACTION_FAILED, onActionFailed);
		};
	}, [on, off, fire, pipelineContext, stageContext, unitContext, internalUnitContext, context, setMessage]);
};