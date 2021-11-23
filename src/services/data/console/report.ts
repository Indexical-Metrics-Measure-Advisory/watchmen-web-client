import {Apis, get, post} from '../apis';
import {
	fetchMockBarChartData,
	fetchMockChartData,
	fetchMockCountChartData,
	fetchMockCustomizeChartData,
	fetchMockDoughnutChartData,
	fetchMockLineChartData,
	fetchMockMapChartData,
	fetchMockNightingaleChartData,
	fetchMockPieChartData,
	fetchMockScatterChartData,
	fetchMockSunburstChartData,
	fetchMockTreeChartData,
	fetchMockTreemapChartData
} from '../mock/console/mock-report';
import {ChartDataSet, ChartType} from '../tuples/chart-types';
import {Report, ReportId} from '../tuples/report-types';
import {isMockService} from '../utils';

export const fetchChartDataTemporary = async (report: Report): Promise<ChartDataSet> => {
	if (isMockService()) {
		return fetchChartData(report.reportId, report.chart.type);
	} else {
		return await post({api: Apis.REPORT_TEMPORARY, data: report});
	}
};
export const fetchChartData = async (reportId: ReportId, type: ChartType): Promise<ChartDataSet> => {
	if (isMockService()) {
		if (type === ChartType.COUNT) {
			return fetchMockCountChartData(reportId);
		} else if (type === ChartType.PIE) {
			return fetchMockPieChartData(reportId);
		} else if (type === ChartType.DOUGHNUT) {
			return fetchMockDoughnutChartData(reportId);
		} else if (type === ChartType.NIGHTINGALE) {
			return fetchMockNightingaleChartData(reportId);
		} else if (type === ChartType.BAR) {
			return fetchMockBarChartData(reportId);
		} else if (type === ChartType.LINE) {
			return fetchMockLineChartData(reportId);
		} else if (type === ChartType.SCATTER) {
			return fetchMockScatterChartData(reportId);
		} else if (type === ChartType.SUNBURST) {
			return fetchMockSunburstChartData(reportId);
		} else if (type === ChartType.TREE) {
			return fetchMockTreeChartData(reportId);
		} else if (type === ChartType.TREEMAP) {
			return fetchMockTreemapChartData(reportId);
		} else if (type === ChartType.MAP) {
			return fetchMockMapChartData(reportId);
		} else if (type === ChartType.CUSTOMIZED) {
			return fetchMockCustomizeChartData(reportId);
		} else {
			return fetchMockChartData(reportId);
		}
	} else {
		return await get({api: Apis.REPORT_DATA, search: {reportId: reportId}});
	}
};
