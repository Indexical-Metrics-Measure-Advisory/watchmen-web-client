import { ConnectedSpace } from '../../console/connected-space-types';
import { getCurrentTime } from '../../utils';

export const fetchMockConnectedSpaces = async (): Promise<Array<ConnectedSpace>> => {
	return [
		{
			connectId: '1',
			spaceId: '1',
			name: 'Sales Statistics',
			groups: [],
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
					// },
					lastVisitTime: '2020/11/12 20:20:01',
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime()
				},
				{
					subjectId: '2',
					name: 'District Summary',
					lastVisitTime: '2020/11/02 20:25:01',
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime()
				}
			],
			groups: [
				{
					groupId: '1',
					name: 'All About Money',
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime(),
					subjects: [
						{
							subjectId: '101',
							name: 'Premium Summary',
							lastVisitTime: '2020/11/12 20:25:01',
							createTime: getCurrentTime(),
							lastModifyTime: getCurrentTime()
						}
					]
				},
				{
					groupId: '2',
					name: 'All About Time',
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime(),
					subjects: [
						{
							subjectId: '201',
							name: 'Premium Summary',
							lastVisitTime: '2020/11/12 20:25:01',
							createTime: getCurrentTime(),
							lastModifyTime: getCurrentTime()
						}
					]
				},
				{
					groupId: '3',
					name: 'All About Gender',
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime(),
					subjects: [
						{
							subjectId: '301',
							name: 'Premium Summary',
							lastVisitTime: '2020/8/31 20:25:01',
							createTime: getCurrentTime(),
							lastModifyTime: getCurrentTime()
						}
					]
				},
				{
					groupId: '4',
					name: 'All About Age',
					createTime: getCurrentTime(),
					lastModifyTime: getCurrentTime(),
					subjects: [
						{
							subjectId: '401',
							name: 'Premium Summary',
							lastVisitTime: '2019/11/12 20:25:01',
							createTime: getCurrentTime(),
							lastModifyTime: getCurrentTime()
						}
					]
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
			groups: [],
			subjects: [],
			lastVisitTime: '2020/11/05 14:13:11',
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			spaceId: '1',
			connectId: '4',
			name: 'Sales Statistics in New Hampshire',
			groups: [],
			subjects: [],
			lastVisitTime: '2020/11/05 13:12:11',
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			spaceId: '1',
			connectId: '5',
			name: 'Sales Statistics in Vermont',
			groups: [],
			subjects: [],
			lastVisitTime: '2020/11/05 12:11:11',
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			spaceId: '1',
			connectId: '6',
			name: 'Sales Statistics in Rhode Island',
			groups: [],
			subjects: [],
			lastVisitTime: '2020/11/05 11:10:11',
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			spaceId: '1',
			connectId: '7',
			name: 'Sales Statistics in Connecticut',
			groups: [],
			subjects: [],
			lastVisitTime: '2020/11/05 10:09:11',
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		},
		{
			spaceId: '1',
			connectId: '8',
			name: 'Sales Statistics in Massachusetts',
			groups: [],
			subjects: [],
			lastVisitTime: '2020/11/05 09:08:11',
			createTime: getCurrentTime(),
			lastModifyTime: getCurrentTime()
		}
	];
};
