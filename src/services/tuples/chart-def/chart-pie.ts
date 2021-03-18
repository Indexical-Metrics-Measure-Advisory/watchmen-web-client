import { ChartType } from '../chart-types';
import { EChartsBorderHolder } from '../echarts/echarts-border-type';
import { EChartsGridPositionOnly } from '../echarts/echarts-grid-types';
import { ECharts, EChartsSettings } from '../echarts/echarts-types';
import { ChartDef } from './chart-def-types';
import { ChartTruncationHolder } from './truncation';

export const PIE: ChartDef = {
	type: ChartType.PIE,
	minDimensionCount: 1,
	minIndicatorCount: 1,
	maxIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: false,
	canUseXAxis: false,
	canUseYAxis: false
};

export enum PieRoseType {
	NONE = 'none',
	RADIUS = 'radius',
	AREA = 'area'
}

export interface PieChartSettingsSeries extends EChartsBorderHolder {
	centerX?: number;
	centerY?: number;
	insideRadius?: number;
	outsideRadius?: number;
	roseType?: PieRoseType;
	showPercentage?: boolean;
}

export interface PieChartSettings extends ChartTruncationHolder, EChartsSettings {
	series?: PieChartSettingsSeries;
	grid?: EChartsGridPositionOnly;
	decal?: boolean;
}

export interface PieChart extends ECharts {
	type: ChartType.PIE;
	settings?: PieChartSettings;
}
