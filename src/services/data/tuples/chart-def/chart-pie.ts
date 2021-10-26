import {ChartType} from '../chart-types';
import {EChartsAlignmentHolder} from '../echarts/echarts-alignment-types';
import {EChartsBorderHolder} from '../echarts/echarts-border-type';
import {EChartsFontHolder} from '../echarts/echarts-font-types';
import {EChartsGridPositionOnly} from '../echarts/echarts-grid-types';
import {ECharts, EChartsSettings} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';
import {ChartTruncationHolder} from './truncation';

export const PIE: ChartDef = {
	type: ChartType.PIE,
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

export enum PieRoseType {
	NONE = 'none',
	RADIUS = 'radius',
	AREA = 'area'
}

export enum PieLabelPosition {
	INSIDE = 'inside',
	OUTSIDE = 'outside',
	CENTER = 'center'
}

export enum PieLabelAlignTo {
	NONE = 'none',
	LABEL_LINE = 'labelLine',
	EDGE = 'edge'
}

export interface PieChartSettingsLabel extends EChartsBorderHolder, EChartsFontHolder, EChartsAlignmentHolder {
	show?: boolean;
	backgroundColor?: string;
	position?: PieLabelPosition;
	alignTo?: PieLabelAlignTo;
	rotate?: number;
	gap?: number;
	padding?: number;
	/** number format grouping */
	formatUseGrouping?: boolean;
	formatUsePercentage?: boolean;
	valueAsPercentage?: boolean;
	fractionDigits?: number;
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
	label?: PieChartSettingsLabel;
	decal?: boolean;
}

export interface PieChart extends ECharts {
	type: ChartType.PIE;
	settings?: PieChartSettings;
}
