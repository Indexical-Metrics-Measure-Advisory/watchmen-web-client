import { Chart, ChartSettings, ChartType } from '../chart-types';
import { EChartsTitleHolder } from './echarts-title-types';

export interface EChartsSettings extends ChartSettings, EChartsTitleHolder {
}

export interface EChart extends Chart {
	type: Exclude<ChartType, ChartType.COUNT>;
	settings?: EChartsSettings;
}