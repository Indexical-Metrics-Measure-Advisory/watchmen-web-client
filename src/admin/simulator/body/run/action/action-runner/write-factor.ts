import {AggregateArithmetic} from '@/services/data/tuples/pipeline-stage-unit-action/aggregate-arithmetic-types';
import {isWriteFactorAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {computeJoint} from '../../compute/condition-compute';
import {computeParameter} from '../../compute/parameter-compute';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {
	AGGREGATE_ASSIST_FACTOR_NAME,
	AGGREGATE_AVG_COUNT_PROP_NAME,
	DEFAULT_AGGREGATE_ASSIST_FACTOR_VALUE,
	getOldValue,
	prepareBy,
	prepareFactor,
	prepareSource,
	prepareTopic,
	pushToChangeData
} from './utils';

export const runWriteFactor = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, internalUnitContext, context, logWrite} = options;
	const {action} = context;

	if (!isWriteFactorAction(action)) {
		throw new Error(`Not a write factor action[${action}].`);
	}

	const topic = prepareTopic(action, pipelineContext);
	const factor = prepareFactor(topic, action);
	const source = prepareSource(action);
	const arithmetic = action.arithmetic || AggregateArithmetic.NONE;
	const by = prepareBy(action);

	const rows = (pipelineContext.runtimeData[topic.topicId] || []).filter(fakeTriggerData => {
		return computeJoint({
			joint: by, pipelineContext, internalUnitContext, alternativeTriggerData: fakeTriggerData
		});
	});

	let found: boolean = false;
	let row = null;
	if (rows && rows.length > 0) {
		found = true;
		row = rows[0];
	}

	if (found && row) {
		const {...rowBeforeUpdate} = row;

		const newValue = computeParameter({
			parameter: source,
			pipelineContext,
			internalUnitContext,
			alternativeTriggerData: null
		}) || 0;
		switch (arithmetic) {
			case AggregateArithmetic.COUNT:
				if (!pipelineContext.triggerDataOnce) {
					// the trigger data is inserted, not merged
					const oldCount = (row[factor.name] || 0) * 1;
					row[factor.name] = oldCount + 1;
				}
				break;
			case AggregateArithmetic.AVG: {
				const oldValue = getOldValue({
					parameter: source,
					pipelineContext,
					internalUnitContext,
					defaultValue: 0
				});
				const oldAvg = row[factor.name] || 0;
				const assist = JSON.parse(row[AGGREGATE_ASSIST_FACTOR_NAME] || DEFAULT_AGGREGATE_ASSIST_FACTOR_VALUE);
				const count = assist[`${factor.name}.${AGGREGATE_AVG_COUNT_PROP_NAME}`] || 1;
				row[factor.name] = (oldAvg * count + newValue * 1 - oldValue) / count;
				pushToChangeData({before: rowBeforeUpdate, after: row, pipelineContext, topic});
				await logWrite(`Factor[value=${row[factor.name]}] written.`);
				break;
			}
			case AggregateArithmetic.SUM: {
				const oldValue = getOldValue({
					parameter: source,
					pipelineContext,
					internalUnitContext,
					defaultValue: 0
				});
				const oldSum = row[factor.name] || 0;
				row[factor.name] = oldSum * 1 + newValue * 1 - oldValue;
				pushToChangeData({before: rowBeforeUpdate, after: row, pipelineContext, topic});
				await logWrite(`Factor[value=${row[factor.name]}] written.`);
				break;
			}
			case AggregateArithmetic.NONE:
			default:
				row[factor.name] = newValue;
				pushToChangeData({before: rowBeforeUpdate, after: row, pipelineContext, topic});
				await logWrite(`Factor[value=${newValue}] written.`);
				break;
		}
	} else {
		throw new Error(`Cannot find row from topic[${topic.name}] by given condition.`);
	}
};