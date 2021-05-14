import {useEffect} from 'react';
import {PipelineRuntimeContext, StageRuntimeContext, UnitRunStatus, UnitRuntimeContext} from '../types';
import {useRuntimeEventBus} from '../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../runtime/runtime-event-bus-types';
import {connectSimulatorDB} from '../../../../../local-persist/db';
import dayjs from 'dayjs';

export const useCompleted = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	context: UnitRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();
	useEffect(() => {
		const finishUnit = async () => {
			await connectSimulatorDB().units.update(context.unitRuntimeId!, {
				body: context,
				dataAfter: pipelineContext.runtimeData,
				lastModifiedAt: dayjs().toDate()
			});
			if (context.status === UnitRunStatus.FAIL) {
				// unit failed, break;
				fire(RuntimeEventTypes.STAGE_FAILED, stageContext);
			} else {
				// try to run next stage
				const units = stageContext.units;
				const index = units.indexOf(context);
				if (index === units.length - 1) {
					// last finished
					fire(RuntimeEventTypes.STAGE_DONE, stageContext);
				} else {
					// run next stage
					fire(RuntimeEventTypes.RUN_UNIT, units[index + 1]);
				}
			}
		};
		const onUnitCompleted = (status: UnitRunStatus) => async (c: UnitRuntimeContext) => {
			if (c !== context) {
				return;
			}
			context.status = status;
			setMessage(`Unit finished on status ${status}.`);
			await finishUnit();
		};
		const onUnitIgnored = onUnitCompleted(UnitRunStatus.IGNORED);
		const onUnitDone = onUnitCompleted(UnitRunStatus.DONE);
		const onUnitFailed = onUnitCompleted(UnitRunStatus.FAIL);
		on(RuntimeEventTypes.UNIT_IGNORED, onUnitIgnored);
		on(RuntimeEventTypes.UNIT_DONE, onUnitDone);
		on(RuntimeEventTypes.UNIT_FAILED, onUnitFailed);
		return () => {
			off(RuntimeEventTypes.UNIT_IGNORED, onUnitIgnored);
			off(RuntimeEventTypes.UNIT_DONE, onUnitDone);
			off(RuntimeEventTypes.UNIT_FAILED, onUnitFailed);
		};
	}, [on, off, fire, pipelineContext, stageContext, context, setMessage]);
};