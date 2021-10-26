import {ChartType} from '../chart-types';
import {ECharts} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';
import {PieChartSettings} from './chart-pie';

export const NIGHTINGALE: ChartDef = {
	type: ChartType.NIGHTINGALE,
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

export interface NightingaleChartSettings extends PieChartSettings {
}

export interface NightingaleChart extends ECharts {
	type: ChartType.NIGHTINGALE;
	settings?: NightingaleChartSettings;
}
