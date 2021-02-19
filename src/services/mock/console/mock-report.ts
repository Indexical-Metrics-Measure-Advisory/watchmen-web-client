import { ChartDataSet } from '../../tuples/chart-types';

export const fetchMockCountChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [ [ 1234 ] ]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					meta: [],
					data: []
				} as ChartDataSet),
			500
		);
	});
};