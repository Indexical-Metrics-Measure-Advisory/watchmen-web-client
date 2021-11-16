import {TuplePage} from '../../query/tuple-page';
import {QuerySpaceForHolder} from '../../tuples/query-space-types';
import {QueryUserGroup, QueryUserGroupForHolder} from '../../tuples/query-user-group-types';
import {QueryUserForHolder} from '../../tuples/query-user-types';
import {UserGroup, UserGroupId} from '../../tuples/user-group-types';
import {getCurrentTime} from '../../utils';

export const listMockUserGroups = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryUserGroup>> => {
	const {pageNumber = 1, pageSize = 9} = options;

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{
						userGroupId: '1',
						name: 'Oklahoma',
						description: 'South-center market analysis squad.',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					}
				],
				itemCount: 0,
				pageNumber,
				pageSize,
				pageCount: 1
			});
		}, 500);
	});
};

export const fetchMockUserGroup = async (userGroupId: UserGroupId): Promise<{ userGroup: UserGroup; users: Array<QueryUserForHolder>; spaces: Array<QuerySpaceForHolder> }> => {
	let userGroup: UserGroup;
	switch (userGroupId) {
		case '1':
			userGroup = {
				userGroupId,
				name: 'Oklahoma',
				description: 'South-center market analysis squad.',
				userIds: ['1', '2', '3', '4', '5'],
				spaceIds: ['1'],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		case '2':
			userGroup = {
				userGroupId, name: 'Delaware', userIds: [], spaceIds: [],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		case '3':
			userGroup = {
				userGroupId, name: 'Hawaii', userIds: [], spaceIds: [],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		case '4':
			userGroup = {
				userGroupId, name: 'Alaska', userIds: [], spaceIds: [],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		case '5':
			userGroup = {
				userGroupId, name: 'Missouri', userIds: [], spaceIds: [],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		case '6':
			userGroup = {
				userGroupId, name: 'Arkansas', userIds: [], spaceIds: [],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		default:
			userGroup = {
				userGroupId, name: 'Mock User Group', userIds: [], spaceIds: [],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
	}
	return {
		userGroup,
		users: [
			{userId: '1', name: 'Damon Lindelof'},
			{userId: '2', name: 'Sally Jupiter'},
			{userId: '3', name: 'Roy Raymond'},
			{userId: '4', name: 'Walter Kovacs'},
			{userId: '5', name: 'Jeffrey Dean Morgan'}
		],
		spaces: [{spaceId: '1', name: 'Quotation & Order'}]
	};
};

let newUserGroupId = 10000;
export const saveMockUserGroup = async (userGroup: UserGroup): Promise<void> => {
	return new Promise((resolve) => {
		userGroup.userGroupId = `${newUserGroupId++}`;
		setTimeout(() => resolve(), 500);
	});
};

export const listMockUserGroupsForSpace = async (search: string): Promise<Array<QueryUserGroupForHolder>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(
				[
					{userGroupId: '1', name: 'Oklahoma', description: 'South-center market analysis squad.'},
					{userGroupId: '2', name: 'Delaware'},
					{userGroupId: '3', name: 'Hawaii'},
					{userGroupId: '4', name: 'Alaska'},
					{userGroupId: '5', name: 'Missouri'},
					{userGroupId: '6', name: 'Arkansas'}
				].filter((x) => x.name.toUpperCase().includes(search.toUpperCase()))
			);
		}, 500);
	});
};