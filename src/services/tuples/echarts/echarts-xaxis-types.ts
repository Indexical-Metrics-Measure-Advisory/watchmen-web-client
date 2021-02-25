import { EChartsAlignmentHolder } from './echarts-alignment-types';
import { EChartsBorderHolder } from './echarts-border-type';
import { EChartsFontHolder } from './echarts-font-types';

export enum EChartsXAxisPosition {
	TOP = 'top',
	BOTTOM = 'bottom'
}

export enum EChartsXAxisType {
	VALUE = 'value',
	CATEGORY = 'category',
	TIME = 'time'
}

export enum EChartsXAxisNameLocation {
	START = 'start',
	CENTER = 'center',
	END = 'end'
}

export enum EChartsXAxisSplitLineType {
	SOLID = 'solid',
	DASHED = 'dashed',
	DOTTED = 'dotted'
}

export interface EChartsXAxisSplitLine {
	show?: boolean;
	color?: string;
	width?: number;
	type?: EChartsXAxisSplitLineType;
}

export interface EChartsXAxisName extends EChartsFontHolder, EChartsBorderHolder, EChartsAlignmentHolder {
	text?: string;
	location?: EChartsXAxisNameLocation;
	backgroundColor?: string;
	gap?: number;
	rotate?: number;
	padding?: number;
}

export interface EChartsXAxisLabel extends EChartsFontHolder, EChartsBorderHolder, EChartsAlignmentHolder {
	show?: boolean;
	inside?: boolean;
	backgroundColor?: string;
	gap?: number;
	rotate?: number;
	padding?: number;
}

export interface EChartsXAxis {
	show?: boolean;
	position?: EChartsXAxisPosition;
	type?: EChartsXAxisType;
	name?: EChartsXAxisName;
	label?: EChartsXAxisLabel;
	autoMin?: boolean;
	min?: number;
	autoMax?: boolean;
	max?: number;
	splitLine?: EChartsXAxisSplitLine;
	minorSplitLine?: EChartsXAxisSplitLine;
}

export interface EChartsXAxisHolder {
	xaxis?: EChartsXAxis;
}