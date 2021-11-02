import {Apis, get, page, post} from '../apis';
import {deleteMockReport, listMockReports, saveMockReport} from '../mock/tuples/mock-report';
import {TuplePage} from '../query/tuple-page';
import {isMockService} from '../utils';
import {ParameterJoint} from './factor-calculator-types';
import {strictParameterJoint} from './parameter-utils';
import {QueryReport} from './query-report-types';
import {Report, ReportFunnel} from './report-types';
import {SubjectId} from './subject-types';
import {isFakedUuid} from './utils';

const strictReportFilters = (filters?: ParameterJoint): ParameterJoint | undefined => {
	if (!filters) {
		return (void 0);
	}

	const strictJoint = strictParameterJoint(filters);
	if (strictJoint.filters.length === 0) {
		return (void 0);
	} else {
		return strictJoint;
	}
};
const strictReportFunnels = (funnels?: Array<ReportFunnel>): Array<ReportFunnel> | undefined => {
	if (!funnels) {
		return (void 0);
	}

	const strictFunnels = funnels.filter(funnel => funnel.enabled);
	if (strictFunnels.length === 0) {
		return (void 0);
	} else {
		return strictFunnels;
	}
};
const transformToServer = (report: Report): Report => {
	const {filters, funnels, ...rest} = report;

	return {filters: strictReportFilters(filters), funnels: strictReportFunnels(funnels), ...rest};
};

export const listReports = async (options: {
	search: string;
	pageNumber?: number;
	pageSize?: number;
}): Promise<TuplePage<QueryReport>> => {
	const {search = '', pageNumber = 1, pageSize = 9} = options;

	if (isMockService()) {
		return listMockReports(options);
	} else {
		return await page({api: Apis.REPORT_LIST_BY_NAME, search: {search}, pageable: {pageNumber, pageSize}});
	}
};

export const saveNewReport = async (report: Report, subjectId: SubjectId): Promise<void> => {
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
