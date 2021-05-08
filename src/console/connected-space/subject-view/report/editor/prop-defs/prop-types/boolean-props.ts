import {BarChartStylePropNames} from '../chart-styles/bar-chart-style-props';
import {CountChartStylePropNames} from '../chart-styles/count-chart-style-props';
import {LineChartStylePropNames} from '../chart-styles/line-chart-style-props';
import {PieChartStylePropNames} from '../chart-styles/pie-chart-style-props';
import {TreeChartStylePropNames} from '../chart-styles/tree-chart-style-props';
import {TreemapChartStylePropNames} from '../chart-styles/treemap-chart-style-props';
import {EChartsGridPropNames} from '../echart-styles/echarts-grid-props';
import {EChartsLegendPropNames} from '../echart-styles/echarts-legend-props';
import {EChartsTooltipPropNames} from '../echart-styles/echarts-tooltip-props';
import {EChartsXAxisPropNames} from '../echart-styles/echarts-xaxis-props';
import {EChartsYAxisPropNames} from '../echart-styles/echarts-yaxis-props';
import {PeripheralStylePropNames} from '../peripheral-style-props';

export type BooleanPropNames =
	PeripheralStylePropNames.DECAL
	| CountChartStylePropNames.TEXT_FORMAT_USE_GROUPING

	| BarChartStylePropNames.TRANSFORM_AXIS
	| BarChartStylePropNames.LABEL_SHOW
	| BarChartStylePropNames.LABEL_FORMAT_USE_GROUPING
	| BarChartStylePropNames.LABEL_FORMAT_USE_PERCENTAGE
	| BarChartStylePropNames.LABEL_VALUE_AS_PERCENTAGE

	| LineChartStylePropNames.SMOOTH

	| PieChartStylePropNames.SHOW_PERCENTAGE
	| PieChartStylePropNames.LABEL_SHOW
	| PieChartStylePropNames.LABEL_FORMAT_USE_GROUPING
	| PieChartStylePropNames.LABEL_FORMAT_USE_PERCENTAGE
	| PieChartStylePropNames.LABEL_VALUE_AS_PERCENTAGE

	| TreeChartStylePropNames.ROAM

	| TreemapChartStylePropNames.ROAM

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
	| EChartsYAxisPropNames.MINOR_SPLIT_LINE_SHOW

	| EChartsTooltipPropNames.SHOW;