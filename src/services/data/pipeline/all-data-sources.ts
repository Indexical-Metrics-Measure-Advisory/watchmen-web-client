import {Apis, get} from '../apis';
import {fetchMockAllDataSources} from '../mock/pipeline/mock-all-data-sources';
import {DataSource} from '../tuples/data-source-types';
import {isMockService} from '../utils';

export const fetchAllDataSources = async (): Promise<Array<DataSource>> => {
	if (isMockService()) {
		return fetchMockAllDataSources();
	} else {
		return await get({api: Apis.DATASOURCE_LOAD_ALL});
	}
};
