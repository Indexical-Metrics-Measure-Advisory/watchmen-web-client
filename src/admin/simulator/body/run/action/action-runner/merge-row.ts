import {AggregateArithmetic} from '@/services/data/tuples/pipeline-stage-unit-action/aggregate-arithmetic-types';
import {isMergeRowAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {MappingFactor} from '@/services/data/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DataRow} from '../../../../types';
import {computeJoint} from '../../compute/condition-compute';
import {computeParameter} from '../../compute/parameter-compute';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {
	AGGREGATE_ASSIST_FACTOR_NAME,
	AGGREGATE_AVG_COUNT_PROP_NAME,
	DEFAULT_AGGREGATE_ASSIST_FACTOR_VALUE,
	getOldValue,
	prepareBy,
	prepareMapping,
	prepareTopic,
	pushToChangeData
} from './utils';

export const doMergeRow = async (
	row: DataRow,
	mapping: Array<MappingFactor>,
	topic: Topic,
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	logWrite: (message: string) => Promise<void>
) => {
	const {...rowBeforeUpdate} = row;
	mapping.reduce((row, map) => {
		const {source, factorId, arithmetic} = map;
		// eslint-disable-next-line
		const factor = topic.factors.find(f => f.factorId == factorId);
		if (!factor) {
			throw new Error(`Factor[${factorId}] of mapping[${mapping}] not found.`);
		}
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
				break;
			}
			case AggregateArithmetic.NONE:
			default:
				row[factor.name] = newValue;
				break;
		}
		return row;
	}, row);

	pushToChangeData({before: rowBeforeUpdate, after: row, pipelineContext, topic});
	await logWrite(`Row[value=${row}] written.`);
};
export const runMergeRow = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, internalUnitContext, context, logWrite} = options;
	const {action} = context;

	if (!isMergeRowAction(action)) {
		throw new Error(`Not a merge row action[${action}].`);
	}

	const topic = prepareTopic(action, pipelineContext);
	const mapping = prepareMapping(action);
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
		await doMergeRow(row, mapping, topic, pipelineContext, internalUnitContext, logWrite);
	} else {
		throw new Error(`Cannot find row from topic[${topic.name}] by given condition.`);
	}
};