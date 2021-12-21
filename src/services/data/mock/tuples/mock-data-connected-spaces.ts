import {CustomizedChartSettings} from '../../tuples/chart-def/chart-customized';
import {ChartType} from '../../tuples/chart-types';
import {ConnectedSpace} from '../../tuples/connected-space-types';
import {ParameterJointType, ParameterKind, TopicFactorParameter} from '../../tuples/factor-calculator-types';
import {TopicJoinType} from '../../tuples/subject-types';
import {generateUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';
import {Quotation} from './mock-data-topics';

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
								topicId: Quotation.topicId,
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
				reports: [
					{
						reportId: '1', name: 'Premium Summary', indicators: [], dimensions: [],
						rect: {x: 32, y: 32, width: 400, height: 300},
						chart: {
							type: ChartType.CUSTOMIZED,
							settings: {
								script: '(()=>{return{tooltip:{},backgroundColor:\'#fff\',visualMap:{show:false,dimension:2,min:-1,max:1,inRange:{color:[\'#313695\',\'#4575b4\',\'#74add1\',\'#abd9e9\',\'#e0f3f8\',\'#ffffbf\',\'#fee090\',\'#fdae61\',\'#f46d43\',\'#d73027\',\'#a50026\']}},xAxis3D:{type:\'value\'},yAxis3D:{type:\'value\'},zAxis3D:{type:\'value\'},grid3D:{viewControl:{/*projection:\'orthographic\'*/}},series:[{type:\'surface\',wireframe:{/*show:false*/},equation:{x:{step:0.05},y:{step:0.05},z:function(x,y){if(Math.abs(x)<0.1&&Math.abs(y)<0.1){return\'-\';}return Math.sin(x*Math.PI)*Math.sin(y*Math.PI);}}}]}})();'
							} as CustomizedChartSettings
						},
						simulateThumbnail: 'data:image/png;base64,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',
						lastVisitTime: getCurrentTime(),
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					}
				],
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
							alias: 'QuoteDate'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '306'
							} as TopicFactorParameter,
							alias: 'Gender'
						},
						{
							columnId: generateUuid(),
							parameter: {
								kind: ParameterKind.TOPIC,
								topicId: '3',
								factorId: '307'
							} as TopicFactorParameter,
							alias: 'BornCity'
						}
					],
					joins: [
						{
							topicId: '1', factorId: '106', secondaryTopicId: '3', secondaryFactorId: '301',
							type: TopicJoinType.INNER

						}
					]
				},
				lastVisitTime: '2020/11/02 20:25:01',
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			}
		],
		isTemplate: true,
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