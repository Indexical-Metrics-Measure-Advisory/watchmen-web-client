import {useEffect} from 'react';
import {
	InternalUnitRuntimeContext,
	PipelineRuntimeContext,
	StageRuntimeContext,
	UnitRunStatus,
	UnitRuntimeContext
} from '../../types';
import {useRuntimeEventBus} from '../../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../../local-persist/db';
import dayjs from 'dayjs';
import {buildContextBody, createLogWriter} from './utils';

export const useCompleted = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	context: InternalUnitRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const logWrite = createLogWriter(pipelineContext, stageContext, unitContext, context, setMessage);
		const finishInternalUnit = async () => {
			await connectSimulatorDB().units.update(context.unitRuntimeId!, {
				status: context.status,
				context: buildContextBody(context),
				dataAfter: pipelineContext.runtimeData,
				lastModifiedAt: dayjs().toDate()
			});
			if (context.status === UnitRunStatus.FAIL) {
				// unit failed, break;
				fire(RuntimeEventTypes.UNIT_FAILED, unitContext);
			} else {
				// try to run next stage
				const internalUnits = unitContext.internals;
				const index = internalUnits.indexOf(context);
				if (index === internalUnits.length - 1) {
					// last finished
					fire(RuntimeEventTypes.UNIT_DONE, unitContext);
				} else {
					// run next stage
					fire(RuntimeEventTypes.RUN_INTERNAL_UNIT, internalUnits[index + 1]);
				}
			}
		};
		const onInternalUnitCompleted = (status: UnitRunStatus) => async (c: InternalUnitRuntimeContext) => {
			if (c !== context) {
				return;
			}
			context.status = status;
			await logWrite(`Internal unit finished on status ${status}.`);
			await finishInternalUnit();
		};
		const onInternalUnitIgnored = onInternalUnitCompleted(UnitRunStatus.IGNORED);
		const onInternalUnitDone = onInternalUnitCompleted(UnitRunStatus.DONE);
		const onInternalUnitFailed = onInternalUnitCompleted(UnitRunStatus.FAIL);
		on(RuntimeEventTypes.INTERNAL_UNIT_IGNORED, onInternalUnitIgnored);
		on(RuntimeEventTypes.INTERNAL_UNIT_DONE, onInternalUnitDone);
		on(RuntimeEventTypes.INTERNAL_UNIT_FAILED, onInternalUnitFailed);
		return () => {
			off(RuntimeEventTypes.INTERNAL_UNIT_IGNORED, onInternalUnitIgnored);
			off(RuntimeEventTypes.INTERNAL_UNIT_DONE, onInternalUnitDone);
			off(RuntimeEventTypes.INTERNAL_UNIT_FAILED, onInternalUnitFailed);
		};
	}, [on, off, fire, pipelineContext, stageContext, unitContext, context, setMessage]);
};