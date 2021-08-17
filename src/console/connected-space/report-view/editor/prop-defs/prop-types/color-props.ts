import {BarChartStylePropNames} from '../chart-styles/bar-chart-style-props';
import {CountChartStylePropNames} from '../chart-styles/count-chart-style-props';
import {PieChartStylePropNames} from '../chart-styles/pie-chart-style-props';
import {EChartsGridPropNames} from '../echart-styles/echarts-grid-props';
import {EChartsLegendPropNames} from '../echart-styles/echarts-legend-props';
import {EChartsTitlePropNames} from '../echart-styles/echarts-title-props';
import {EChartsXAxisPropNames} from '../echart-styles/echarts-xaxis-props';
import {EChartsYAxisPropNames} from '../echart-styles/echarts-yaxis-props';
import {PeripheralStylePropNames} from '../peripheral-style-props';

export type ColorPropNames =
	PeripheralStylePropNames.BACKGROUND_COLOR
	| PeripheralStylePropNames.BORDER_COLOR

	| CountChartStylePropNames.TEXT_FONT_COLOR

	| BarChartStylePropNames.LABEL_BORDER_COLOR
	| BarChartStylePropNames.LABEL_BACKGROUND_COLOR
	| BarChartStylePropNames.LABEL_FONT_COLOR

	| PieChartStylePropNames.BORDER_COLOR
	| PieChartStylePropNames.LABEL_BORDER_COLOR
	| PieChartStylePropNames.LABEL_BACKGROUND_COLOR
	| PieChartStylePropNames.LABEL_FONT_COLOR

	| EChartsTitlePropNames.TEXT_FONT_COLOR
	| EChartsTitlePropNames.TEXT_BORDER_COLOR
	| EChartsTitlePropNames.TEXT_BACKGROUND_COLOR
	| EChartsTitlePropNames.SUBTEXT_FONT_COLOR

	| EChartsLegendPropNames.FONT_COLOR
	| EChartsLegendPropNames.BORDER_COLOR
	| EChartsLegendPropNames.BACKGROUND_COLOR

	| EChartsGridPropNames.BORDER_COLOR
	| EChartsGridPropNames.BACKGROUND_COLOR

	| EChartsXAxisPropNames.NAME_FONT_COLOR
	| EChartsXAxisPropNames.NAME_BORDER_COLOR
	| EChartsXAxisPropNames.NAME_BACKGROUND_COLOR
	| EChartsXAxisPropNames.LABEL_FONT_COLOR
	| EChartsXAxisPropNames.LABEL_BORDER_COLOR
	| EChartsXAxisPropNames.LABEL_BACKGROUND_COLOR
	| EChartsXAxisPropNames.SPLIT_LINE_COLOR
	| EChartsXAxisPropNames.MINOR_SPLIT_LINE_COLOR

	| EChartsYAxisPropNames.NAME_FONT_COLOR
	| EChartsYAxisPropNames.NAME_BORDER_COLOR
	| EChartsYAxisPropNames.NAME_BACKGROUND_COLOR
	| EChartsYAxisPropNames.LABEL_FONT_COLOR
	| EChartsYAxisPropNames.LABEL_BORDER_COLOR
	| EChartsYAxisPropNames.LABEL_BACKGROUND_COLOR
	| EChartsYAxisPropNames.SPLIT_LINE_COLOR
	| EChartsYAxisPropNames.MINOR_SPLIT_LINE_COLOR;