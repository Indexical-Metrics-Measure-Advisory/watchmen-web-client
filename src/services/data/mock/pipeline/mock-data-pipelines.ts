import {
	ComputedParameter,
	ConstantParameter,
	ParameterComputeType,
	ParameterExpressionOperator,
	ParameterJoint,
	ParameterJointType,
	ParameterKind,
	TopicFactorParameter
} from '../../tuples/factor-calculator-types';
import {AggregateArithmetic} from '../../tuples/pipeline-stage-unit-action/aggregate-arithmetic-types';
import {
	SystemActionType,
	WriteTopicActionType
} from '../../tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {CopyToMemoryAction} from '../../tuples/pipeline-stage-unit-action/system-actions-types';
import {MergeRowAction, WriteFactorAction} from '../../tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {Pipeline, PipelineTriggerType} from '../../tuples/pipeline-types';
import {generateUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';

const WriteRawQuotationPremiumToOrder: WriteFactorAction = {
	actionId: generateUuid(),
	type: WriteTopicActionType.WRITE_FACTOR, topicId: '2', factorId: '207',
	source: {kind: ParameterKind.TOPIC, topicId: '4', factorId: '413'} as TopicFactorParameter,
	arithmetic: AggregateArithmetic.SUM,
	by: {
		jointType: ParameterJointType.AND,
		filters: [{
			left: {kind: ParameterKind.TOPIC, topicId: '2', factorId: '202'},
			operator: ParameterExpressionOperator.EQUALS,
			right: {kind: ParameterKind.TOPIC, topicId: '4', factorId: '402'}
		}]
	}
};
const WriteRawEndorsementPremiumToOrder: WriteFactorAction = {
	actionId: generateUuid(),
	type: WriteTopicActionType.WRITE_FACTOR, topicId: '2', factorId: '207',
	source: {kind: ParameterKind.TOPIC, topicId: '7', factorId: '706'} as TopicFactorParameter,
	arithmetic: AggregateArithmetic.SUM,
	by: {
		jointType: ParameterJointType.AND,
		filters: [{
			left: {kind: ParameterKind.TOPIC, topicId: '2', factorId: '204'},
			operator: ParameterExpressionOperator.EQUALS,
			right: {kind: ParameterKind.TOPIC, topicId: '7', factorId: '704'}
		}]
	}
};
const AsIssueYear: CopyToMemoryAction = {
	actionId: generateUuid(),
	type: SystemActionType.COPY_TO_MEMORY,
	variableName: 'IssueYear',
	source: {
		kind: ParameterKind.COMPUTED,
		type: ParameterComputeType.YEAR_OF,
		parameters: [{kind: ParameterKind.TOPIC, topicId: '2', factorId: '205'} as TopicFactorParameter]
	} as ComputedParameter
};
const AsIssueWeekOfYear: CopyToMemoryAction = {
	actionId: generateUuid(),
	type: SystemActionType.COPY_TO_MEMORY,
	variableName: 'IssueWeekOfYear',
	source: {
		kind: ParameterKind.COMPUTED,
		type: ParameterComputeType.WEEK_OF_YEAR,
		parameters: [{kind: ParameterKind.TOPIC, topicId: '2', factorId: '205'} as TopicFactorParameter]
	} as ComputedParameter
};
const MatchIssueWeekOfYear: ParameterJoint = {
	jointType: ParameterJointType.AND,
	filters: [{
		left: {kind: ParameterKind.TOPIC, topicId: '5', factorId: '501'},
		operator: ParameterExpressionOperator.EQUALS,
		right: {kind: ParameterKind.CONSTANT, value: '{IssueYear}'} as ConstantParameter
	}, {
		left: {kind: ParameterKind.TOPIC, topicId: '5', factorId: '502'},
		operator: ParameterExpressionOperator.EQUALS,
		right: {kind: ParameterKind.CONSTANT, value: '{IssueWeekOfYear}'} as ConstantParameter
	}]
};
const WriteWeeklyPremium: MergeRowAction = {
	actionId: generateUuid(),
	type: WriteTopicActionType.INSERT_OR_MERGE_ROW, topicId: '5',
	mapping: [
		{
			factorId: '501',
			source: {kind: ParameterKind.CONSTANT, value: '{IssueYear}'} as ConstantParameter,
			arithmetic: AggregateArithmetic.NONE
		},
		{
			factorId: '502',
			source: {kind: ParameterKind.CONSTANT, value: '{IssueWeekOfYear}'} as ConstantParameter,
			arithmetic: AggregateArithmetic.NONE
		},
		{
			factorId: '503',
			source: {kind: ParameterKind.TOPIC, topicId: '2', factorId: '207'} as TopicFactorParameter,
			arithmetic: AggregateArithmetic.SUM
		}
	],
	by: MatchIssueWeekOfYear
};

const AsIssueMonthOfYear: CopyToMemoryAction = {
	actionId: generateUuid(),
	type: SystemActionType.COPY_TO_MEMORY,
	variableName: 'IssueMonthOfYear',
	source: {
		kind: ParameterKind.COMPUTED,
		type: ParameterComputeType.MONTH_OF,
		parameters: [{kind: ParameterKind.TOPIC, topicId: '2', factorId: '205'} as TopicFactorParameter]
	} as ComputedParameter
};
const MatchIssueMonthOfYear: ParameterJoint = {
	jointType: ParameterJointType.AND,
	filters: [{
		left: {kind: ParameterKind.TOPIC, topicId: '6', factorId: '601'},
		operator: ParameterExpressionOperator.EQUALS,
		right: {kind: ParameterKind.CONSTANT, value: '{IssueYear}'} as ConstantParameter
	}, {
		left: {kind: ParameterKind.TOPIC, topicId: '6', factorId: '602'},
		operator: ParameterExpressionOperator.EQUALS,
		right: {kind: ParameterKind.CONSTANT, value: '{IssueMonthOfYear}'} as ConstantParameter
	}]
};
const WriteMonthlyPremium: MergeRowAction = {
	actionId: generateUuid(),
	type: WriteTopicActionType.INSERT_OR_MERGE_ROW, topicId: '6',
	mapping: [
		{
			factorId: '601',
			source: {kind: ParameterKind.CONSTANT, value: '{IssueYear}'} as ConstantParameter,
			arithmetic: AggregateArithmetic.NONE
		},
		{
			factorId: '602',
			source: {kind: ParameterKind.CONSTANT, value: '{IssueMonthOfYear}'} as ConstantParameter,
			arithmetic: AggregateArithmetic.NONE
		},
		{
			factorId: '603',
			source: {kind: ParameterKind.TOPIC, topicId: '2', factorId: '207'} as TopicFactorParameter,
			arithmetic: AggregateArithmetic.SUM
		}
	],
	by: MatchIssueMonthOfYear
};
export const DemoPipelines: Array<Pipeline> = [
	{
		pipelineId: '1', topicId: '4', type: PipelineTriggerType.INSERT,
		conditional: false, enabled: true, validated: true,
		name: 'Write Premium from Quotation to Order',
		stages: [
			{
				stageId: generateUuid(),
				name: '', conditional: false,
				units: [
					{
						unitId: generateUuid(),
						name: '',
						conditional: true,
						on: {
							jointType: ParameterJointType.AND,
							filters: [{
								left: {kind: ParameterKind.TOPIC, topicId: '4', factorId: '405'},
								operator: ParameterExpressionOperator.NOT_EMPTY,
								right: {kind: ParameterKind.CONSTANT, value: ''}
							}]
						},
						do: [WriteRawQuotationPremiumToOrder]
					}
				]
			}
		],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	},
	{
		pipelineId: '2', topicId: '7', type: PipelineTriggerType.INSERT_OR_MERGE,
		conditional: false, enabled: true, validated: true,
		name: 'Write Premium from Endorsement to Order',
		stages: [
			{
				stageId: generateUuid(),
				name: '', conditional: false,
				units: [
					{
						unitId: generateUuid(),
						name: '',
						conditional: false, do: [WriteRawEndorsementPremiumToOrder]
					}
				]
			}
		],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	},
	{
		pipelineId: '3', topicId: '2', type: PipelineTriggerType.INSERT_OR_MERGE,
		conditional: false, enabled: true, validated: true,
		name: '',
		stages: [
			{
				stageId: generateUuid(),
				name: '', conditional: false,
				units: [{
					unitId: generateUuid(),
					name: '',
					conditional: false,
					do: [AsIssueYear, AsIssueWeekOfYear, WriteWeeklyPremium]
				}]
			}
		],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	},
	{
		pipelineId: '4', topicId: '2', type: PipelineTriggerType.INSERT_OR_MERGE,
		conditional: false, enabled: true, validated: true,
		name: '',
		stages: [
			{
				stageId: generateUuid(),
				name: '', conditional: false,
				units: [{
					unitId: generateUuid(),
					name: '',
					conditional: false,
					do: [AsIssueYear, AsIssueMonthOfYear, WriteMonthlyPremium]
				}]
			}
		],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	}
].map(p => ({...p, tenantId: '1'}));
