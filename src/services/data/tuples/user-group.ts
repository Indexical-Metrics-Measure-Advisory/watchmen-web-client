import {findAccount} from '../account';
import {Apis, get, page, post} from '../apis';
import {
	fetchMockUserGroup,
	listMockUserGroups,
	listMockUserGroupsForSpace,
	saveMockUserGroup
} from '../mock/tuples/mock-user-group';
import {TuplePage} from '../query/tuple-page';
import {isMockService} from '../utils';
import {QuerySpaceForHolder} from './query-space-types';
import {QueryUserGroup, QueryUserGroupForHolder} from './query-user-group-types';
import {QueryUserForHolder} from './query-user-types';
import {UserGroup, UserGroupId} from './user-group-types';
import {isFakedUuid} from './utils';

export const listUserGroups = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryUserGroup>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockUserGroups(options);
	} else {
		return await page({
			api: Apis.USER_GROUP_LIST_BY_NAME,
			search: {search},
			pageable: {pageNumber, pageSize}
		});
	}
};

export const fetchUserGroup = async (
	userGroupId: UserGroupId
): Promise<{ userGroup: UserGroup; users: Array<QueryUserForHolder>; spaces: Array<QuerySpaceForHolder> }> => {
	if (isMockService()) {
		return fetchMockUserGroup(userGroupId);
	} else {
		const userGroup: UserGroup = await get({api: Apis.USER_GROUP_GET, search: {userGroupId}});

		const fetchUsers = async (): Promise<Array<QueryUserForHolder>> => {
			const {userIds} = userGroup;
			if (userIds && userIds.length > 0) {
				return await post({api: Apis.USER_BY_IDS, data: userGroup.userIds});
			} else {
				return [];
			}
		};
		const fetchSpaces = async (): Promise<Array<QuerySpaceForHolder>> => {
			const {spaceIds} = userGroup;
			if (spaceIds && spaceIds.length > 0) {
				return await post({api: Apis.SPACE_BY_IDS, data: userGroup.spaceIds});
			} else {
				return [];
			}
		};
		const [users, spaces] = await Promise.all([fetchUsers(), fetchSpaces()]);

		return {userGroup, users, spaces};
	}
};

export const saveUserGroup = async (userGroup: UserGroup): Promise<void> => {
	userGroup.tenantId = findAccount()?.tenantId;
	if (isMockService()) {
		return saveMockUserGroup(userGroup);
	} else if (isFakedUuid(userGroup)) {
		const data = await post({api: Apis.USER_GROUP_CREATE, data: userGroup});
		userGroup.userGroupId = data.userGroupId;
		userGroup.tenantId = data.tenantId;
		userGroup.lastModified = data.lastModified;
	} else {
		const data = await post({
			api: Apis.USER_GROUP_SAVE,
			search: {userGroupId: userGroup.userGroupId},
			data: userGroup
		});
		userGroup.tenantId = data.tenantId;
		userGroup.lastModified = data.lastModified;
	}
};

export const listUserGroupsForHolder = async (search: string): Promise<Array<QueryUserGroupForHolder>> => {
	if (isMockService()) {
		return listMockUserGroupsForSpace(search);
	} else {
		return await get({api: Apis.USER_GROUP_LIST_FOR_HOLDER_BY_NAME, search: {search}});
	}
};
