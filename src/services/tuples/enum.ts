import {Apis, get, page, post} from "../apis";
import {fetchMockEnum, listMockEnums, listMockEnumsForHolder, saveMockEnum} from "../mock/tuples/mock-enum";
import {DataPage} from "../query/data-page";
import {isMockService} from "../utils";
import {Enum} from "./enum-types";
import {QueryEnum, QueryEnumForHolder} from "./query-enum-types";
import {isFakedUuid} from "./utils";

export const listEnums = async (options: {
    search: string;
    pageNumber?: number;
    pageSize?: number;
}): Promise<DataPage<QueryEnum>> => {
    const {search = "", pageNumber = 1, pageSize = 9} = options;

    if (isMockService()) {
        return listMockEnums(options);
    } else {
        return await page({api: Apis.ENUM_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
    }
};

export const fetchEnum = async (enumId: string): Promise<{ enumeration: Enum; parents: Array<QueryEnumForHolder> }> => {
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
    if (isMockService()) {
        return saveMockEnum(toSave);
    } else if (isFakedUuid(enumeration)) {
        return await post({api: Apis.ENUM_CREATE, data: toSave});
    } else {
        return await post({api: Apis.ENUM_SAVE, data: toSave});
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
