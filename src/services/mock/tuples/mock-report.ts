import { DataPage } from '../../query/data-page';
import { QueryReport } from '../../tuples/query-report-types';

export const listMockReports = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryReport>> => {
	const { pageNumber = 1, pageSize = 9 } = options;

	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				data: [
					{
						reportId: '1',
						name: 'Premium on State',
						description: 'Annual premium summary group by state.',
						predefined: true,
						topicCount: 2,
						groupCount: 1,
						spaceCount: 2
					}
				],
				itemCount: 0,
				pageNumber,
				pageSize,
				pageCount: 1
			});
		}, 1000);
	});
};