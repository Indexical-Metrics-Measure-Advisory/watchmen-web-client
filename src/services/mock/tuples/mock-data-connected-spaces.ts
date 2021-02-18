import { ConnectedSpace } from '../../tuples/connected-space-types';
import { ParameterKind, ParameterJointType, TopicFactorParameter } from '../../tuples/factor-calculator-types';
import { getCurrentTime } from '../../utils';

export const DemoConnectedSpaces: Array<ConnectedSpace> = [
	{
		connectId: '1',
		spaceId: '1',
		name: 'Sales Statistics',
		subjects: [],
		lastVisitTime: '2020/10/31 14:23:07',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		connectId: '2',
		spaceId: '1',
		name: 'Sales Statistics in New York',
		subjects: [
			{
				subjectId: '1',
				name: 'Premium Summary',
				dataset: {
					filters: { jointType: ParameterJointType.AND, filters: [] },
					columns: [
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '1',
								factorId: '102'
							} as TopicFactorParameter
						},
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '1',
								factorId: '103'
							} as TopicFactorParameter
						},
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '1',
								factorId: '106'
							} as TopicFactorParameter
						},
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '2',
								factorId: '204'
							} as TopicFactorParameter
						},
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '2',
								factorId: '205'
							} as TopicFactorParameter
						},
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '2',
								factorId: '207'
							} as TopicFactorParameter
						},
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '304'
							} as TopicFactorParameter
						},
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '305'
							} as TopicFactorParameter
						},
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '306'
							} as TopicFactorParameter
						},
						{
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '307'
							} as TopicFactorParameter
						}
					],
					joins: []
				},
				lastVisitTime: '2020/11/12 20:20:01',
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			},
			{
				subjectId: '2',
				name: 'District Summary',
				dataset: {
					filters: { jointType: ParameterJointType.AND, filters: [] },
					columns: [],
					joins: []
				},
				lastVisitTime: '2020/11/02 20:25:01',
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			}
		],
		lastVisitTime: '2020/11/05 15:14:11',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '3',
		name: 'Sales Statistics in Maine',
		subjects: [],
		lastVisitTime: '2020/11/05 14:13:11',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '4',
		name: 'Sales Statistics in New Hampshire',
		subjects: [],
		lastVisitTime: '2020/11/05 13:12:11',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '5',
		name: 'Sales Statistics in Vermont',
		subjects: [],
		lastVisitTime: '2020/11/05 12:11:11',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '6',
		name: 'Sales Statistics in Rhode Island',
		subjects: [],
		lastVisitTime: '2020/11/05 11:10:11',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '7',
		name: 'Sales Statistics in Connecticut',
		subjects: [],
		lastVisitTime: '2020/11/05 10:09:11',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '8',
		name: 'Sales Statistics in Massachusetts',
		subjects: [],
		lastVisitTime: '2020/11/05 09:08:11',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	}
];