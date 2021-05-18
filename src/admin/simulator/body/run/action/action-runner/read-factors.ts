import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {isReadFactorsAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {prepareBy, prepareFactor, prepareTopic, prepareVariable} from './utils';
import {computeJoint} from '../../compute/condition-compute';
import {computeTopicFactor} from '../../compute/parameter-compute';
import {ParameterKind, TopicFactorParameter} from '../../../../../../services/tuples/factor-calculator-types';
import {ParameterShouldBe} from '../../compute/types';

export const runReadFactors = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, internalUnitContext, context, logWrite} = options;
	const {action} = context;

	if (!isReadFactorsAction(action)) {
		throw new Error(`Not a read factors action[${action}].`);
	}

	const variableName = prepareVariable(action);
	const topic = prepareTopic(action, pipelineContext);
	const factor = prepareFactor(topic, action);
	const by = prepareBy(action);

	const rows = (pipelineContext.runtimeData[topic.topicId] || []).filter(fakeTriggerData => {
		return computeJoint({
			joint: by, pipelineContext, internalUnitContext, alternativeTriggerData: fakeTriggerData
		});
	});

	const found: boolean = rows.length !== 0;
	const values = rows.map(row => {
		return computeTopicFactor({
			parameter: {
				kind: ParameterKind.TOPIC,
				topicId: topic.topicId,
				factorId: factor.factorId
			} as TopicFactorParameter,
			pipelineContext,
			shouldBe: ParameterShouldBe.ANY,
			alternativeTriggerData: row
		});
	});

	pipelineContext.variables[variableName] = values;
	if (found) {
		await logWrite(`Factors[value=${values}] found.`);
	} else {
		await logWrite('Factors not found by given condition.');
	}
};