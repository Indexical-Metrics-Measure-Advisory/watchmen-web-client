import dayjs from 'dayjs';
import { ConnectedSpace } from '../console/connected-space-types';
import { AvailableSpaceInConsole } from '../console/settings-types';
import { Topic } from '../tuples/topic-types';
import { DemoTopics } from './tuples/mock-data-topics';

export const fetchMockConnectedSpaces = async (): Promise<Array<ConnectedSpace>> => {
	return [
		{
			connectId: '1',
			spaceId: '1',
			name: 'Sales Statistics',
			groups: [],
			subjects: [],
			lastVisitTime: '2020/10/31 14:23:07',
			createTime: '2020/10/31 14:23:07',
			lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
		},
		{
			connectId: '2',
			spaceId: '1',
			name: 'Sales Statistics in New York',
			lastVisitTime: '2020/11/05 15:14:11',
			createTime: '2020/11/05 15:14:11',
			lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			subjects: [
				{
					subjectId: '1',
					name: 'Premium Summary',
					lastVisitTime: '2020/11/12 20:20:01',
					createTime: '2020/11/12 19:20:02',
					lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
					// dataset: {
					// 	columns: [
					// 		{ topicId: '1', factorId: '102' },
					// 		{ topicId: '1', factorId: '103' },
					// 		{ topicId: '1', factorId: '106' },
					// 		{ topicId: '2', factorId: '204' },
					// 		{ topicId: '2', factorId: '205' },
					// 		{ topicId: '2', factorId: '207' },
					// 		{ topicId: '3', factorId: '304' },
					// 		{ topicId: '3', factorId: '305' },
					// 		{ topicId: '3', factorId: '306' },
					// 		{ topicId: '3', factorId: '307' }
					// 	]
					// }
				},
				{
					subjectId: '2',
					name: 'District Summary',
					lastVisitTime: '2020/11/02 20:25:01',
					createTime: '2020/11/01 19:25:02',
					lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
				}
			],
			groups: [
				{
					groupId: '1',
					name: 'All About Money',
					createTime: '2020/11/01 19:25:02',
					lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
					subjects: [
						{
							subjectId: '101',
							name: 'Premium Summary',
							lastVisitTime: '2020/11/12 20:25:01',
							createTime: '2020/11/12 19:25:02',
							lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
						}
					]
				},
				{
					groupId: '2',
					name: 'All About Time',
					createTime: '2020/11/01 19:25:02',
					lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
					subjects: [
						{
							subjectId: '201',
							name: 'Premium Summary',
							lastVisitTime: '2020/11/12 20:25:01',
							createTime: '2020/11/12 19:25:02',
							lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
						}
					]
				},
				{
					groupId: '3',
					name: 'All About Gender',
					createTime: '2020/11/01 19:25:02',
					lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
					subjects: [
						{
							subjectId: '301',
							name: 'Premium Summary',
							lastVisitTime: '2020/8/31 20:25:01',
							createTime: '2020/8/21 19:25:02',
							lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
						}
					]
				},
				{
					groupId: '4',
					name: 'All About Age',
					createTime: '2020/11/01 19:25:02',
					lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
					subjects: [
						{
							subjectId: '401',
							name: 'Premium Summary',
							lastVisitTime: '2019/11/12 20:25:01',
							createTime: '2019/11/12 19:25:02',
							lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
						}
					]
				}
			]
		},
		{
			spaceId: '1',
			connectId: '3',
			name: 'Sales Statistics in Maine',
			lastVisitTime: '2020/11/05 14:13:11',
			createTime: '2020/10/31 14:23:07',
			lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			groups: [],
			subjects: []
		},
		{
			spaceId: '1',
			connectId: '4',
			name: 'Sales Statistics in New Hampshire',
			lastVisitTime: '2020/11/05 13:12:11',
			createTime: '2020/10/31 14:23:07',
			lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			groups: [],
			subjects: []
		},
		{
			spaceId: '1',
			connectId: '5',
			name: 'Sales Statistics in Vermont',
			lastVisitTime: '2020/11/05 12:11:11',
			createTime: '2020/10/31 14:23:07',
			lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			groups: [],
			subjects: []
		},
		{
			spaceId: '1',
			connectId: '6',
			name: 'Sales Statistics in Rhode Island',
			lastVisitTime: '2020/11/05 11:10:11',
			createTime: '2020/10/31 14:23:07',
			lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			groups: [],
			subjects: []
		},
		{
			spaceId: '1',
			connectId: '7',
			name: 'Sales Statistics in Connecticut',
			lastVisitTime: '2020/11/05 10:09:11',
			createTime: '2020/10/31 14:23:07',
			lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			groups: [],
			subjects: []
		},
		{
			spaceId: '1',
			connectId: '8',
			name: 'Sales Statistics in Massachusetts',
			lastVisitTime: '2020/11/05 09:08:11',
			createTime: '2020/10/31 14:23:07',
			lastModifyTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
			groups: [],
			subjects: []
		}
	];
};

export const fetchMockAvailableSpaces = async (): Promise<Array<AvailableSpaceInConsole>> => {
	return [
		{
			spaceId: '1',
			name: 'Sales Statistics',
			topicIds: DemoTopics.map(topic => topic.topicId)
		},
		{
			spaceId: '2',
			name: 'Claim Trend',
			topicIds: DemoTopics.map(topic => topic.topicId)
		}
	];
};

export const fetchMockAvailableTopics = async (): Promise<Array<Topic>> => {
	return DemoTopics;
};