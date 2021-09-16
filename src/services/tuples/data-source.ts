import {DataPage} from '../query/data-page';
import {isMockService} from '../utils';
import {Apis, get, page, post} from '../apis';
import {QueryDataSource, QueryDataSourceForHolder} from './query-data-source-types';
import {DataSource} from './data-source-types';
import {isFakedUuid} from './utils';
import {
	fetchMockDataSource,
	listMockDataSources,
	listMockDataSourcesForHolder,
	saveMockDataSource
} from '../mock/tuples/mock-data-source';
import {isMultipleDataSourcesEnabled} from '@/feature-switch';

export const listDataSources = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryDataSource>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockDataSources(options);
	} else {
		return await page({api: Apis.DATASOURCE_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const fetchDataSource = async (dataSourceId: string): Promise<{ dataSource: DataSource }> => {
	if (isMockService()) {
		const {dataSource} = await fetchMockDataSource(dataSourceId);
		return {dataSource};
	} else {
		const dataSource = await get({api: Apis.DATASOURCE_GET, search: {dataSourceId}});
		return {dataSource};
	}
};

export const saveDataSource = async (dataSource: DataSource): Promise<void> => {
	if (isMockService()) {
		await saveMockDataSource(dataSource);
	} else if (isFakedUuid(dataSource)) {
		const data = await post({api: Apis.DATASOURCE_CREATE, data: dataSource});
		dataSource.dataSourceId = data.dataSourceId;
		dataSource.lastModified = data.lastModified;
	} else {
		const data = await post({api: Apis.DATASOURCE_SAVE, data: dataSource});
		dataSource.lastModified = data.lastModified;
	}
};

export const listDataSourcesForHolder = async (): Promise<Array<QueryDataSourceForHolder>> => {
	if (!isMultipleDataSourcesEnabled()) {
		return [];
	} else if (isMockService()) {
		return listMockDataSourcesForHolder();
	} else {
		// return listMockEnumsForHolder();
		return await get({api: Apis.DATASOURCE_LOAD_ALL});
	}
};
