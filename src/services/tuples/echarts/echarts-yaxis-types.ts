import {EChartsAlignmentHolder} from './echarts-alignment-types';
import {EChartsAxisMinorSplitLineHolder, EChartsAxisSplitLineHolder} from './echarts-axis-split-line-types';
import {EChartsBorderHolder} from './echarts-border-type';
import {EChartsFontHolder} from './echarts-font-types';

export enum EChartsYAxisPosition {
	LEFT = 'left',
	RIGHT = 'right'
}

export enum EChartsYAxisType {
	VALUE = 'value',
	CATEGORY = 'category',
	TIME = 'time'
}

export enum EChartsYAxisNameLocation {
	START = 'start',
	MIDDLE = 'middle',
	END = 'end'
}

export interface EChartsYAxisName extends EChartsFontHolder, EChartsBorderHolder, EChartsAlignmentHolder {
	text?: string;
	location?: EChartsYAxisNameLocation;
	backgroundColor?: string;
	gap?: number;
	rotate?: number;
	padding?: number;
}

export interface EChartsYAxisLabel extends EChartsFontHolder, EChartsBorderHolder, EChartsAlignmentHolder {
	show?: boolean;
	inside?: boolean;
	backgroundColor?: string;
	gap?: number;
	rotate?: number;
	padding?: number;
}

export interface EChartsYAxis extends EChartsAxisSplitLineHolder, EChartsAxisMinorSplitLineHolder {
	show?: boolean;
	position?: EChartsYAxisPosition;
	type?: EChartsYAxisType;
	name?: EChartsYAxisName;
	label?: EChartsYAxisLabel;
	autoMin?: boolean;
	min?: number;
	autoMax?: boolean;
	max?: number;
}

export interface EChartsYAxisHolder {
	yaxis?: EChartsYAxis;
}