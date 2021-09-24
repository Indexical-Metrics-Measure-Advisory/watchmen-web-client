import {Apis, get, page, post} from '../apis';
import {deleteMockReport, listMockReports, saveMockReport} from '../mock/tuples/mock-report';
import {DataPage} from '../query/data-page';
import {isMockService} from '../utils';
import {strictParameterJoint} from './parameter-utils';
import {QueryReport} from './query-report-types';
import {Report} from './report-types';
import {isFakedUuid} from './utils';

const transformToServer = (report: Report): Report => {
	const {filters, ...rest} = report;

	if (filters) {
		const strictJoint = strictParameterJoint(filters);
		if (strictJoint.filters.length === 0) {
			return {...rest};
		} else {
			return {filters: strictJoint, ...rest};
		}
	} else {
		return report;
	}
};

export const listReports = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<DataPage<QueryReport>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockReports(options);
	} else {
		return await page({api: Apis.REPORT_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const saveNewReport = async (report: Report, subjectId: string): Promise<void> => {
	if (isMockService()) {
		return saveMockReport(report);
	} else {
		const data = await post({api: Apis.REPORT_CREATE, search: {subjectId}, data: transformToServer(report)});
		report.reportId = data.reportId;
		report.lastVisitTime = data.lastModified;
	}
};

export const saveReport = async (report: Report): Promise<void> => {
	if (isMockService()) {
		return saveMockReport(report);
	} else if (isFakedUuid(report)) {
		throw new Error('Incorrect api called, should be "saveNewReport".');
	} else {
		const data = await post({api: Apis.REPORT_SAVE, data: transformToServer(report)});
		report.reportId = data.reportId;
		report.lastModified = data.lastModified;
	}
};

export const deleteReport = async (report: Report): Promise<void> => {
	if (isMockService()) {
		return deleteMockReport(report);
	} else {
		await get({api: Apis.REPORT_DELETE, search: {reportId: report.reportId}});
	}
};
