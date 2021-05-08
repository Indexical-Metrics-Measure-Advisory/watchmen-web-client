import {ChartType} from '../chart-types';
import {EChartsGridPositionOnly} from '../echarts/echarts-grid-types';
import {ECharts, EChartsSettings} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';

export const MAP: ChartDef = {
	type: ChartType.MAP,
	minDimensionCount: 2,
	maxDimensionCount: 2,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: false,
	canUseGrid: false,
	canUseXAxis: false,
	canUseYAxis: false
};

export enum MapChartRegion {
	JAPAN_L1 = 'japan-l1',
	USA_L1 = 'usa-l1',
}

export interface MapChartSettingsSeries {
	region?: MapChartRegion;
}

export interface MapChartSettings extends EChartsSettings {
	series?: MapChartSettingsSeries;
	grid?: EChartsGridPositionOnly;
}

export interface MapChart extends ECharts {
	type: ChartType.MAP;
	settings?: MapChartSettings;
}
