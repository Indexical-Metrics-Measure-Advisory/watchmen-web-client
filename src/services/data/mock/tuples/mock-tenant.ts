import {TuplePage} from '../../query/tuple-page';
import {QueryTenant} from '../../tuples/query-tenant-types';
import {Tenant} from '../../tuples/tenant-types';
import {getCurrentTime} from '../../utils';

export const listMockTenants = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryTenant>> => {
	const {pageNumber = 1, pageSize = 9} = options;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{
						tenantId: '1',
						name: 'X World',
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

let newTenantId = 10000;
export const saveMockTenant = async (tenant: Tenant): Promise<void> => {
	return new Promise((resolve) => {
		tenant.tenantId = `${newTenantId++}`;
		setTimeout(() => resolve(), 500);
	});
};
