import {
	ConstantParameter,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterJoint,
	ParameterJointType,
	ParameterKind
} from '@/services/data/tuples/factor-calculator-types';
import {
	createConstantParameter,
	createTopicFactorParameter,
	defendParameter,
	isExpressionParameter,
	isJointParameter
} from '@/services/data/tuples/parameter-utils';
import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {AggregateArithmetic} from '@/services/data/tuples/pipeline-stage-unit-action/aggregate-arithmetic-types';
import {
	FindBy,
	FromFactor,
	FromTopic,
	MemoryWriter,
	PipelineStageUnitAction,
	SystemActionType,
	ToFactor,
	ToTopic
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	isAlarmAction,
	isCopyToMemoryAction,
	isExistsAction,
	isInsertRowAction,
	isMergeRowAction,
	isReadFactorAction,
	isReadFactorsAction,
	isReadRowAction,
	isReadRowsAction,
	isWriteFactorAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {
	ExistsAction,
	ReadFactorAction,
	ReadFactorsAction,
	ReadRowAction,
	ReadRowsAction
} from '@/services/data/tuples/pipeline-stage-unit-action/read-topic-actions-types';
import {
	AlarmAction,
	AlarmActionSeverity,
	CopyToMemoryAction
} from '@/services/data/tuples/pipeline-stage-unit-action/system-actions-types';
import {
	InsertRowAction,
	MappingFactor,
	MappingRow,
	MergeRowAction,
	WriteFactorAction
} from '@/services/data/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline, PipelineTriggerType} from '@/services/data/tuples/pipeline-types';
import {TopicId} from '@/services/data/tuples/topic-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';

export const createAction = (): AlarmAction => {
	return {
		actionId: generateUuid(),
		type: SystemActionType.ALARM,
		conditional: false,
		severity: AlarmActionSeverity.MEDIUM,
		message: ''
	};
};
export const createUnit = (): PipelineStageUnit => {
	return {
		unitId: generateUuid(),
		name: 'Noname Unit',
		conditional: false,
		do: [createAction()]
	};
};
export const createStage = (): PipelineStage => {
	return {
		stageId: generateUuid(),
		name: 'Noname Stage',
		conditional: false,
		units: [createUnit()]
	};
};

export const createPipeline = (topicId: TopicId, name?: string): Pipeline => {
	const pipelineId = generateUuid();
	return {
		pipelineId,
		topicId,
		name: name || 'Noname Pipeline',
		type: PipelineTriggerType.INSERT_OR_MERGE,
		conditional: false,
		stages: [createStage()],
		enabled: false,
		validated: false,
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

export const defendJoint = (joint: ParameterJoint) => {
	joint.jointType = joint.jointType || ParameterJointType.AND;
	if (!joint.filters) {
		joint.filters = [createTopicEqualsConstantParameter()];
	}
	if (joint.filters.length === 0) {
		joint.filters.push(createTopicEqualsConstantParameter());
	}
	const availableFilters = joint.filters.filter(x => !!x).map(filter => {
		if (isJointParameter(filter)) {
			defendJoint(filter);
		} else if (isExpressionParameter(filter)) {
			filter.left = filter.left || createTopicFactorParameter();
			defendParameter(filter.left);
			filter.operator = filter.operator || ParameterExpressionOperator.EQUALS;
			defendParameter(filter.right);
		}
		return filter;
	});
	joint.filters.length = 0;
	joint.filters.push(...availableFilters);
};
export const defendMemoryWriter = (writer: MemoryWriter) => {
	writer.variableName = writer.variableName || '';
};
export const defendTopic = (topic: FromTopic | ToTopic) => {
	topic.topicId = topic.topicId || '';
};
export const defendFactor = (factor: FromFactor | ToFactor) => {
	defendTopic(factor);
	factor.factorId = factor.factorId || '';
};
export const defendFindBy = (findBy: FindBy) => {
	if (!findBy.by) {
		findBy.by = createJointParameter();
	} else {
		defendJoint(findBy.by);
	}
};
export const createMapping = (): MappingFactor => {
	return {
		factorId: '',
		source: createTopicFactorParameter(),
		arithmetic: AggregateArithmetic.NONE
	};
};
export const defendMappingRow = (row: MappingRow) => {
	if (!row.mapping) {
		row.mapping = [createMapping()];
	}
	if (row.mapping.length === 0) {
		row.mapping.push(createMapping());
	}
	const availableMapping = row.mapping.filter(x => !!x).map(mapping => {
		mapping.factorId = mapping.factorId || '';
		mapping.source = mapping.source || createConstantParameter();
		defendParameter(mapping.source);
		return mapping;
	});
	row.mapping.length = 0;
	row.mapping.push(...availableMapping);
};

export const defendAlarmAction = (action: AlarmAction) => {
	action.conditional = action.conditional || false;
	if (action.conditional) {
		if (!action.on) {
			action.on = createJointParameter();
		} else {
			defendJoint(action.on);
		}
	}
	action.severity = action.severity || AlarmActionSeverity.MEDIUM;
	action.message = action.message || '';
};
export const defendCopyToMemoryAction = (action: CopyToMemoryAction) => {
	defendMemoryWriter(action);
	action.source = action.source || createConstantParameter();
};
export const defendExistsAction = (action: ExistsAction) => {
	defendMemoryWriter(action);
	defendTopic(action);
	defendFindBy(action);
};
export const defendReadFactorAction = (action: ReadFactorAction) => {
	defendMemoryWriter(action);
	defendFactor(action);
	action.arithmetic = action.arithmetic || AggregateArithmetic.NONE;
	defendFindBy(action);
};
export const defendReadFactorsAction = (action: ReadFactorsAction) => {
	defendMemoryWriter(action);
	defendFactor(action);
	defendFindBy(action);
};
export const defendReadRowAction = (action: ReadRowAction) => {
	defendMemoryWriter(action);
	defendTopic(action);
	defendFindBy(action);
};
export const defendReadRowsAction = (action: ReadRowsAction) => {
	defendMemoryWriter(action);
	defendTopic(action);
	defendFindBy(action);
};
export const defendWriteFactorAction = (action: WriteFactorAction) => {
	defendFactor(action);
	action.source = action.source || {kind: ParameterKind.CONSTANT, value: ''} as ConstantParameter;
	action.arithmetic = action.arithmetic || AggregateArithmetic.NONE;
	defendFindBy(action);
};
export const defendMergeRowAction = (action: MergeRowAction) => {
	defendMappingRow(action);
	defendFindBy(action);
};
export const defendInsertRowAction = (action: InsertRowAction) => {
	defendMappingRow(action);
};
export const defendAction = (action: PipelineStageUnitAction) => {
	if (isAlarmAction(action)) {
		defendAlarmAction(action);
	} else if (isCopyToMemoryAction(action)) {
		defendCopyToMemoryAction(action);
	} else if (isExistsAction(action)) {
		defendExistsAction(action);
	} else if (isReadFactorAction(action)) {
		defendReadFactorAction(action);
	} else if (isReadFactorsAction(action)) {
		defendReadFactorsAction(action);
	} else if (isReadRowAction(action)) {
		defendReadRowAction(action);
	} else if (isReadRowsAction(action)) {
		defendReadRowsAction(action);
	} else if (isWriteFactorAction(action)) {
		defendWriteFactorAction(action);
	} else if (isMergeRowAction(action)) {
		defendMergeRowAction(action);
	} else if (isInsertRowAction(action)) {
		defendInsertRowAction(action);
	}
};

export const createTopicEqualsConstantParameter = (): ParameterExpression => {
	return {
		left: createTopicFactorParameter(),
		operator: ParameterExpressionOperator.EQUALS,
		right: createConstantParameter()
	};
};
export const createJointParameter = (jointType?: ParameterJointType): ParameterJoint => {
	return {
		jointType: jointType || ParameterJointType.AND,
		filters: [createTopicEqualsConstantParameter()]
	};
};
