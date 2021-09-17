import {EChartsAlignmentHolder} from './echarts-alignment-types';
import {EChartsBorderHolder} from './echarts-border-type';
import {EChartsFontHolder} from './echarts-font-types';
import {EChartsPositionHolder} from './echarts-position-types';

export interface EChartsTitleText extends EChartsFontHolder {
	text?: string;
}

export interface EChartsTitle extends EChartsBorderHolder, EChartsPositionHolder, EChartsAlignmentHolder {
	text?: EChartsTitleText;
	subtext?: EChartsTitleText;
	backgroundColor?: string;
	padding?: number;
	/** gap with sub title */
	itemGap?: number;
}

export interface EChartsTitleHolder {
	title?: EChartsTitle;
}