import { Chart, ChartSettings, ChartType } from '../chart-types';
import { EChartsGridHolder } from './echarts-grid-types';
import { EChartsLegendHolder } from './echarts-legend-types';
import { EChartsTitleHolder } from './echarts-title-types';

export interface EChartsSettings extends ChartSettings {
}

export interface EChart extends Chart {
	type: ChartType;
	settings?: EChartsSettings
		& EChartsTitleHolder
		& EChartsLegendHolder
		& EChartsGridHolder;
}