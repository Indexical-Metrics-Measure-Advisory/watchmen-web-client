import {BarChartStylePropNames} from '../chart-styles/bar-chart-style-props';
import {CountChartStylePropNames} from '../chart-styles/count-chart-style-props';
import {MapChartStylePropNames} from '../chart-styles/map-chart-style-props';
import {PieChartStylePropNames} from '../chart-styles/pie-chart-style-props';
import {TreeChartStylePropNames} from '../chart-styles/tree-chart-style-props';
import {TreemapChartStylePropNames} from '../chart-styles/treemap-chart-style-props';
import {TruncationChartStylePropNames} from '../chart-styles/truncation-chart-style-props';
import {EChartsGridPropNames} from '../echart-styles/echarts-grid-props';
import {EChartsLegendPropNames} from '../echart-styles/echarts-legend-props';
import {EChartsTitlePropNames} from '../echart-styles/echarts-title-props';
import {EChartsTooltipPropNames} from '../echart-styles/echarts-tooltip-props';
import {EChartsXAxisPropNames} from '../echart-styles/echarts-xaxis-props';
import {EChartsYAxisPropNames} from '../echart-styles/echarts-yaxis-props';
import {PeripheralStylePropNames} from '../peripheral-style-props';

export type NumberPropNames =
	PeripheralStylePropNames.BORDER_WIDTH
	| PeripheralStylePropNames.BORDER_RADIUS

	| CountChartStylePropNames.TEXT_FONT_SIZE

	| BarChartStylePropNames.LABEL_FONT_SIZE
	| BarChartStylePropNames.LABEL_BORDER_WIDTH
	| BarChartStylePropNames.LABEL_BORDER_RADIUS
	| BarChartStylePropNames.LABEL_GAP
	| BarChartStylePropNames.LABEL_ROTATE
	| BarChartStylePropNames.LABEL_PADDING
	| BarChartStylePropNames.LABEL_FRACTION_DIGITS

	| TreeChartStylePropNames.POSITION_TOP
	| TreeChartStylePropNames.POSITION_RIGHT
	| TreeChartStylePropNames.POSITION_LEFT
	| TreeChartStylePropNames.POSITION_BOTTOM

	| TreemapChartStylePropNames.POSITION_TOP
	| TreemapChartStylePropNames.POSITION_RIGHT
	| TreemapChartStylePropNames.POSITION_LEFT
	| TreemapChartStylePropNames.POSITION_BOTTOM

	| PieChartStylePropNames.POSITION_TOP
	| PieChartStylePropNames.POSITION_RIGHT
	| PieChartStylePropNames.POSITION_LEFT
	| PieChartStylePropNames.POSITION_BOTTOM
	| PieChartStylePropNames.BORDER_RADIUS
	| PieChartStylePropNames.BORDER_WIDTH
	| PieChartStylePropNames.CENTER_X
	| PieChartStylePropNames.CENTER_Y
	| PieChartStylePropNames.INSIDE_RADIUS
	| PieChartStylePropNames.OUTSIDE_RADIUS
	| PieChartStylePropNames.LABEL_FONT_SIZE
	| PieChartStylePropNames.LABEL_GAP
	| PieChartStylePropNames.LABEL_ROTATE
	| PieChartStylePropNames.LABEL_PADDING
	| PieChartStylePropNames.LABEL_FRACTION_DIGITS
	| PieChartStylePropNames.LABEL_BORDER_WIDTH
	| PieChartStylePropNames.LABEL_BORDER_RADIUS

	| MapChartStylePropNames.POSITION_TOP
	| MapChartStylePropNames.POSITION_RIGHT
	| MapChartStylePropNames.POSITION_LEFT
	| MapChartStylePropNames.POSITION_BOTTOM

	| EChartsTitlePropNames.TEXT_FONT_SIZE
	| EChartsTitlePropNames.TEXT_BORDER_WIDTH
	| EChartsTitlePropNames.TEXT_BORDER_RADIUS
	| EChartsTitlePropNames.SUBTEXT_FONT_SIZE
	| EChartsTitlePropNames.POSITION_TOP
	| EChartsTitlePropNames.POSITION_RIGHT
	| EChartsTitlePropNames.POSITION_LEFT
	| EChartsTitlePropNames.POSITION_BOTTOM
	| EChartsTitlePropNames.ITEM_GAP
	| EChartsTitlePropNames.PADDING

	| EChartsLegendPropNames.BORDER_WIDTH
	| EChartsLegendPropNames.BORDER_RADIUS
	| EChartsLegendPropNames.FONT_SIZE
	| EChartsLegendPropNames.POSITION_TOP
	| EChartsLegendPropNames.POSITION_RIGHT
	| EChartsLegendPropNames.POSITION_LEFT
	| EChartsLegendPropNames.POSITION_BOTTOM
	| EChartsLegendPropNames.PADDING

	| EChartsGridPropNames.BORDER_WIDTH
	| EChartsGridPropNames.POSITION_TOP
	| EChartsGridPropNames.POSITION_RIGHT
	| EChartsGridPropNames.POSITION_LEFT
	| EChartsGridPropNames.POSITION_BOTTOM

	| EChartsXAxisPropNames.MIN
	| EChartsXAxisPropNames.MAX
	| EChartsXAxisPropNames.NAME_BORDER_WIDTH
	| EChartsXAxisPropNames.NAME_BORDER_RADIUS
	| EChartsXAxisPropNames.NAME_FONT_SIZE
	| EChartsXAxisPropNames.NAME_GAP
	| EChartsXAxisPropNames.NAME_ROTATE
	| EChartsXAxisPropNames.NAME_PADDING
	| EChartsXAxisPropNames.LABEL_BORDER_WIDTH
	| EChartsXAxisPropNames.LABEL_BORDER_RADIUS
	| EChartsXAxisPropNames.LABEL_FONT_SIZE
	| EChartsXAxisPropNames.LABEL_GAP
	| EChartsXAxisPropNames.LABEL_ROTATE
	| EChartsXAxisPropNames.LABEL_PADDING
	| EChartsXAxisPropNames.SPLIT_LINE_WIDTH
	| EChartsXAxisPropNames.MINOR_SPLIT_LINE_WIDTH

	| EChartsYAxisPropNames.MIN
	| EChartsYAxisPropNames.MAX
	| EChartsYAxisPropNames.NAME_BORDER_WIDTH
	| EChartsYAxisPropNames.NAME_BORDER_RADIUS
	| EChartsYAxisPropNames.NAME_FONT_SIZE
	| EChartsYAxisPropNames.NAME_GAP
	| EChartsYAxisPropNames.NAME_ROTATE
	| EChartsYAxisPropNames.NAME_PADDING
	| EChartsYAxisPropNames.LABEL_BORDER_WIDTH
	| EChartsYAxisPropNames.LABEL_BORDER_RADIUS
	| EChartsYAxisPropNames.LABEL_FONT_SIZE
	| EChartsYAxisPropNames.LABEL_GAP
	| EChartsYAxisPropNames.LABEL_ROTATE
	| EChartsYAxisPropNames.LABEL_PADDING
	| EChartsYAxisPropNames.SPLIT_LINE_WIDTH
	| EChartsYAxisPropNames.MINOR_SPLIT_LINE_WIDTH

	| TruncationChartStylePropNames.TRUNCATION_COUNT

	| EChartsTooltipPropNames.POSITION_TOP
	| EChartsTooltipPropNames.POSITION_RIGHT
	| EChartsTooltipPropNames.POSITION_LEFT
	| EChartsTooltipPropNames.POSITION_BOTTOM;