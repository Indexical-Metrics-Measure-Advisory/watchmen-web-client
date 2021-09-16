export enum ChartTruncationType {
	NONE = 'none',
	TOP = 'top',
	BOTTOM = 'bottom'
}

export interface ChartTruncation {
	type?: ChartTruncationType;
	count?: number;
}

export interface ChartTruncationHolder {
	truncation?: ChartTruncation;
}
