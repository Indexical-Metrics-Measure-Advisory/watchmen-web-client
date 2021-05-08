import {BarChartStylePropNames} from '../chart-styles/bar-chart-style-props';
import {CountChartStylePropNames} from '../chart-styles/count-chart-style-props';
import {MapChartStylePropNames} from '../chart-styles/map-chart-style-props';
import {PieChartStylePropNames} from '../chart-styles/pie-chart-style-props';
import {TreeChartStylePropNames} from '../chart-styles/tree-chart-style-props';
import {TruncationChartStylePropNames} from '../chart-styles/truncation-chart-style-props';
import {EChartsGridPropNames} from '../echart-styles/echarts-grid-props';
import {EChartsLegendPropNames} from '../echart-styles/echarts-legend-props';
import {EChartsTitlePropNames} from '../echart-styles/echarts-title-props';
import {EChartsTooltipPropNames} from '../echart-styles/echarts-tooltip-props';
import {EChartsXAxisPropNames} from '../echart-styles/echarts-xaxis-props';
import {EChartsYAxisPropNames} from '../echart-styles/echarts-yaxis-props';
import {PeripheralStylePropNames} from '../peripheral-style-props';

export type DropdownPropNames =
	PeripheralStylePropNames.BORDER_STYLE

	| CountChartStylePropNames.TEXT_FONT_FAMILY
	| CountChartStylePropNames.TEXT_FONT_STYLE
	| CountChartStylePropNames.TEXT_FONT_WEIGHT

	| BarChartStylePropNames.LABEL_FONT_FAMILY
	| BarChartStylePropNames.LABEL_FONT_STYLE
	| BarChartStylePropNames.LABEL_FONT_WEIGHT
	| BarChartStylePropNames.LABEL_BORDER_STYLE
	| BarChartStylePropNames.LABEL_POSITION
	| BarChartStylePropNames.LABEL_HORIZONTAL_ALIGN
	| BarChartStylePropNames.LABEL_VERTICAL_ALIGN

	| TreeChartStylePropNames.LAYOUT
	| TreeChartStylePropNames.ORIENT

	| PieChartStylePropNames.BORDER_STYLE
	| PieChartStylePropNames.ROSE_TYPE
	| PieChartStylePropNames.LABEL_HORIZONTAL_ALIGN
	| PieChartStylePropNames.LABEL_VERTICAL_ALIGN
	| PieChartStylePropNames.LABEL_FONT_FAMILY
	| PieChartStylePropNames.LABEL_FONT_STYLE
	| PieChartStylePropNames.LABEL_FONT_WEIGHT
	| PieChartStylePropNames.LABEL_POSITION
	| PieChartStylePropNames.LABEL_ALIGN_TO
	| PieChartStylePropNames.LABEL_BORDER_STYLE

	| MapChartStylePropNames.REGION

	| EChartsTitlePropNames.TEXT_FONT_FAMILY
	| EChartsTitlePropNames.TEXT_FONT_STYLE
	| EChartsTitlePropNames.TEXT_FONT_WEIGHT
	| EChartsTitlePropNames.TEXT_BORDER_STYLE
	| EChartsTitlePropNames.SUBTEXT_FONT_FAMILY
	| EChartsTitlePropNames.SUBTEXT_FONT_STYLE
	| EChartsTitlePropNames.SUBTEXT_FONT_WEIGHT
	| EChartsTitlePropNames.TEXT_HORIZONTAL_ALIGN
	| EChartsTitlePropNames.TEXT_VERTICAL_ALIGN

	| EChartsLegendPropNames.ORIENT
	| EChartsLegendPropNames.BORDER_STYLE
	| EChartsLegendPropNames.FONT_FAMILY
	| EChartsLegendPropNames.FONT_STYLE
	| EChartsLegendPropNames.FONT_WEIGHT

	| EChartsGridPropNames.BORDER_STYLE

	| EChartsXAxisPropNames.POSITION
	| EChartsXAxisPropNames.TYPE
	| EChartsXAxisPropNames.NAME_LOCATION
	| EChartsXAxisPropNames.NAME_FONT_FAMILY
	| EChartsXAxisPropNames.NAME_FONT_STYLE
	| EChartsXAxisPropNames.NAME_FONT_WEIGHT
	| EChartsXAxisPropNames.NAME_BORDER_STYLE
	| EChartsXAxisPropNames.NAME_HORIZONTAL_ALIGN
	| EChartsXAxisPropNames.NAME_VERTICAL_ALIGN
	| EChartsXAxisPropNames.LABEL_FONT_FAMILY
	| EChartsXAxisPropNames.LABEL_FONT_STYLE
	| EChartsXAxisPropNames.LABEL_FONT_WEIGHT
	| EChartsXAxisPropNames.LABEL_BORDER_STYLE
	| EChartsXAxisPropNames.LABEL_HORIZONTAL_ALIGN
	| EChartsXAxisPropNames.LABEL_VERTICAL_ALIGN
	| EChartsXAxisPropNames.SPLIT_LINE_STYLE
	| EChartsXAxisPropNames.MINOR_SPLIT_LINE_STYLE

	| EChartsYAxisPropNames.POSITION
	| EChartsYAxisPropNames.TYPE
	| EChartsYAxisPropNames.NAME_LOCATION
	| EChartsYAxisPropNames.NAME_FONT_FAMILY
	| EChartsYAxisPropNames.NAME_FONT_STYLE
	| EChartsYAxisPropNames.NAME_FONT_WEIGHT
	| EChartsYAxisPropNames.NAME_BORDER_STYLE
	| EChartsYAxisPropNames.NAME_HORIZONTAL_ALIGN
	| EChartsYAxisPropNames.NAME_VERTICAL_ALIGN
	| EChartsYAxisPropNames.LABEL_FONT_FAMILY
	| EChartsYAxisPropNames.LABEL_FONT_STYLE
	| EChartsYAxisPropNames.LABEL_FONT_WEIGHT
	| EChartsYAxisPropNames.LABEL_BORDER_STYLE
	| EChartsYAxisPropNames.LABEL_HORIZONTAL_ALIGN
	| EChartsYAxisPropNames.LABEL_VERTICAL_ALIGN
	| EChartsYAxisPropNames.SPLIT_LINE_STYLE
	| EChartsYAxisPropNames.MINOR_SPLIT_LINE_STYLE

	| TruncationChartStylePropNames.TRUNCATION_TYPE

	| EChartsTooltipPropNames.ORIENT;