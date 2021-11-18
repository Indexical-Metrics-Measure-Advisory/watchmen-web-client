import {TuplePage} from '../../query/tuple-page';
import {QuerySpace, QuerySpaceForHolder} from '../../tuples/query-space-types';
import {QueryTopicForHolder} from '../../tuples/query-topic-types';
import {QueryUserGroupForHolder} from '../../tuples/query-user-group-types';
import {Space, SpaceId} from '../../tuples/space-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';
import {Order, Participant, Quotation} from './mock-data-topics';

export const listMockSpaces = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QuerySpace>> => {
	const {pageNumber = 1, pageSize = 9} = options;

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{
						spaceId: '1',
						name: 'Quotation & Order',
						description: 'All Sales Data',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					} as QuerySpace
				],
				itemCount: 0,
				pageNumber,
				pageSize,
				pageCount: 1
			});
		}, 1000);
	});
};

export const listMockSpacesForExport = async (): Promise<Array<Space>> => {
	return new Promise<Array<Space>>(resolve => {
		setTimeout(() => {
			resolve([
				{
					spaceId: '1',
					name: 'Quotation & Order',
					topicIds: [Quotation.topicId, Order.topicId],
					userGroupIds: [],
					createTime: getCurrentTime(),
					lastModified: getCurrentTime()
				}
			]);
		}, 500);
	});
};

export const fetchMockSpace = async (spaceId: SpaceId): Promise<{ space: Space; groups: Array<QueryUserGroupForHolder>; topics: Array<QueryTopicForHolder> }> => {
	return {
		space: {
			spaceId,
			name: 'Quotation & Order',
			description: 'All Sales Data',
			topicIds: [Quotation.topicId, Order.topicId],
			userGroupIds: [],
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		},
		groups: [{userGroupId: '1', name: 'Oklahoma'}],
		topics: [
			{topicId: Quotation.topicId, name: Quotation.name},
			{topicId: Order.topicId, name: Order.name},
			{topicId: Participant.topicId, name: Participant.name}
		]
	};
};

let newSpaceId = 10000;
export const saveMockSpace = async (space: Space): Promise<void> => {
	return new Promise((resolve) => {
		if (isFakedUuid(space)) {
			space.spaceId = `${newSpaceId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const listMockSpacesForHolder = async (search: string): Promise<Array<QuerySpaceForHolder>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(
				[{spaceId: '1', name: 'Quotation & Order', description: 'All Sales Data'}].filter((x) =>
					x.name.toUpperCase().includes(search.toUpperCase())
				)
			);
		}, 500);
	});
};