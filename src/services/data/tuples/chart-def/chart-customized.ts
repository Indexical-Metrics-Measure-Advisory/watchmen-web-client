import {ChartType} from '../chart-types';
import {ECharts, EChartsSettings} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';

export const CUSTOMIZED: ChartDef = {
	type: ChartType.CUSTOMIZED,
	minDimensionCount: 0,
	minIndicatorCount: 0,

	canHoldTitle: true,
	canHoldLegend: false,
	canUseGrid: false,
	canUseXAxis: false,
	canUseYAxis: false,

	canUseScript: true,
	canModifyScript: true
};

export interface CustomizedChartSettings extends EChartsSettings {
}

export interface CustomizedChart extends ECharts {
	type: ChartType.CUSTOMIZED;
	settings?: CustomizedChartSettings;
}
