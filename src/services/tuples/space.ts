import {Apis, get, page, post} from '../apis';
import {fetchMockSpace, listMockSpaces, listMockSpacesForHolder, saveMockSpace} from '../mock/tuples/mock-space';
import {DataPage} from '../query/data-page';
import {isMockService} from '../utils';
import {QuerySpace, QuerySpaceForHolder} from './query-space-types';
import {QueryTopicForHolder} from './query-topic-types';
import {QueryUserGroupForHolder} from './query-user-group-types';
import {Space} from './space-types';
import {isFakedUuid} from './utils';
import {findAccount} from '../account';

type SpaceOnServer = Omit<Space, 'userGroupIds'> & { groupIds: Array<string> };
const transformFromServer = (space: SpaceOnServer): Space => {
	const {groupIds, ...rest} = space;
	return {userGroupIds: groupIds, ...rest};
};
const transformToServer = (space: Space): SpaceOnServer => {
	const {userGroupIds, ...rest} = space;
	return {groupIds: userGroupIds, ...rest};
};

export const listSpaces = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QuerySpace>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockSpaces(options);
	} else {
		return await page({api: Apis.SPACE_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const fetchSpace = async (
	spaceId: string
): Promise<{ space: Space; groups: Array<QueryUserGroupForHolder>; topics: Array<QueryTopicForHolder> }> => {
	if (isMockService()) {
		return fetchMockSpace(spaceId);
	} else {
		const space: SpaceOnServer = await get({api: Apis.SPACE_GET, search: {spaceId}});
		const fetchTopics = async (): Promise<Array<QueryTopicForHolder>> => {
			const {topicIds} = space;
			if (topicIds && topicIds.length > 0) {
				return await post({api: Apis.TOPICS_BY_IDS, data: space.topicIds});
			} else {
				return [];
			}
		};
		const fetchUserGroups = async (): Promise<Array<QueryUserGroupForHolder>> => {
			const {groupIds} = space;
			if (groupIds && groupIds.length > 0) {
				return await post({api: Apis.USER_GROUP_BY_IDS, data: space.groupIds});
			} else {
				return [];
			}
		};

		const [topics, groups] = await Promise.all([fetchTopics(), fetchUserGroups()]);

		return {space: transformFromServer(space), groups, topics};
	}
};

export const saveSpace = async (space: Space): Promise<void> => {
	space.tenantId = findAccount()?.tenantId;
	if (isMockService()) {
		return saveMockSpace(space);
	} else if (isFakedUuid(space)) {
		const data = await post({api: Apis.SPACE_CREATE, data: transformToServer(space)});
		space.spaceId = data.spaceId;
		space.tenantId = data.tenantId;
		space.lastModified = data.lastModified;
	} else {
		const data = await post({
			api: Apis.SPACE_SAVE,
			search: {spaceId: space.spaceId},
			data: transformToServer(space)
		});
		space.tenantId = data.tenantId;
		space.lastModified = data.lastModified;
	}
};

export const listSpacesForHolder = async (search: string): Promise<Array<QuerySpaceForHolder>> => {
	if (isMockService()) {
		return listMockSpacesForHolder(search);
	} else {
		return await get({api: Apis.SPACE_LIST_FOR_HOLDER_BY_NAME, search: {search}});
	}
};
