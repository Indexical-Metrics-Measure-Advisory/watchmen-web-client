import {Parameter, ParameterJoint} from '@/services/data/tuples/factor-calculator-types';
import {Factor} from '@/services/data/tuples/factor-types';
import {
	FindBy,
	FromFactor,
	FromTopic,
	MemoryWriter,
	ToFactor
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {CopyToMemoryAction} from '@/services/data/tuples/pipeline-stage-unit-action/system-actions-types';
import {
	MappingFactor,
	MappingRow,
	WriteFactorAction
} from '@/services/data/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DataRow} from '../../../../types';
import {computeParameter} from '../../compute/parameter-compute';
import {InternalUnitRuntimeContext, PipelineRuntimeContext} from '../../types';

export const AGGREGATE_ASSIST_FACTOR_NAME = 'aggregate_assist_';
export const DEFAULT_AGGREGATE_ASSIST_FACTOR_VALUE = '{}';
export const AGGREGATE_AVG_COUNT_PROP_NAME = 'avg_count';

export const prepareVariable = (action: MemoryWriter): string => {
	const variableName = (action.variableName || '').trim();
	if (!variableName) {
		throw new Error('Variable name of copy to memory action cannot be null or empty.');
	}

	return variableName;
};

export const prepareTopic = (action: FromTopic | ToFactor, pipelineContext: PipelineRuntimeContext): Topic => {
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

export const prepareFactor = (topic: Topic, action: FromFactor | ToFactor): Factor => {
	const factorId = action.factorId;
	if (!factorId) {
		throw new Error('Factor id of action cannot be null or empty.');
	}

	// eslint-disable-next-line
	const factor = topic.factors.find(f => f.factorId == factorId);
	if (!factor) {
		throw new Error(`Factor[${factorId}] of topic[${topic.name}] not found.`);
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

export const prepareSource = (action: CopyToMemoryAction | WriteFactorAction): Parameter => {
	const source = action.source;
	if (source == null) {
		throw new Error('Source of copy to memory action cannot be null.');
	}
	return source;
};

export const prepareMapping = (action: MappingRow): Array<MappingFactor> => {
	const mapping = action.mapping;
	if (mapping == null) {
		throw  new Error('Mapping of insert/merge action cannot be null.');
	}
	if (mapping.length === 0) {
		throw new Error('Mapping of insert/merge action cannot be empty.');
	}
	return mapping;
};

export const getOldValue = (options: {
	parameter: Parameter,
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext: InternalUnitRuntimeContext,
	defaultValue?: any
}) => {
	const {parameter, pipelineContext, internalUnitContext, defaultValue} = options;
	if (pipelineContext.triggerDataOnce) {
		return computeParameter({
			parameter,
			pipelineContext,
			internalUnitContext,
			alternativeTriggerData: pipelineContext.triggerData
		}) || defaultValue;
	} else {
		return defaultValue;
	}
};

export const pushToChangeData = (options: {
	after: DataRow,
	before?: DataRow,
	topic: Topic,
	pipelineContext: PipelineRuntimeContext
}) => {
	const {before, after, topic, pipelineContext} = options;
	pipelineContext.changedData.push({
		topicId: topic.topicId,
		before: before,
		after
	});
};
