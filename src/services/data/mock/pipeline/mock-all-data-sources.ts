import {DataSource} from '../../tuples/data-source-types';
import {DemoDataSources} from '../tuples/mock-data-source';

export const fetchMockAllDataSources = async (): Promise<Array<DataSource>> => {
	return new Promise<Array<DataSource>>(resolve => {
		setTimeout(() => resolve(DemoDataSources), 500);
	});
};
