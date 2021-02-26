import { CountChartStylePropNames } from '../chart-styles/count-chart-style-props';
import { TreeChartStylePropNames } from '../chart-styles/tree-chart-style-props';
import { EChartsGridPropNames } from '../echart-styles/echarts-grid-props';
import { EChartsLegendPropNames } from '../echart-styles/echarts-legend-props';
import { EChartsXAxisPropNames } from '../echart-styles/echarts-xaxis-props';
import { EChartsYAxisPropNames } from '../echart-styles/echarts-yaxis-props';

export type BooleanPropNames =
	CountChartStylePropNames.TEXT_FORMAT_USE_GROUPING

	| TreeChartStylePropNames.ROAM

	| EChartsLegendPropNames.SHOW

	| EChartsGridPropNames.SHOW
	| EChartsGridPropNames.CONTAIN_LABEL

	| EChartsXAxisPropNames.SHOW
	| EChartsXAxisPropNames.AUTO_MIN
	| EChartsXAxisPropNames.AUTO_MAX
	| EChartsXAxisPropNames.LABEL_SHOW
	| EChartsXAxisPropNames.LABEL_INSIDE
	| EChartsXAxisPropNames.SPLIT_LINE_SHOW
	| EChartsXAxisPropNames.MINOR_SPLIT_LINE_SHOW

	| EChartsYAxisPropNames.SHOW
	| EChartsYAxisPropNames.AUTO_MIN
	| EChartsYAxisPropNames.AUTO_MAX
	| EChartsYAxisPropNames.LABEL_SHOW
	| EChartsYAxisPropNames.LABEL_INSIDE
	| EChartsYAxisPropNames.SPLIT_LINE_SHOW
	| EChartsYAxisPropNames.MINOR_SPLIT_LINE_SHOW;