import {
	ParameterExpressionOperator,
	ParameterFrom,
	ParameterJointType,
	TopicFactorParameter
} from '../../tuples/factor-calculator-types';
import { WriteTopicActionType } from '../../tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { WriteFactorAction } from '../../tuples/pipeline-stage-unit-action/write-topic-actions-types';
import { Pipeline, PipelineTriggerType } from '../../tuples/pipeline-types';
import { getCurrentTime } from '../../utils';

const WriteRawQuotationSequenceToPolicy: WriteFactorAction = {
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
export const DemoPipelines: Array<Pipeline> = [
	{
		pipelineId: '1', topicId: '4', type: PipelineTriggerType.INSERT, conditional: false,
		name: '',
		stages: [
			{
				name: '', conditional: false,
				units: [
					{
						conditional: false,
						do: [ WriteRawQuotationSequenceToPolicy ]
					}
				]
			}
		],
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	}
];


// 	{
// 	topicId: '2',
// 	consume: [
// 		{
// 			topicId: '7',
// 			type: PipelineTriggerType.INSERT,
// 			stages: [
// 				{
// 					units: [
// 						{
// 							do: [
// 								{
// 									type: WriteTopicActionType.WRITE_FACTOR,
// 									topicId: '2',
// 									factorId: '201',
// 									source: { from: ParameterFrom.TOPIC, topicId: '4', factorId: '401' }
// 								} as WriteFactorAction
// 							]
// 						}
// 					]
// 				}
// 			]
// 		}
// 	],
// 	produce: [
// 		{
// 			topicId: '2',
// 			type: PipelineTriggerType.INSERT_OR_MERGE,
// 			stages: [
// 				{
// 					units: [
// 						{
// 							do: [
// 								{
// 									type: WriteTopicActionType.WRITE_FACTOR,
// 									topicId: '5',
// 									factorId: '501',
// 									value: {
// 										type: SomeValueType.FACTOR,
// 										topicId: '2',
// 										factorId: '205',
// 										arithmetic: DatePartArithmetic.YEAR_OF
// 									}
// 								},
// 								{
// 									type: WriteTopicActionType.WRITE_FACTOR,
// 									topicId: '5',
// 									factorId: '502',
// 									value: {
// 										type: SomeValueType.FACTOR,
// 										topicId: '2',
// 										factorId: '205',
// 										arithmetic: DatePartArithmetic.WEEK_OF
// 									}
// 								},
// 								{
// 									type: WriteTopicActionType.WRITE_FACTOR,
// 									topicId: '5',
// 									factorId: '503',
// 									value: {
// 										type: SomeValueType.FACTOR,
// 										topicId: '2',
// 										factorId: '207'
// 									}
// 								}
// 							]
// 						},
// 						{
// 							do: [
// 								{
// 									type: WriteTopicActionType.WRITE_FACTOR,
// 									topicId: '6',
// 									factorId: '601',
// 									value: {
// 										type: SomeValueType.FACTOR,
// 										topicId: '2',
// 										factorId: '205',
// 										arithmetic: DatePartArithmetic.YEAR_OF
// 									}
// 								},
// 								{
// 									type: WriteTopicActionType.WRITE_FACTOR,
// 									topicId: '6',
// 									factorId: '602',
// 									value: {
// 										type: SomeValueType.FACTOR,
// 										topicId: '2',
// 										factorId: '205',
// 										arithmetic: DatePartArithmetic.MONTH_OF
// 									}
// 								},
// 								{
// 									type: WriteTopicActionType.WRITE_FACTOR,
// 									topicId: '6',
// 									factorId: '603',
// 									value: {
// 										type: SomeValueType.FACTOR,
// 										topicId: '2',
// 										factorId: '207'
// 									}
// 								}
// 							]
// 						}
// 					]
// 				}
// 			]
// 		},
// 		{
// 			topicId: '5',
// 			type: PipelineTriggerType.INSERT_OR_MERGE,
// 			stages: [
// 				{
// 					units: [
// 						{
// 							do: [
// 								{
// 									type: WriteTopicActionType.WRITE_FACTOR,
// 									topicId: '8',
// 									factorId: '801',
// 									value: {
// 										type: SomeValueType.FACTOR,
// 										topicId: '5',
// 										factorId: '501'
// 									}
// 								}
// 							]
// 						}
// 					]
// 				}
// 			]
// 		}
// 	]
// };
