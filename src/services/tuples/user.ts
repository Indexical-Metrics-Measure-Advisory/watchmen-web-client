import { fetchMockUser, listMockUsers, listMockUsersForHolder, saveMockUser } from '../mock/tuples/mock-user';
import { DataPage } from '../query/data-page';
import { getServiceHost, isMockService } from '../utils';
import { QueryUserGroupForHolder } from './query-user-group-types';
import { QueryUser, QueryUserForHolder } from './query-user-types';
import { User } from './user-types';
import { isFakedUuid } from './utils';

type UserOnServer = Omit<User, 'userGroupIds'> & { groupIds: Array<string> };
const transformFromServer = (user: UserOnServer): User => {
	const { groupIds, ...rest } = user;
	return { userGroupIds: groupIds, ...rest };
};
const transformToServer = (user: User): UserOnServer => {
	const { userGroupIds, ...rest } = user;
	return { groupIds: userGroupIds, ...rest };
};

export const listUsers = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryUser>> => {
	const { search = '', pageNumber = 1, pageSize = 9 } = options;

	if (isMockService()) {
		return listMockUsers(options);
	} else {
		const response = await fetch(`${getServiceHost()}user/name?query_name=${search}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ pageNumber, pageSize })
		});
		return await response.json();
	}
};

export const fetchUser = async (userId: string): Promise<{ user: User; groups: Array<QueryUserGroupForHolder> }> => {
	if (isMockService()) {
		return fetchMockUser(userId);
	} else {
		const response = await fetch(`${getServiceHost()}user?user_id=${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const user: UserOnServer = await response.json();

		const { groupIds } = user;
		if (groupIds && groupIds.length > 0) {
			const result = await fetch(`${getServiceHost()}user_groups/ids`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(groupIds)
			});
			const groups = await result.json();
			return { user: transformFromServer(user), groups };
		} else {
			return { user: transformFromServer(user), groups: [] };
		}
	}
};

export const saveUser = async (user: User): Promise<void> => {
	if (isMockService()) {
		return saveMockUser(user);
	} else if (isFakedUuid(user)) {
		const response = await fetch(`${getServiceHost()}user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(transformToServer(user))
		});
		const data = await response.json();
		user.userId = data.userId;
		user.lastModifyTime = data.lastModifyTime;
	} else {
		const response = await fetch(`${getServiceHost()}update/user?user_id=${user.userId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(transformToServer(user))
		});
		const data = await response.json();
		user.lastModifyTime = data.lastModifyTime;
	}
};

export const listUsersForHolder = async (search: string): Promise<Array<QueryUserForHolder>> => {
	if (isMockService()) {
		return listMockUsersForHolder(search);
	} else {
		const response = await fetch(`${getServiceHost()}query/user/group?query_name=${search}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return await response.json();
	}
};
