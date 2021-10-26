import {ChartType} from '../chart-types';
import {EChartsGridPositionOnly} from '../echarts/echarts-grid-types';
import {ECharts, EChartsSettings} from '../echarts/echarts-types';
import {ChartDef} from './chart-def-types';

export const TREE: ChartDef = {
	type: ChartType.TREE,
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

export enum TreeLayout {
	ORTHOGONAL = 'orthogonal',
	RADIAL = 'radial'
}

export enum TreeOrient {
	LEFT_RIGHT = 'LR',
	RIGHT_LEFT = 'RL',
	TOP_BOTTOM = 'TB',
	BOTTOM_TOP = 'BT'
}

export interface TreeChartSettingsSeries {
	layout?: TreeLayout;
	orient?: TreeOrient;
	roam?: boolean;
}

export interface TreeChartSettings extends EChartsSettings {
	series?: TreeChartSettingsSeries;
	grid?: EChartsGridPositionOnly;
}

export interface TreeChart extends ECharts {
	type: ChartType.TREE;
	settings?: TreeChartSettings;
}
