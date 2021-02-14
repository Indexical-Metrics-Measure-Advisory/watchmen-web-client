import {
	ComputedParameter,
	ConstantParameter,
	ParameterComputeType,
	ParameterExpressionOperator,
	ParameterFrom,
	ParameterJoint,
	ParameterJointType,
	TopicFactorParameter
} from '../../tuples/factor-calculator-types';
import {
	SystemActionType,
	WriteTopicActionType
} from '../../tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { CopyToMemoryAction } from '../../tuples/pipeline-stage-unit-action/system-actions-types';
import {
	AggregateArithmetic,
	MergeRowAction,
	WriteFactorAction
} from '../../tuples/pipeline-stage-unit-action/write-topic-actions-types';
import { Pipeline, PipelineTriggerType } from '../../tuples/pipeline-types';
import { getCurrentTime } from '../../utils';

const WriteRawQuotationPremiumToPolicy: WriteFactorAction = {
	type: WriteTopicActionType.WRITE_FACTOR, topicId: '2', factorId: '207',
	source: { from: ParameterFrom.TOPIC, topicId: '4', factorId: '413' } as TopicFactorParameter,
	by: {
		jointType: ParameterJointType.AND,
		filters: [ {
			left: { from: ParameterFrom.TOPIC, topicId: '2', factorId: '202' },
			operator: ParameterExpressionOperator.EQUALS,
			right: { from: ParameterFrom.TOPIC, topicId: '4', factorId: '402' }
		} ]
	}
};
const WriteRawEndorsementPremiumToPolicy: WriteFactorAction = {
	type: WriteTopicActionType.WRITE_FACTOR, topicId: '2', factorId: '207',
	source: { from: ParameterFrom.TOPIC, topicId: '7', factorId: '706' } as TopicFactorParameter,
	by: {
		jointType: ParameterJointType.AND,
		filters: [ {
			left: { from: ParameterFrom.TOPIC, topicId: '2', factorId: '204' },
			operator: ParameterExpressionOperator.EQUALS,
			right: { from: ParameterFrom.TOPIC, topicId: '7', factorId: '704' }
		} ]
	}
};
const AsIssueYear: CopyToMemoryAction = {
	type: SystemActionType.COPY_TO_MEMORY,
	variableName: 'IssueYear',
	source: {
		from: ParameterFrom.COMPUTED,
		type: ParameterComputeType.YEAR_OF,
		parameters: [ { from: ParameterFrom.TOPIC, topicId: '2', factorId: '205' } as TopicFactorParameter ]
	} as ComputedParameter
};
const AsIssueWeekOfYear: CopyToMemoryAction = {
	type: SystemActionType.COPY_TO_MEMORY,
	variableName: 'IssueWeekOfYear',
	source: {
		from: ParameterFrom.COMPUTED,
		type: ParameterComputeType.WEEK_OF_YEAR,
		parameters: [ { from: ParameterFrom.TOPIC, topicId: '2', factorId: '205' } as TopicFactorParameter ]
	} as ComputedParameter
};
const MatchIssueWeekOfYear: ParameterJoint = {
	jointType: ParameterJointType.AND,
	filters: [ {
		left: { from: ParameterFrom.TOPIC, topicId: '5', factorId: '501' },
		operator: ParameterExpressionOperator.EQUALS,
		right: { from: ParameterFrom.CONSTANT, value: 'IssueYear' } as ConstantParameter
	}, {
		left: { from: ParameterFrom.TOPIC, topicId: '5', factorId: '502' },
		operator: ParameterExpressionOperator.EQUALS,
		right: { from: ParameterFrom.CONSTANT, value: 'IssueWeekOfYear' } as ConstantParameter
	} ]
};
const WriteWeeklyPremium: MergeRowAction = {
	type: WriteTopicActionType.INSERT_OR_MERGE_ROW, topicId: '5',
	mapping: [
		{ factorId: '501', source: { from: ParameterFrom.CONSTANT, value: 'IssueYear' } as ConstantParameter },
		{ factorId: '502', source: { from: ParameterFrom.CONSTANT, value: 'IssueWeekOfYear' } as ConstantParameter },
		{
			factorId: '503',
			source: { from: ParameterFrom.TOPIC, topicId: '2', factorId: '207' } as TopicFactorParameter,
			arithmetic: AggregateArithmetic.SUM
		}
	],
	by: MatchIssueWeekOfYear
};

