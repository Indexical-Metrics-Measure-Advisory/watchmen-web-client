import {ChartType} from '../chart-types';
import {ECharts} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';
import {PieChartSettings} from './chart-pie';

export const DOUGHNUT: ChartDef = {
	type: ChartType.DOUGHNUT,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: true,
	canUseXAxis: false,
	canUseYAxis: false,

	canUseScript: false,
	canModifyScript: false
};

export interface DoughnutChartSettings extends PieChartSettings {
}

export interface DoughnutChart extends ECharts {
	type: ChartType.DOUGHNUT;
	settings?: DoughnutChartSettings;
}
