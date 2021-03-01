import { fetchMockSpace, listMockSpaces, listMockSpacesForHolder, saveMockSpace } from '../mock/tuples/mock-space';
import { DataPage } from '../query/data-page';
import { doFetch, getServiceHost, isMockService } from '../utils';
import { QuerySpace, QuerySpaceForHolder } from './query-space-types';
import { QueryTopicForHolder } from './query-topic-types';
import { QueryUserGroupForHolder } from './query-user-group-types';
import { Space } from './space-types';
import { isFakedUuid } from './utils';

type SpaceOnServer = Omit<Space, 'userGroupIds'> & { groupIds: Array<string> };
const transformFromServer = (space: SpaceOnServer): Space => {
	const { groupIds, ...rest } = space;
	return { userGroupIds: groupIds, ...rest };
};
const transformToServer = (space: Space): SpaceOnServer => {
	const { userGroupIds, ...rest } = space;
	return { groupIds: userGroupIds, ...rest };
};

export const listSpaces = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QuerySpace>> => {
	const { search = '', pageNumber = 1, pageSize = 9 } = options;

	if (isMockService()) {
		return listMockSpaces(options);
	} else {
		const response = await doFetch(`${getServiceHost()}space/name?query_name=${search}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ pageNumber, pageSize })
		});

		return await response.json();
	}
};

export const fetchSpace = async (spaceId: string): Promise<{ space: Space; groups: Array<QueryUserGroupForHolder>; topics: Array<QueryTopicForHolder> }> => {
	if (isMockService()) {
		return fetchMockSpace(spaceId);
	} else {
		const response = await doFetch(`${getServiceHost()}space?space_id=${spaceId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const space: SpaceOnServer = await response.json();

		const fetchTopics = async (): Promise<Array<QueryTopicForHolder>> => {
			const { topicIds } = space;
			if (topicIds && topicIds.length > 0) {
				const response = await doFetch(`${getServiceHost()}topic/ids`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(space.topicIds)
				});
				return await response.json();
			} else {
				return [];
			}
		};
		const fetchUserGroups = async (): Promise<Array<QueryUserGroupForHolder>> => {
			const { groupIds } = space;
			if (groupIds && groupIds.length > 0) {
				const response = await doFetch(`${getServiceHost()}user_groups/ids`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
						// authorization: token,
					},
					body: JSON.stringify(space.groupIds)
				});
				return await response.json();
			} else {
				return [];
			}
		};

		const [ topics, groups ] = await Promise.all([ fetchTopics(), fetchUserGroups() ]);

		return { space: transformFromServer(space), groups, topics };
	}
};

export const saveSpace = async (space: Space): Promise<void> => {
	if (isMockService()) {
		return saveMockSpace(space);
	} else if (isFakedUuid(space)) {
		const response = await doFetch(`${getServiceHost()}space`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(transformToServer(space))
		});

		const data = await response.json();
		space.spaceId = data.spaceId;
		space.lastModifyTime = data.lastModifyTime;
	} else {
		const response = await doFetch(`${getServiceHost()}update/space?space_id=${space.spaceId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(transformToServer(space))
		});
		const data = await response.json();
		space.lastModifyTime = data.lastModifyTime;
	}
};

export const listSpacesForHolder = async (search: string): Promise<Array<QuerySpaceForHolder>> => {
	if (isMockService()) {
		return listMockSpacesForHolder(search);
	} else {
		const response = await doFetch(`${getServiceHost()}query/space/group?query_name=${search}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return await response.json();
	}
};


