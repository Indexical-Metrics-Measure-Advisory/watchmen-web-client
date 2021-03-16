import { fetchMockEnum, listMockEnums, listMockEnumsForHolder, saveMockEnum } from '../mock/tuples/mock-enum';
import { DataPage } from '../query/data-page';
import { isMockService } from '../utils';
import { Enum } from './enum-types';
import { QueryEnum, QueryEnumForHolder } from './query-enum-types';
import { isFakedUuid } from './utils';

export const listEnums = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryEnum>> => {
	// const { search = '', pageNumber = 1, pageSize = 9 } = options;

	if (isMockService()) {
		return listMockEnums(options);
	} else {
		// REMOTE use real api
		return listMockEnums(options);
	}
};

export const fetchEnum = async (enumId: string): Promise<{ enumeration: Enum; parents: Array<QueryEnumForHolder> }> => {
	if (isMockService()) {
		const { enumeration } = await fetchMockEnum(enumId);
		const parents = await listEnumsForHolder();
		return { enumeration, parents };
	} else {
		// REMOTE use real api
		const { enumeration } = await fetchMockEnum(enumId);
		const parents = await listEnumsForHolder();
		return { enumeration, parents };
	}
};

export const saveEnum = async (enumeration: Enum): Promise<void> => {
	if (isMockService()) {
		return saveMockEnum(enumeration);
	} else if (isFakedUuid(enumeration)) {
		// REMOTE use real api
		return saveMockEnum(enumeration);
	} else {
		// REMOTE use real api
		return saveMockEnum(enumeration);
	}
};

export const listEnumsForHolder = async (): Promise<Array<QueryEnumForHolder>> => {
	if (isMockService()) {
		return listMockEnumsForHolder();
	} else {
		// REMOTE use real api
		return listMockEnumsForHolder();
	}
};
