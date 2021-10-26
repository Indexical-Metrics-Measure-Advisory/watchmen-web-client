import {ChartType} from '../chart-types';
import {EChartsAlignmentHolder} from '../echarts/echarts-alignment-types';
import {EChartsBorderHolder} from '../echarts/echarts-border-type';
import {EChartsFontHolder} from '../echarts/echarts-font-types';
import {ECharts, EChartsSettings} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';
import {ChartTruncationHolder} from './truncation';

export const BAR: ChartDef = {
	type: ChartType.BAR,
	minDimensionCount: 1,
	minIndicatorCount: 1,

	canHoldTitle: true,
	canHoldLegend: true,
	canUseGrid: true,
	canUseXAxis: true,
	canUseYAxis: true,

	canUseScript: false,
	canModifyScript: false
};

export enum BarLabelPosition {
	TOP = 'top',
	LEFT = 'left',
	RIGHT = 'right',
	BOTTOM = 'bottom',
	INSIDE = 'inside',
	INSIDE_LEFT = 'insideLeft',
	INSIDE_RIGHT = 'insideRight',
	INSIDE_TOP = 'insideTop',
	INSIDE_BOTTOM = 'insideBottom',
	INSIDE_TOP_LEFT = 'insideTopLeft',
	INSIDE_BOTTOM_LEFT = 'insideBottomLeft',
	INSIDE_TOP_RIGHT = 'insideTopRight',
	INSIDE_BOTTOM_RIGHT = 'insideBottomRight'
}

export interface BarChartSettingsLabel extends EChartsBorderHolder, EChartsFontHolder, EChartsAlignmentHolder {
	show?: boolean;
	backgroundColor?: string;
	position?: BarLabelPosition;
	rotate?: number;
	gap?: number;
	padding?: number;
	/** number format grouping */
	formatUseGrouping?: boolean;
	formatUsePercentage?: boolean;
	valueAsPercentage?: boolean;
	fractionDigits?: number;
}

export interface BarChartSettingsSeries {
	transformAxis?: boolean;
}

export interface BarChartSettings extends ChartTruncationHolder, EChartsSettings {
	series?: BarChartSettingsSeries;
	label?: BarChartSettingsLabel;
	decal?: boolean;
}

export interface BarChart extends ECharts {
	type: ChartType.BAR;
	settings?: BarChartSettings;
}
