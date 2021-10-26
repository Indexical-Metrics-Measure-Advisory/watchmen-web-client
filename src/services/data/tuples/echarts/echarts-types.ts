import {Chart, ChartSettings, ChartType} from '../chart-types';
import {EChartsGridHolder} from './echarts-grid-types';
import {EChartsLegendHolder} from './echarts-legend-types';
import {EchartsScriptHolder} from './echarts-script-types';
import {EChartsTitleHolder} from './echarts-title-types';
import {EChartsToolboxHolder} from './echarts-toolbox-types';
import {EChartsXAxisHolder} from './echarts-xaxis-types';
import {EChartsYAxisHolder} from './echarts-yaxis-types';

export interface EChartsSettings extends ChartSettings {
}

export interface ECharts extends Chart {
	type: ChartType;
	settings?: EChartsSettings
		& EChartsTitleHolder
		& EChartsLegendHolder
		& EChartsGridHolder
		& EChartsXAxisHolder
		& EChartsYAxisHolder
		& EChartsToolboxHolder
		& EchartsScriptHolder;
}