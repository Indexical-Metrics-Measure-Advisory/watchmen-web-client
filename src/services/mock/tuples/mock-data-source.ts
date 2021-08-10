import {DataPage} from '../../query/data-page';
import {getCurrentTime} from '../../utils';
import {QueryDataSource, QueryDataSourceForHolder} from '../../tuples/query-data-source-types';
import {DataSource, DataSourceType} from '../../tuples/data-source-types';
import {isFakedUuid} from '../../tuples/utils';

export const listMockDataSources = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryDataSource>> => {
	const {pageNumber = 1, pageSize = 9} = options;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [{
					dataSourceId: '1',
					dataSourceCode: 'DEFAULT_ONE',
					dataSourceType: DataSourceType.MYSQL,
					tenantName: 'X World',
					createTime: getCurrentTime(),
					lastModified: getCurrentTime()
				}],
				itemCount: 1,
				pageNumber,
				pageSize,
				pageCount: 1
			});
		}, 1000);
	});
};

export const fetchMockDataSource = async (dataSourceId: string): Promise<{ dataSource: DataSource }> => {
	const dataSource: DataSource = {
		dataSourceId,
		dataSourceCode: 'DEFAULT_ONE',
		dataSourceType: DataSourceType.MYSQL,
		tenantId: '1',
		host: '',
		port: '',
		name: '',
		username: '',
		password: '',
		url: '',
		params: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
	return {dataSource};
};

let newDataSourceId = 10000;
export const saveMockDataSource = async (dataSource: DataSource): Promise<void> => {
	return new Promise((resolve) => {
		if (isFakedUuid(dataSource)) {
			dataSource.dataSourceId = `${newDataSourceId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const listMockDataSourcesForHolder = async (): Promise<Array<QueryDataSourceForHolder>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(
				[
					{dataSourceId: '1', dataSourceCode: 'DEFAULT_ONE'}
				]
			);
		}, 500);
	});
};