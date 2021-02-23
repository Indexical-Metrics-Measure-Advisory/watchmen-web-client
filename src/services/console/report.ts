import { findToken } from '../account';
import {
	fetchMockBarChartData,
	fetchMockChartData,
	fetchMockCountChartData,
	fetchMockDoughnutChartData,
	fetchMockLineChartData,
	fetchMockNightingaleChartData,
	fetchMockPieChartData
} from '../mock/console/mock-report';
import { ChartDataSet, ChartType } from '../tuples/chart-types';
import { getServiceHost, isMockService } from '../utils';

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
		} else {
			return fetchMockChartData(reportId);
		}
	} else {
		const token = findToken();
		const response = await fetch(
			`${getServiceHost()}console_space/dataset/chart?report_id=${reportId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token
				}
			}
		);

		return await response.json();
	}
};
