import {ActionRuntimeContext, InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';
import {isExistsAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';

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

	const variableName = (action.variableName || '').trim();
	if (!variableName) {
		throw new Error('Variable name of copy to memory action cannot be null or empty.');
	}

	const topicId = action.topicId;
	if (!topicId) {
		throw new Error('Topic id of action cannot be null or empty.');
	}

	const topic = pipelineContext.allTopics[topicId];
	if (!topic) {
		throw new Error(`Topic[${topicId}] of action not found.`);
	}

	const joint = action.by;
	if (!joint) {
		throw new Error('By of read action cannot be null.');
	} else if (!joint.filters || joint.filters.length === 0) {
		throw new Error('By of read action cannot be empty.');
	}

	// val topic = prepareTopic()
	// val joint = prepareBy()
	// services.dynamicTopic {
	// 	exists(topic, build(topic, joint))
	// }.also {
	// 	variables[variableName] = it
	// }
};