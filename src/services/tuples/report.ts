import { listMockReports } from '../mock/tuples/mock-report';
import { DataPage } from '../query/data-page';
import { isMockService } from '../utils';
import { QueryReport } from './query-report-types';

export const listReports = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryReport>> => {
	// const { search = '', pageNumber = 1, pageSize = 9 } = options;

	if (isMockService()) {
		return listMockReports(options);
	} else {
		// REMOTE use real api
		return listMockReports(options);
	}
};
