import {isSuperAdmin} from '../../account';
import {TuplePage} from '../../query/tuple-page';
import {QueryTenant} from '../../tuples/query-tenant-types';
import {QueryUserGroupForHolder} from '../../tuples/query-user-group-types';
import {QueryUser, QueryUserForHolder} from '../../tuples/query-user-types';
import {User, UserId, UserRole} from '../../tuples/user-types';
import {getCurrentTime} from '../../utils';

export const listMockUsers = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryUser>> => {
	const {pageNumber = 1, pageSize = 9} = options;

	return new Promise<TuplePage<QueryUser>>((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{
						userId: '1',
						name: 'Damon Lindelof',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					},
					{
						userId: '2',
						name: 'Sally Jupiter',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					},
					{
						userId: '3',
						name: 'Roy Raymond',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					},
					{
						userId: '4',
						name: 'Walter Kovacs',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
					},
					{
						userId: '5',
						name: 'Jeffrey Dean Morgan',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
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

export const fetchMockUser = async (userId: UserId): Promise<{ user: User; groups: Array<QueryUserGroupForHolder>; tenants: Array<QueryTenant> }> => {
	let user;
	switch (userId) {
		case '1':
			user = {
				userId, name: 'Damon Lindelof', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		case '2':
			user = {
				userId, name: 'Sally Jupiter', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		case '3':
			user = {
				userId, name: 'Roy Raymond', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		case '4':
			user = {
				userId, name: 'Walter Kovacs', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		case '5':
			user = {
				userId, name: 'Jeffrey Dean Morgan', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
			break;
		default:
			user = {
				userId, name: 'Mock User', nickName: '', password: '',
				role: UserRole.CONSOLE,
				userGroupIds: ['1'],
				createTime: getCurrentTime(),
				lastModified: getCurrentTime()
			};
	}
	return {
		user,
		groups: [{userGroupId: '1', name: 'Oklahoma'}],
		tenants: isSuperAdmin() ? [{
			tenantId: '1',
			name: 'X World',
			createTime: getCurrentTime(),
			lastModified: getCurrentTime()
		}] : []
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