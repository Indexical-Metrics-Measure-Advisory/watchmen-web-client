import {TuplePage} from '../../query/tuple-page';
import {QueryReport} from '../../tuples/query-report-types';
import {Report} from '../../tuples/report-types';
import {isFakedUuid} from '../../tuples/utils';
import {getCurrentTime} from '../../utils';

export const listMockReports = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryReport>> => {
	const {pageNumber = 1, pageSize = 9} = options;

	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				data: [
					{
						reportId: '1',
						name: 'Premium on State',
						description: 'Annual premium summary group by state.',
						createTime: getCurrentTime(),
						lastModified: getCurrentTime()
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

let newReportId = 10000;
export const saveMockReport = async (report: Report): Promise<void> => {
	return new Promise((resolve) => {
		if (isFakedUuid(report)) {
			report.reportId = `${newReportId++}`;
		}
		setTimeout(() => resolve(), 500);
	});
};

export const deleteMockReport = async (report: Report): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 500);
	});
};