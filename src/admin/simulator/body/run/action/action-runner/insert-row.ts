import {AggregateArithmetic} from '@/services/data/tuples/pipeline-stage-unit-action/aggregate-arithmetic-types';
import {isInsertRowAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {MappingFactor} from '@/services/data/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DataRow} from '../../../../types';
import {computeParameter} from '../../compute/parameter-compute';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {
	AGGREGATE_ASSIST_FACTOR_NAME,
	AGGREGATE_AVG_COUNT_PROP_NAME,
	prepareMapping,
	prepareTopic,
	pushToChangeData
} from './utils';

export const doInsertRow = async (
	mapping: Array<MappingFactor>,
	topic: Topic,
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	logWrite: (message: string) => Promise<void>
) => {
	const newRow = mapping.reduce((newRow, mapping) => {
		const {source, factorId, arithmetic} = mapping;
		// eslint-disable-next-line
		const factor = topic.factors.find(f => f.factorId == factorId);
		if (!factor) {
			throw new Error(`Factor[${factorId}] of mapping[${mapping}] not found.`);
		}
		if (arithmetic === AggregateArithmetic.COUNT) {
			// the first one, count always be 1
			newRow[factor.name] = 1;
		} else {
			// the first one, arithmetic is ignored
			const value = computeParameter({
				parameter: source,
				pipelineContext,
				internalUnitContext,
				alternativeTriggerData: null
			});
			if (arithmetic === AggregateArithmetic.AVG) {
				newRow[AGGREGATE_ASSIST_FACTOR_NAME] = JSON.stringify({[`${factor.name}.${AGGREGATE_AVG_COUNT_PROP_NAME}`]: 1});
				newRow[factor.name] = value || 0;
			} else if (arithmetic === AggregateArithmetic.SUM) {
				newRow[factor.name] = value || 0;
			} else {
				newRow[factor.name] = value;
			}
		}
		return newRow;
	}, {} as DataRow);

	let existsRows = pipelineContext.runtimeData[topic.topicId];
	if (!existsRows) {
		existsRows = [];
		pipelineContext.runtimeData[topic.topicId] = existsRows;
	}
	existsRows.push(newRow);
	pushToChangeData({after: newRow, topic, pipelineContext});
	await logWrite(`New row[value=${newRow}] created.`);
};
export const runInsertRow = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, internalUnitContext, context, logWrite} = options;
	const {action} = context;

	if (!isInsertRowAction(action)) {
		throw new Error(`Not an insert row action[${action}].`);
	}

	const topic = prepareTopic(action, pipelineContext);
	const mapping = prepareMapping(action);

	await doInsertRow(mapping, topic, pipelineContext, internalUnitContext, logWrite);
};