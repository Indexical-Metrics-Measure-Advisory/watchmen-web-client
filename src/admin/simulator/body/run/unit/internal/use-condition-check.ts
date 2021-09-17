import {useEffect} from 'react';
import {checkInternalUnitCondition} from '../../compute/condition-check';
import {useRuntimeEventBus} from '../../runtime/runtime-event-bus';
import {RuntimeEventTypes} from '../../runtime/runtime-event-bus-types';
import {InternalUnitRuntimeContext, PipelineRuntimeContext, StageRuntimeContext, UnitRuntimeContext} from '../../types';
import {createLogWriter} from './utils';

export const useConditionCheck = (
	pipelineContext: PipelineRuntimeContext,
	stageContext: StageRuntimeContext,
	unitContext: UnitRuntimeContext,
	context: InternalUnitRuntimeContext,
	setMessage: (message: string) => void
) => {
	const {on, off, fire} = useRuntimeEventBus();

	useEffect(() => {
		const logWrite = createLogWriter(pipelineContext, stageContext, unitContext, context, setMessage);
		const onConditionCheck = async (c: InternalUnitRuntimeContext) => {
			if (c !== context) {
				return;
			}

			const {unit} = context;
			if (!unit.conditional || !unit.on) {
				await logWrite('No condition declared in unit, pass condition check.');
				fire(RuntimeEventTypes.RUN_ACTIONS, context);
			} else {
				try {
					const pass = checkInternalUnitCondition(pipelineContext, context);
					if (!pass) {
						// compute unit condition
						await logWrite('Failed on condition check.');
						fire(RuntimeEventTypes.INTERNAL_UNIT_IGNORED, context);
					} else {
						await logWrite('Pass condition check.');
						fire(RuntimeEventTypes.RUN_ACTIONS, context);
					}
				} catch (e: any) {
					await logWrite('Error occurs on condition check.', e);
					fire(RuntimeEventTypes.INTERNAL_UNIT_FAILED, context, e);
				}
			}
		};
		on(RuntimeEventTypes.DO_INTERNAL_UNIT_CONDITION_CHECK, onConditionCheck);
		return () => {
			off(RuntimeEventTypes.DO_INTERNAL_UNIT_CONDITION_CHECK, onConditionCheck);
		};
	}, [on, off, fire, pipelineContext, stageContext, unitContext, context, setMessage]);
};