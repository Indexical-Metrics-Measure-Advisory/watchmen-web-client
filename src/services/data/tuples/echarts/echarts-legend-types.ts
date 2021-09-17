import {EChartsBorderHolder} from './echarts-border-type';
import {EChartsFontHolder} from './echarts-font-types';
import {EChartsPositionHolder} from './echarts-position-types';

export enum EChartsLegendOrient {
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical'
}

export interface EChartsLegend extends EChartsBorderHolder, EChartsPositionHolder, EChartsFontHolder {
	show?: boolean;
	orient?: EChartsLegendOrient;
	backgroundColor?: string;
	padding?: number;
}

export interface EChartsLegendHolder {
	legend?: EChartsLegend;
}