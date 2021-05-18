import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {isMergeRowAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
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
import {
	AggregateArithmetic,
	MappingFactor
} from '../../../../../../services/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {computeParameter} from '../../compute/parameter-compute';
import {computeJoint} from '../../compute/condition-compute';
import {DataRow} from '../../../../simulator-event-bus-types';
import {Topic} from '../../../../../../services/tuples/topic-types';

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
				// count will not be changed when merge
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
				row[factor.name] = (oldAvg * count + newValue - oldValue) / count;
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
				row[factor.name] = oldSum + newValue - oldValue;
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