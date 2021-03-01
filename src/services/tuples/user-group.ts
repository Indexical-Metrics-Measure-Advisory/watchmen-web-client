import {
	fetchMockUserGroup,
	listMockUserGroups,
	listMockUserGroupsForSpace,
	saveMockUserGroup
} from '../mock/tuples/mock-user-group';
import { DataPage } from '../query/data-page';
import { doFetch, getServiceHost, isMockService } from '../utils';
import { QuerySpaceForHolder } from './query-space-types';
import { QueryUserGroup, QueryUserGroupForHolder } from './query-user-group-types';
import { QueryUserForHolder } from './query-user-types';
import { UserGroup } from './user-group-types';
import { isFakedUuid } from './utils';

export const listUserGroups = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryUserGroup>> => {
	const { search = '', pageNumber = 1, pageSize = 9 } = options;

	if (isMockService()) {
		return listMockUserGroups(options);
	} else {
		const response = await doFetch(`${getServiceHost()}user_group/name?query_name=${search}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ pageNumber, pageSize })
		});

		return await response.json();
	}
};

export const fetchUserGroup = async (userGroupId: string): Promise<{ userGroup: UserGroup; users: Array<QueryUserForHolder>; spaces: Array<QuerySpaceForHolder> }> => {
	if (isMockService()) {
		return fetchMockUserGroup(userGroupId);
	} else {
		const response = await doFetch(`${getServiceHost()}user_group?user_group_id=${userGroupId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const userGroup: UserGroup = await response.json();

		const fetchUsers = async (): Promise<Array<QueryUserForHolder>> => {
			const { userIds } = userGroup;
			if (userIds && userIds.length > 0) {
				const response = await doFetch(`${getServiceHost()}user/ids`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(userGroup.userIds)
				});
				return await response.json();
			} else {
				return [];
			}
		};
		const fetchSpaces = async (): Promise<Array<QuerySpaceForHolder>> => {
			const { spaceIds } = userGroup;
			if (spaceIds && spaceIds.length > 0) {
				const response = await doFetch(`${getServiceHost()}space/ids`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(userGroup.spaceIds)
				});
				return await response.json();
			} else {
				return [];
			}
		};
		const [ users, spaces ] = await Promise.all([ fetchUsers(), fetchSpaces() ]);

		return { userGroup, users, spaces };
	}
};

export const saveUserGroup = async (userGroup: UserGroup): Promise<void> => {
	if (isMockService()) {
		return saveMockUserGroup(userGroup);
	} else if (isFakedUuid(userGroup)) {
		const response = await doFetch(`${getServiceHost()}user_group`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userGroup)
		});

		const data = await response.json();
		userGroup.userGroupId = data.userGroupId;
		userGroup.lastModifyTime = data.lastModifyTime;
	} else {
		const response = await doFetch(`${getServiceHost()}update/user_group?user_group_id=${userGroup.userGroupId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userGroup)
		});
		const data = await response.json();
		userGroup.lastModifyTime = data.lastModifyTime;
	}
};

export const listUserGroupsForHolder = async (search: string): Promise<Array<QueryUserGroupForHolder>> => {
	if (isMockService()) {
		return listMockUserGroupsForSpace(search);
	} else {
		const response = await doFetch(`${getServiceHost()}query/user_group/space?query_name=${search}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return await response.json();
	}
};
