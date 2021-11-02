import {findAccount} from '../account';
import {Apis, get, page, post} from '../apis';
import {fetchMockEnum, listMockEnums, listMockEnumsForHolder, saveMockEnum} from '../mock/tuples/mock-enum';
import {TuplePage} from '../query/tuple-page';
import {isMockService} from '../utils';
import {Enum, EnumId} from './enum-types';
import {QueryEnum, QueryEnumForHolder} from './query-enum-types';
import {isFakedUuid} from './utils';

export const listEnums = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryEnum>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockEnums(options);
	} else {
		return await page({api: Apis.ENUM_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const listAllEnums = async (): Promise<Array<QueryEnum>> => {
	if (isMockService()) {
		const {data} = await listMockEnums({search: '', pageNumber: 1, pageSize: 9999});
		return data;
	} else {
		const {data} = await page({
			api: Apis.ENUM_LIST_BY_NAME,
			search: {search: ''},
			pageable: {pageNumber: 1, pageSize: 9999}
		});
		return data;
	}
};

export const fetchEnum = async (enumId: EnumId): Promise<Enum> => {
	if (isMockService()) {
		const {enumeration} = await fetchMockEnum(enumId);
		return enumeration;
	} else {
		return await get({api: Apis.ENUM_GET, search: {enumId}});
	}
};

export const fetchEnumAndParents = async (enumId: EnumId): Promise<{ enumeration: Enum; parents: Array<QueryEnumForHolder> }> => {
	if (isMockService()) {
		const {enumeration} = await fetchMockEnum(enumId);
		const parents = await listEnumsForHolder();
		return {enumeration, parents};
	} else {
		const [enumeration, parents] = await Promise.all([
			get({api: Apis.ENUM_GET, search: {enumId}}),
			listEnumsForHolder()
		]);
		return {enumeration, parents};
	}
};

export const saveEnum = async (enumeration: Enum): Promise<void> => {
	const {parentEnumId, ...rest} = enumeration;
	const toSave: Enum = rest;
	if (parentEnumId) {
		toSave.parentEnumId = parentEnumId;
	}
	enumeration.tenantId = findAccount()?.tenantId;

	if (isMockService()) {
		await saveMockEnum(toSave);
	} else if (isFakedUuid(enumeration)) {
		const data = await post({api: Apis.ENUM_CREATE, data: toSave});
		enumeration.enumId = data.enumId;
		enumeration.tenantId = data.tenantId;
		enumeration.lastModified = data.lastModified;
	} else {
		const data = await post({api: Apis.ENUM_SAVE, data: toSave});
		enumeration.tenantId = data.tenantId;
		enumeration.lastModified = data.lastModified;
	}
};

export const listEnumsForHolder = async (): Promise<Array<QueryEnumForHolder>> => {
	if (isMockService()) {
		return listMockEnumsForHolder();
	} else {
		// return listMockEnumsForHolder();
		return await get({api: Apis.ENUM_LOAD_ALL});
	}
};
