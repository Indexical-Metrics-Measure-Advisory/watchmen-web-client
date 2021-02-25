export enum EChartHorizontalAlignment { AUTO = 'auto', LEFT = 'left', RIGHT = 'right', CENTER = 'center'}

export enum EChartVerticalAlignment { AUTO = 'auto', TOP = 'top', BOTTOM = 'bottom', MIDDLE = 'middle'}

export interface EChartAlignment {
	align?: EChartHorizontalAlignment;
	verticalAlign?: EChartVerticalAlignment;
}
