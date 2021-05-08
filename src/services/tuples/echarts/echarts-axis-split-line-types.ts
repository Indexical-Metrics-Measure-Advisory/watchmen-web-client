export enum EChartsAxisSplitLineStyle {
	SOLID = 'solid',
	DASHED = 'dashed',
	DOTTED = 'dotted'
}

export interface EChartsAxisSplitLine {
	show?: boolean;
	color?: string;
	width?: number;
	style?: EChartsAxisSplitLineStyle;
}

export interface EChartsAxisSplitLineHolder {
	splitLine?: EChartsAxisSplitLine;
}

export interface EChartsAxisMinorSplitLineHolder {
	minorSplitLine?: EChartsAxisSplitLine;
}
