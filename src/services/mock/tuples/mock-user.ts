import {DataPage} from '../../query/data-page';
import {QueryUserGroupForHolder} from '../../tuples/query-user-group-types';
import {QueryUser, QueryUserForHolder} from '../../tuples/query-user-types';
import {User, UserRole} from '../../tuples/user-types';
import {getCurrentTime} from '../../utils';
import {isSuperAdmin} from '../../account';
import {QueryTenant} from '../../tuples/query-tenant-types';

export const listMockUsers = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryUser>> => {
	const {pageNumber = 1, pageSize = 9} = options;

	return new Promise<DataPage<QueryUser>>((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{
						userId: '1',
						name: 'Damon Lindelof',
						spaceCount: 2,
						topicCount: 3,
						reportCount: 7
					},
					{
						userId: '2',
						name: 'Sally Jupiter',
						spaceCount: 2,
						topicCount: 3,
						reportCount: 2
					},
					{
						userId: '3',
						name: 'Roy Raymond',
						spaceCount: 2,
						topicCount: 3,
						reportCount: 4
					},
					{
						userId: '4',
						name: 'Walter Kovacs',
						spaceCount: 2,
						topicCount: 3,
						reportCount: 8
					},
					{
						userId: '5',
						name: 'Jeffrey Dean Morgan',
						spaceCount: 2,
						topicCount: 3,
						reportCount: 0
					}
				],
				itemCount: 0,
				pageNumber,
				pageSize,
				pageCount: 1
			});
		}, 1000);
	});
};

export const fetchMockUser = async (userId: string): Promise<{ user: User; groups: Array<QueryUserGroupForHolder>; tenants: Array<QueryTenant> }> => {
	let user;
	switch (userId) {
		case '1':
			user = {
				userId, name: 'Damon Lindelof', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			};
			break;
		case '2':
			user = {
				userId, name: 'Sally Jupiter', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			};
			break;
		case '3':
			user = {
				userId, name: 'Roy Raymond', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			};
			break;
		case '4':
			user = {
				userId, name: 'Walter Kovacs', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			};
			break;
		case '5':
			user = {
				userId, name: 'Jeffrey Dean Morgan', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			};
			break;
		default:
			user = {
				userId, name: 'Mock User', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModifyTime: getCurrentTime()
			};
	}
	return {
		user,
		groups: [{userGroupId: '1', name: 'Oklahoma'}],
		tenants: isSuperAdmin() ? [{tenantId: '1', name: 'X World'}] : []
	};
};

let newUserId = 10000;
export const saveMockUser = async (user: User): Promise<void> => {
	return new Promise<void>((resolve) => {
		user.userId = `${newUserId++}`;
		setTimeout(() => resolve(), 500);
	});
};

export const listMockUsersForHolder = async (search: string): Promise<Array<QueryUserForHolder>> => {
	return new Promise<Array<QueryUserForHolder>>((resolve) => {
		setTimeout(() => {
			resolve(
				[
					{userId: '1', name: 'Damon Lindelof'},
					{userId: '2', name: 'Sally Jupiter'},
					{userId: '3', name: 'Roy Raymond'},
					{userId: '4', name: 'Walter Kovacs'},
					{userId: '5', name: 'Jeffrey Dean Morgan'}
				].filter((x) => x.name.toUpperCase().includes(search.toUpperCase()))
			);
		}, 500);
	});
};