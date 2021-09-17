import {ConstantParameter, ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {isAlarmAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {computeJoint} from '../../compute/condition-compute';
import {computeParameter} from '../../compute/parameter-compute';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';

export const runAlarm = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, internalUnitContext, context, logWrite} = options;
	const {action} = context;

	if (!isAlarmAction(action)) {
		throw new Error(`Not an alarm action[${action}].`);
	}

	let shouldRun = true;
	if (action.conditional) {
		shouldRun = computeJoint({
			joint: action.on!,
			pipelineContext,
			internalUnitContext,
			alternativeTriggerData: null
		});
		if (!shouldRun) {
			// compute pipeline condition
			await logWrite('Failed on condition check.');
			shouldRun = false;
		} else {
			// pass condition check, run stages
			await logWrite('Pass condition check.');
		}
	}

	if (!shouldRun) {
		return;
	}

	const {severity, message} = action;
	if (!message) {
		await logWrite(`Alarm: [severity=${severity}, message=No Message`);
	} else {
		const value = computeParameter({
			parameter: {
				kind: ParameterKind.CONSTANT,
				value: action.message,
				conditional: false
			} as ConstantParameter,
			pipelineContext,
			internalUnitContext,
			alternativeTriggerData: null
		});
		await logWrite(`Alarm: [severity=${severity}, message=${value || 'No Message'}]`);
	}
};