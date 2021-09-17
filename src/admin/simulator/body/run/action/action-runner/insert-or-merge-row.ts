import {isMergeRowAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {computeJoint} from '../../compute/condition-compute';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {doInsertRow} from './insert-row';
import {doMergeRow} from './merge-row';
import {prepareBy, prepareMapping, prepareTopic} from './utils';

export const runInsertOrMergeRow = async (options: {
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
		await doInsertRow(mapping, topic, pipelineContext, internalUnitContext, logWrite);
	}
};