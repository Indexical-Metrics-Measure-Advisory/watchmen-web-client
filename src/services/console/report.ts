import { findToken } from '../account';
import { fetchMockChartData, fetchMockCountChartData, fetchMockPieChartData } from '../mock/console/mock-report';
import { ChartDataSet, ChartType } from '../tuples/chart-types';
import { getServiceHost, isMockService } from '../utils';

export const fetchChartData = async (reportId: string, type: ChartType): Promise<ChartDataSet> => {
	if (isMockService()) {
		if (type === ChartType.COUNT) {
			return fetchMockCountChartData(reportId);
		} else if (type === ChartType.PIE) {
			return fetchMockPieChartData(reportId);
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
