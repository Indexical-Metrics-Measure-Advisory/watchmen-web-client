import {ChartType} from '../chart-types';
import {EChartsGridPositionOnly} from '../echarts/echarts-grid-types';
import {ECharts, EChartsSettings} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';

export const TREEMAP: ChartDef = {
	type: ChartType.TREEMAP,
	minDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: false,
	canUseGrid: true,
	canUseXAxis: false,
	canUseYAxis: false,

	canUseScript: false,
	canModifyScript: false
};

export interface TreemapChartSettingsSeries {
	roam?: boolean;
}

export interface TreemapChartSettings extends EChartsSettings {
	series?: TreemapChartSettingsSeries;
	grid?: EChartsGridPositionOnly;
}

export interface TreemapChart extends ECharts {
	type: ChartType.TREEMAP;
	settings?: TreemapChartSettings;
}
