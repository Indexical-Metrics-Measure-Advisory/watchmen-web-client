import {Apis, get, page, post} from '../apis';
import {fetchMockUser, listMockUsers, listMockUsersForHolder, saveMockUser} from '../mock/tuples/mock-user';
import {DataPage} from '../query/data-page';
import {isMockService} from '../utils';
import {QueryUserGroupForHolder} from './query-user-group-types';
import {QueryUser, QueryUserForHolder} from './query-user-types';
import {User} from './user-types';
import {isFakedUuid} from './utils';

type UserOnServer = Omit<User, 'userGroupIds'> & { groupIds: Array<string> };
const transformFromServer = (user: UserOnServer): User => {
	const {groupIds, ...rest} = user;
	return {userGroupIds: groupIds, ...rest};
};
const transformToServer = (user: User): UserOnServer => {
	const {userGroupIds, ...rest} = user;
	return {groupIds: userGroupIds, ...rest};
};

export const listUsers = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryUser>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockUsers(options);
	} else {
		return await page({api: Apis.USER_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const fetchUser = async (userId: string): Promise<{ user: User; groups: Array<QueryUserGroupForHolder> }> => {
	if (isMockService()) {
		return fetchMockUser(userId);
	} else {
		const user: UserOnServer = await get({api: Apis.USER_GET, search: {userId}});

		const {groupIds} = user;
		if (groupIds && groupIds.length > 0) {
			const groups = await post({api: Apis.USER_GROUP_BY_IDS, data: groupIds});
			return {user: transformFromServer(user), groups};
		} else {
			return {user: transformFromServer(user), groups: []};
		}
	}
};

export const saveUser = async (user: User): Promise<void> => {
	if (isMockService()) {
		return saveMockUser(user);
	} else if (isFakedUuid(user)) {
		const data = await post({api: Apis.USER_CREATE, data: transformToServer(user)});
		user.userId = data.userId;
		user.lastModifyTime = data.lastModifyTime;
	} else {
		const data = await post({api: Apis.USER_SAVE, data: transformToServer(user)});
		user.lastModifyTime = data.lastModifyTime;
	}
};

export const listUsersForHolder = async (search: string): Promise<Array<QueryUserForHolder>> => {
	if (isMockService()) {
		return listMockUsersForHolder(search);
	} else {
		return await get({api: Apis.USER_LIST_FOR_HOLDER_BY_NAME, search: {search}});
	}
};
