import { findToken } from "../account";
import { fetchMockEnum, listMockEnums, listMockEnumsForHolder, saveMockEnum } from "../mock/tuples/mock-enum";
import { DataPage } from "../query/data-page";
import { doFetch, getServiceHost, isMockService } from "../utils";
import { Enum } from "./enum-types";
import { QueryEnum, QueryEnumForHolder } from "./query-enum-types";
import { isFakedUuid } from "./utils";

export const listEnums = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryEnum>> => {
	const { search = "", pageNumber = 1, pageSize = 9 } = options;

	if (isMockService()) {
		return listMockEnums(options);
	} else {
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}enum/name?query_name=${search}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify({ pageNumber, pageSize }),
		});

		return await response.json();
		// REMOTE use real api
	}
};

export const fetchEnum = async (enumId: string): Promise<{ enumeration: Enum; parents: Array<QueryEnumForHolder> }> => {
	if (isMockService()) {
		const { enumeration } = await fetchMockEnum(enumId);
		const parents = await listEnumsForHolder();
		return { enumeration, parents };
	} else {
		// REMOTE use real api
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}enum/id?enum_id=${enumId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			// body: JSON.stringify(graphics),
		});

		return await response.json();
	}
};

export const saveEnum = async (enumeration: Enum): Promise<void> => {
	const { parentEnumId, ...rest } = enumeration;
	const toSave: Enum = rest;
	if (parentEnumId) {
		toSave.parentEnumId = parentEnumId;
	}
	if (isMockService()) {
		return saveMockEnum(toSave);
	} else if (isFakedUuid(enumeration)) {
		// REMOTE use real api
		return saveMockEnum(toSave);
	} else {
		// REMOTE use real api
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}enum`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(enumeration),
		});

		return await response.json();
	}
};

export const listEnumsForHolder = async (): Promise<Array<QueryEnumForHolder>> => {
	if (isMockService()) {
		return listMockEnumsForHolder();
	} else {
		return listMockEnumsForHolder();
		// REMOTE use real api
		// const token = findToken();
		// const response = await doFetch(`${getServiceHost()}enum/parent?enum_parent_id=${enumId}`, {
		// 	method: "GET",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: "Bearer " + token,
		// 	},
		// });
		// return await response.json();
	}
};
