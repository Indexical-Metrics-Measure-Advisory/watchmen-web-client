import {ChartType} from '../chart-types';
import {ECharts} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';
import {PieChartSettings, PieChartSettingsSeries} from './chart-pie';

export const SUNBURST: ChartDef = {
	type: ChartType.SUNBURST,
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

export interface SunburstChartSettings extends PieChartSettings {
	series?: Omit<PieChartSettingsSeries, 'roseType' | 'showPercentage'>;
}

export interface SunburstChart extends ECharts {
	type: ChartType.SUNBURST;
	settings?: SunburstChartSettings;
}
