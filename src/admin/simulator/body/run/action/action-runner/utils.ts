import {PipelineRuntimeContext} from '../../types';
import {
	FindBy,
	FromFactor,
	FromTopic,
	MemoryWriter
} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {Factor} from '../../../../../../services/tuples/factor-types';
import {ParameterJoint} from '../../../../../../services/tuples/factor-calculator-types';

export const prepareVariable = (action: MemoryWriter): string => {
	const variableName = (action.variableName || '').trim();
	if (!variableName) {
		throw new Error('Variable name of copy to memory action cannot be null or empty.');
	}

	return variableName;
};

export const prepareTopic = (action: FromTopic, pipelineContext: PipelineRuntimeContext): Topic => {
	const topicId = action.topicId;
	if (!topicId) {
		throw new Error('Topic id of action cannot be null or empty.');
	}

	const topic = pipelineContext.allTopics[topicId];
	if (!topic) {
		throw new Error(`Topic[${topicId}] of action not found.`);
	}

	return topic;
};

export const prepareFactor = (topic: Topic, action: FromFactor): Factor => {
	const factorId = action.factorId;
	if (!factorId) {
		throw new Error('Factor id of action cannot be null or empty.');
	}

	const factor = topic.factors.find(f => f.factorId == factorId);
	if (!factor) {
		throw new Error(`Factor[${factorId}] of topic[${topic.topicId}] not found.`);
	}

	return factor;
};

export const prepareBy = (action: FindBy): ParameterJoint => {
	const joint = action.by;
	if (!joint) {
		throw new Error('By of read action cannot be null.');
	} else if (!joint.filters || joint.filters.length === 0) {
		throw new Error('By of read action cannot be empty.');
	}
	return joint;
};