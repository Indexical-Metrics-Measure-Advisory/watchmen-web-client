import {useEffect} from 'react';
import {
	ActionRunStatus,
	ActionRuntimeContext,
	PipelineRuntimeContext,
	StageRuntimeContext,
	UnitRuntimeContext
} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';
import {buildContextBody, createLogWriter} from './utils';

export const useCompleted = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
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
				fire(RuntimeEventTypes.UNIT_FAILED, unitContext);
			} else {
				// try to run next stage
				const actions = unitContext.actions;
				const index = actions.indexOf(context);
				if (index === actions.length - 1) {
					// last finished
					fire(RuntimeEventTypes.UNIT_DONE, unitContext);
				} else {
					// run next stage
					fire(RuntimeEventTypes.RUN_ACTION, actions[index + 1]);
				}
			}
		};
		const onUnitCompleted = (status: ActionRunStatus) => async (c: ActionRuntimeContext) => {
			if (c !== context) {
				return;
			}
			context.status = status;
			await logWrite(`Action finished on status ${status}.`);
			await finishAction();
		};
		const onActionDone = onUnitCompleted(ActionRunStatus.DONE);
		const onActionFailed = onUnitCompleted(ActionRunStatus.FAIL);
		on(RuntimeEventTypes.ACTION_DONE, onActionDone);
		on(RuntimeEventTypes.ACTION_FAILED, onActionFailed);
		return () => {
			off(RuntimeEventTypes.ACTION_DONE, onActionDone);
			off(RuntimeEventTypes.ACTION_FAILED, onActionFailed);
		};
	}, [on, off, fire, pipelineContext, stageContext, unitContext, context, setMessage]);
};