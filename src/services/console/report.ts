import { findToken } from "../account";
import {
	fetchMockBarChartData,
	fetchMockChartData,
	fetchMockCountChartData,
	fetchMockDoughnutChartData,
	fetchMockLineChartData,
	fetchMockMapChartData,
	fetchMockNightingaleChartData,
	fetchMockPieChartData,
	fetchMockScatterChartData,
	fetchMockSunburstChartData,
	fetchMockTreeChartData,
	fetchMockTreemapChartData,
} from "../mock/console/mock-report";
import { ChartDataSet, ChartType } from "../tuples/chart-types";
import { Report } from "../tuples/report-types";
import { doFetch, getServiceHost, isMockService } from '../utils';

export const fetchChartDataTemporary = async (report: Report): Promise<ChartDataSet> => {
	if (isMockService()) {
		return fetchChartData(report.reportId, report.chart.type);
	} else {
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}console_space/dataset/chart/temporary`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(report),
		});

		return await response.json();

		// REMOTE use real api
		// return fetchChartData(report.reportId, report.chart.type);
	}
};
export const fetchChartData = async (reportId: string, type: ChartType): Promise<ChartDataSet> => {
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
		} else {
			return fetchMockChartData(reportId);
		}
	} else {
		const token = findToken();
		const response = await doFetch(`${getServiceHost()}console_space/dataset/chart?report_id=${reportId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		return await response.json();
	}
};
