import {generateUuid} from '../../services/tuples/utils';
import {getCurrentTime} from '../../services/utils';
import {DataSource, DataSourceType} from '../../services/tuples/data-source-types';

export const createDataSource = (): DataSource => {
	return {
		dataSourceId: generateUuid(),
		dataSourceCode: '',
		dataSourceType: DataSourceType.MYSQL,
		host: '',
		port: '',
		username: '',
		password: '',
		url: '',
		params: [],
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};
