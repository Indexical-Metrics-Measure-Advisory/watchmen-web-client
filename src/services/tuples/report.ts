import { findToken } from '../account';
import { deleteMockReport, listMockReports, saveMockReport } from '../mock/tuples/mock-report';
import { DataPage } from '../query/data-page';
import { getServiceHost, isMockService } from '../utils';
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
	//return saveMockReport(report);
	const token = findToken();
	const response = await fetch(`${getServiceHost()}console_space/subject/report/save?subject_id=${subjectId}`, {
		 		method: 'POST',
		 		headers: {
		 			'Content-Type': 'application/json',
		 			Authorization: 'Bearer ' + token
		 		},
		 		body: JSON.stringify(report)
		 	}
		 );
		
	const data = await response.json();
	report.reportId = data.reportId
	report.lastVisitTime= data.lastModifyTime
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

export const deleteReport = async (report: Report): Promise<void> => {
	if (isMockService()) {
		return deleteMockReport(report);
	} else {
		// REMOTE use real api
		return deleteMockReport(report);
		// const token = findToken();
		// await fetch(`${getServiceHost()}console_space/subject/delete?subject_id=${subject.subjectId}`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: 'Bearer ' + token
		// 	}
		// });
	}
};
