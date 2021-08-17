import {EChartsTitlePropNames} from '../echart-styles/echarts-title-props';
import {EChartsXAxisPropNames} from '../echart-styles/echarts-xaxis-props';
import {EChartsYAxisPropNames} from '../echart-styles/echarts-yaxis-props';

export type TextPropNames =
	EChartsTitlePropNames.TEXT
	| EChartsTitlePropNames.SUBTEXT

	| EChartsXAxisPropNames.NAME_TEXT

	| EChartsYAxisPropNames.NAME_TEXT;