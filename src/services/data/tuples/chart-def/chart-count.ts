import {Chart, ChartFont, ChartType} from '../chart-types';
import {EChartsSettings} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';

export const COUNT: ChartDef = {
	type: ChartType.COUNT,
	minDimensionCount: 0,
	maxDimensionCount: 0,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: false,
	canUseGrid: false,
	canUseXAxis: false,
	canUseYAxis: false,

	canUseScript: false,
	canModifyScript: false
};

export interface CountChartSettingsText {
	font?: ChartFont;
	/** number format grouping */
	formatUseGrouping?: boolean;
}

export interface CountChartSettings extends EChartsSettings {
	countText?: CountChartSettingsText;
}

export interface CountChart extends Chart {
	type: ChartType.COUNT;
	settings?: CountChartSettings;
}
