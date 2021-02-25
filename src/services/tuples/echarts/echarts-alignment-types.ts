export enum EChartsHorizontalAlignment { AUTO = 'auto', LEFT = 'left', RIGHT = 'right', CENTER = 'center'}

export enum EChartsVerticalAlignment { AUTO = 'auto', TOP = 'top', BOTTOM = 'bottom', MIDDLE = 'middle'}

export interface EChartsAlignmentHolder {
	horizontalAlign?: EChartsHorizontalAlignment;
	verticalAlign?: EChartsVerticalAlignment;
}
