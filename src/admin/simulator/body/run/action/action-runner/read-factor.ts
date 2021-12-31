import {ParameterKind, TopicFactorParameter} from '@/services/data/tuples/factor-calculator-types';
import {AggregateArithmetic} from '@/services/data/tuples/pipeline-stage-unit-action/aggregate-arithmetic-types';
import {isReadFactorAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {isXaNumber} from '@/services/utils';
import {computeJoint} from '../../compute/condition-compute';
import {computeTopicFactor} from '../../compute/parameter-compute';
import {ParameterShouldBe} from '../../compute/types';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {prepareBy, prepareFactor, prepareTopic, prepareVariable} from './utils';

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
	const arithmetic = action.arithmetic || AggregateArithmetic.NONE;
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
		if (arithmetic === AggregateArithmetic.NONE) {
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
		} else {
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
			switch (arithmetic) {
				case AggregateArithmetic.COUNT:
					value = values.length;
					break;
				case AggregateArithmetic.SUM:
					value = values.reduce((sum, value) => (value != null && isXaNumber(value)) ? (sum + Number(value)) : sum, 0);
					break;
				case AggregateArithmetic.AVG:
					value = values.reduce((sum, value) => (value != null && isXaNumber(value)) ? (sum + Number(value)) : sum, 0) / values.length;
					break;
				default:
					throw new Error('never occurs');
			}
		}
	}

	pipelineContext.variables[variableName] = value;
	if (found) {
		await logWrite(`Factor[value=${value}] found.`);
	} else {
		throw new Error('Factor not found by given condition.');
		// await logWrite('Factor not found by given condition.');
	}
};