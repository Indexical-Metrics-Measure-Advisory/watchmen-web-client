import {EChartsPositionHolder} from './echarts-position-types';

export enum EChartsToolboxOrient {
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical'
}

export interface EChartsToolbox extends EChartsPositionHolder {
	show?: boolean;
	orient?: EChartsToolboxOrient;
}

export interface EChartsToolboxHolder {
	toolbox?: EChartsToolbox;
}