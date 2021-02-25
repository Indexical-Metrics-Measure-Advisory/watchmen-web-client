import { EChartsBorderHolder } from './echarts-border-type';
import { EChartsPositionHolder } from './echarts-position-types';

export enum EchartsLegendOrient {
	HORIZONTAL = 'horizontal',
	VERTICAL = 'vertical'
}

export interface EChartsLegend extends EChartsBorderHolder, EChartsPositionHolder {
	show?: boolean;
	orient?: EchartsLegendOrient;
	backgroundColor?: string;
	padding?: number;
}

export interface EChartsLegendHolder {
	legend?: EChartsLegend;
}