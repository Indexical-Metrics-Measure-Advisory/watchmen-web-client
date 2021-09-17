import {isExistsAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {computeJoint} from '../../compute/condition-compute';
import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {prepareBy, prepareTopic, prepareVariable} from './utils';

export const runExists = async (options: {
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	context: ActionRuntimeContext,
	logWrite: (message: string) => Promise<void>;
}) => {
	const {pipelineContext, internalUnitContext, context, logWrite} = options;
	const {action} = context;

	if (!isExistsAction(action)) {
		throw new Error(`Not an exists action[${action}].`);
	}

	const variableName = prepareVariable(action);
	const topic = prepareTopic(action, pipelineContext);
	const by = prepareBy(action);

	const exists = (pipelineContext.runtimeData[topic.topicId] || []).some(fakeTriggerData => {
		return computeJoint({
			joint: by, pipelineContext, internalUnitContext, alternativeTriggerData: fakeTriggerData
		});
	});

	pipelineContext.variables[variableName] = exists;
	if (exists) {
		await logWrite('Given topic data exists.');
	} else {
		await logWrite('Given topic data doesn\'t exist.');
	}
};