const AsIssueMonthOfYear: CopyToMemoryAction = {
	type: SystemActionType.COPY_TO_MEMORY,
	variableName: 'IssueMonthOfYear',
	source: {
		from: ParameterFrom.COMPUTED,
		type: ParameterComputeType.MONTH_OF,
		parameters: [ { from: ParameterFrom.TOPIC, topicId: '2', factorId: '205' } as TopicFactorParameter ]
	} as ComputedParameter
};
const MatchIssueMonthOfYear: ParameterJoint = {
	jointType: ParameterJointType.AND,
	filters: [ {
		left: { from: ParameterFrom.TOPIC, topicId: '6', factorId: '601' },
		operator: ParameterExpressionOperator.EQUALS,
		right: { from: ParameterFrom.CONSTANT, value: 'IssueYear' } as ConstantParameter
	}, {
		left: { from: ParameterFrom.TOPIC, topicId: '6', factorId: '602' },
		operator: ParameterExpressionOperator.EQUALS,
		right: { from: ParameterFrom.CONSTANT, value: 'IssueMonthOfYear' } as ConstantParameter
	} ]
};
const WriteMonthlyPremium: MergeRowAction = {
	type: WriteTopicActionType.INSERT_OR_MERGE_ROW, topicId: '6',
	mapping: [
		{ factorId: '601', source: { from: ParameterFrom.CONSTANT, value: 'IssueYear' } as ConstantParameter },
		{ factorId: '602', source: { from: ParameterFrom.CONSTANT, value: 'IssueMonthOfYear' } as ConstantParameter },
		{
			factorId: '603',
			source: { from: ParameterFrom.TOPIC, topicId: '2', factorId: '207' } as TopicFactorParameter,
			arithmetic: AggregateArithmetic.SUM
		}
	],
	by: MatchIssueMonthOfYear
};
export const DemoPipelines: Array<Pipeline> = [
	{
		pipelineId: '1', topicId: '4', type: PipelineTriggerType.INSERT,
		conditional: false, enabled: true,
		name: 'Write Premium from Quotation to Policy',
		stages: [
			{
				name: '', conditional: false,
				units: [
					{
						conditional: true,
						on: {
							jointType: ParameterJointType.AND,
							filters: [ {
								left: { from: ParameterFrom.TOPIC, topicId: '4', factorId: '405' },
								operator: ParameterExpressionOperator.NOT_EMPTY,
								right: { from: ParameterFrom.CONSTANT, value: '' }
							} ]
						},
						do: [ WriteRawQuotationPremiumToPolicy ]
					}
				]
			}
		],
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		pipelineId: '2', topicId: '7', type: PipelineTriggerType.INSERT_OR_MERGE,
		conditional: false, enabled: true,
		name: 'Write Premium from Endorsement to Policy',
		stages: [
			{
				name: '', conditional: false,
				units: [
					{
						conditional: false, do: [ WriteRawEndorsementPremiumToPolicy ]
					}
				]
			}
		],
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		pipelineId: '3', topicId: '2', type: PipelineTriggerType.INSERT_OR_MERGE,
		conditional: false, enabled: true,
		name: '',
		stages: [
			{
				name: '', conditional: false,
				units: [ { conditional: false, do: [ AsIssueYear, AsIssueWeekOfYear, WriteWeeklyPremium ] } ]
			}
		],
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		pipelineId: '4', topicId: '2', type: PipelineTriggerType.INSERT_OR_MERGE,
		conditional: false, enabled: true,
		name: '',
		stages: [
			{
				name: '', conditional: false,
				units: [ { conditional: false, do: [ AsIssueYear, AsIssueMonthOfYear, WriteMonthlyPremium ] } ]
			}
		],
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	}
];
