export enum PredefinedChartColorSeries {
	REGULAR = 'regular',
	DARK = 'dark',
	LIGHT = 'light'
}

export interface ChartSettings {
	colorSeries?: PredefinedChartColorSeries | Array<string>;
}

export enum ChartType {
	COUNT = 'count',
	BAR = 'bar',
	LINE = 'line',
	SCATTER = 'scatter',
	PIE = 'pie',
	DOUGHNUT = 'doughnut',
	NIGHTINGALE = 'nightingale',
	SUNBURST = 'sunburst',
	TREE = 'tree',
	TREEMAP = 'treemap',
	MAP = 'map'
}

export interface Chart {
	type: ChartType;
	settings?: ChartSettings;
}

export interface ChartDataSet {
	columns?: Array<string>;
	data: Array<Array<any>>;
}