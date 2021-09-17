import {EChartsBorderHolderNoRadius} from './echarts-border-type';
import {EChartsPositionHolder} from './echarts-position-types';

export interface EChartsGrid extends EChartsBorderHolderNoRadius, EChartsPositionHolder {
	show?: boolean;
	containLabel?: boolean;
	backgroundColor?: string;
}

export interface EChartsGridPositionOnly extends EChartsPositionHolder {

}

export interface EChartsGridHolder {
	grid?: EChartsGrid;
}