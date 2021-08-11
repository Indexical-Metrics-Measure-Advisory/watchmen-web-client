import {ConnectedSpace} from '../../tuples/connected-space-types';
import {ParameterJointType, ParameterKind, TopicFactorParameter} from '../../tuples/factor-calculator-types';
import {generateUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';

export const DemoConnectedSpaces: Array<ConnectedSpace> = [
	{
		connectId: '1',
		spaceId: '1',
		name: 'Sales Statistics',
		subjects: [],
		isTemplate: false,
		lastVisitTime: '2020/10/31 14:23:07',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
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
					filters: {jointType: ParameterJointType.AND, filters: []},
					columns: [
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '1',
								factorId: '102'
							} as TopicFactorParameter,
							alias: 'Column1'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '1',
								factorId: '103'
							} as TopicFactorParameter,
							alias: 'Column2'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '1',
								factorId: '106'
							} as TopicFactorParameter,
							alias: 'Column3'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '2',
								factorId: '204'
							} as TopicFactorParameter,
							alias: 'Column4'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '2',
								factorId: '205'
							} as TopicFactorParameter,
							alias: 'Column5'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '2',
								factorId: '207'
							} as TopicFactorParameter,
							alias: 'Column6'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '304'
							} as TopicFactorParameter,
							alias: 'Column7'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '305'
							} as TopicFactorParameter,
							alias: 'Column8'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '306'
							} as TopicFactorParameter,
							alias: 'Column9'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '307'
							} as TopicFactorParameter,
							alias: 'Column10'
						}
					],
					joins: []
				},
				lastVisitTime: '2020/11/12 20:20:01',
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			},
			{
				subjectId: '2',
				name: 'District Summary',
				dataset: {
					filters: {jointType: ParameterJointType.AND, filters: []},
					columns: [
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '1',
								factorId: '103'
							} as TopicFactorParameter,
							alias: 'Column2'
						}
					],
					joins: []
				},
				lastVisitTime: '2020/11/02 20:25:01',
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			}
		],
		isTemplate: false,
		lastVisitTime: '2020/11/05 15:14:11',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '3',
		name: 'Sales Statistics in Maine',
		subjects: [],
		isTemplate: false,
		lastVisitTime: '2020/11/05 14:13:11',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '4',
		name: 'Sales Statistics in New Hampshire',
		subjects: [],
		isTemplate: false,
		lastVisitTime: '2020/11/05 13:12:11',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '5',
		name: 'Sales Statistics in Vermont',
		subjects: [],
		isTemplate: false,
		lastVisitTime: '2020/11/05 12:11:11',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '6',
		name: 'Sales Statistics in Rhode Island',
		subjects: [],
		isTemplate: false,
		lastVisitTime: '2020/11/05 11:10:11',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '7',
		name: 'Sales Statistics in Connecticut',
		subjects: [],
		isTemplate: false,
		lastVisitTime: '2020/11/05 10:09:11',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	},
	{
		spaceId: '1',
		connectId: '8',
		name: 'Sales Statistics in Massachusetts',
		subjects: [],
		isTemplate: false,
		lastVisitTime: '2020/11/05 09:08:11',
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	}
];