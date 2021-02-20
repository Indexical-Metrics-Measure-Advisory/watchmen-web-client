import { listMockReports, saveMockReport } from '../mock/tuples/mock-report';
import { DataPage } from '../query/data-page';
import { isMockService } from '../utils';
import { QueryReport } from './query-report-types';
import { Report } from './report-types';
import { isFakedUuid } from './utils';

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

export const saveNewReport = async (report: Report, subjectId: string): Promise<void> => {
	return saveMockReport(report);
};

export const saveReport = async (report: Report): Promise<void> => {
	if (isMockService()) {
		return saveMockReport(report);
	} else if (isFakedUuid(report)) {
		// REMOTE use real api
		return saveMockReport(report);
		// const token = findToken();
		// const response = await fetch(`${getServiceHost()}console_space/subject?connect_id=${connectedSpaceId}`, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: 'Bearer ' + token
		// 		},
		// 		body: JSON.stringify(report)
		// 	}
		// );
		//
		// const data = await response.json();
		// report.reportId = data.subjectId;
		// report.lastModifyTime = data.lastModifyTime;
	} else {
		// REMOTE use real api
		return saveMockReport(report);
		// const token = findToken();
		// const response = await fetch(`${getServiceHost()}console_space/subject/save`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: 'Bearer ' + token
		// 	},
		// 	body: JSON.stringify(subject)
		// });
		//
		// const data = await response.json();
		// report.lastModifyTime = data.lastModifyTime;
	}
};
