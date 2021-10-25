import {Apis, page, post} from '../apis';
import {listMockTenants, saveMockTenant} from '../mock/tuples/mock-tenant';
import {TuplePage} from '../query/tuple-page';
import {isMockService} from '../utils';
import {QueryTenant} from './query-tenant-types';
import {Tenant} from './tenant-types';
import {isFakedUuid} from './utils';

export const listTenants = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryTenant>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockTenants(options);
	} else {
		return await page({api: Apis.TENANT_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const saveTenant = async (tenant: Tenant): Promise<void> => {
	if (isMockService()) {
		return saveMockTenant(tenant);
	} else if (isFakedUuid(tenant)) {
		const data = await post({api: Apis.TENANT_CREATE, data: tenant});
		tenant.tenantId = data.tenantId;
		tenant.lastModified = data.lastModified;
	} else {
		const data = await post({api: Apis.TENANT_SAVE, data: tenant});
		tenant.lastModified = data.lastModified;
	}
};
