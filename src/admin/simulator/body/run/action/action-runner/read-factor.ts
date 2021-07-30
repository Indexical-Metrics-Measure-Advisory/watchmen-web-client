import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {isReadFactorAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {prepareBy, prepareFactor, prepareTopic, prepareVariable} from './utils';
import {computeJoint} from '../../compute/condition-compute';
import {computeTopicFactor} from '../../compute/parameter-compute';
import {ParameterKind, TopicFactorParameter} from '../../../../../../services/tuples/factor-calculator-types';
import {ParameterShouldBe} from '../../compute/types';

export const runReadFactor = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, internalUnitContext, context, logWrite} = options;
	const {action} = context;

	if (!isReadFactorAction(action)) {
		throw new Error(`Not a read factor action[${action}].`);
	}

	const variableName = prepareVariable(action);
	const topic = prepareTopic(action, pipelineContext);
	const factor = prepareFactor(topic, action);
	// const arithmetic = action.arithmetic || AggregateArithmetic.NONE;
	const by = prepareBy(action);

	const rows = (pipelineContext.runtimeData[topic.topicId] || []).filter(fakeTriggerData => {
		return computeJoint({
			joint: by, pipelineContext, internalUnitContext, alternativeTriggerData: fakeTriggerData
		});
	});

	let found: boolean = false;
	let value = null;
	if (rows && rows.length > 0) {
		found = true;
		value = computeTopicFactor({
			parameter: {
				kind: ParameterKind.TOPIC,
				topicId: topic.topicId,
				factorId: factor.factorId
			} as TopicFactorParameter,
			pipelineContext,
			shouldBe: ParameterShouldBe.ANY,
			alternativeTriggerData: rows[0]
		});
	}

	pipelineContext.variables[variableName] = value;
	if (found) {
		await logWrite(`Factor[value=${value}] found.`);
	} else {
		await logWrite('Factor not found by given condition.');
	}
};