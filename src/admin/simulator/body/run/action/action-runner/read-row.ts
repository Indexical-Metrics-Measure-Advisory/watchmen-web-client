import {isReadRowAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {computeJoint} from '../../compute/condition-compute';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {prepareBy, prepareTopic, prepareVariable} from './utils';

export const runReadRow = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, internalUnitContext, context, logWrite} = options;
	const {action} = context;

	if (!isReadRowAction(action)) {
		throw new Error(`Not a read row action[${action}].`);
	}

	const variableName = prepareVariable(action);
	const topic = prepareTopic(action, pipelineContext);
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

	pipelineContext.variables[variableName] = row;
	if (found) {
		await logWrite(`Row[value=${JSON.stringify(row)}] found.`);
	} else {
		throw new Error('Row not found by given condition.');
		// await logWrite('Row not found by given condition.');
	}
};