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

export const fetchMockPieChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockDoughnutChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockNightingaleChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockBarChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockLineChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockScatterChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'hello' ],
					[ 1324, 'world' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockSunburstChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'h', 'hello' ],
					[ 589, 'h', 'hell' ],
					[ 198, 'w', 'why' ],
					[ 1324, 'w', 'where' ],
					[ 675, 'w', 'who' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockTreeChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 198, 'w', 'why' ],
					[ 1324, 'w', 'where' ],
					[ 675, 'w', 'who' ]
				]
			} as ChartDataSet),
			500
		);
	});
};

export const fetchMockTreemapChartData = async (reportId: string): Promise<ChartDataSet> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({
				meta: [],
				data: [
					[ 1234, 'h', 'hello' ],
					[ 589, 'h', 'hell' ],
					[ 198, 'w', 'why' ],
					[ 1324, 'w', 'where' ],
					[ 675, 'w', 'who' ]
				]
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