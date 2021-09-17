import {PieLabelAlignTo, PieLabelPosition, PieRoseType} from '@/services/data/tuples/chart-def/chart-pie';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const PieRoseTypeOptions: Array<DropdownOption> = [
	{value: PieRoseType.NONE, label: Lang.CHART.PIE_ROSE_TYPE_NONE},
	{value: PieRoseType.RADIUS, label: Lang.CHART.PIE_ROSE_TYPE_RADIUS},
	{value: PieRoseType.AREA, label: Lang.CHART.PIE_ROSE_TYPE_AREA}
];

export const PieLabelPositionOptions: Array<DropdownOption> = [
	{value: PieLabelPosition.INSIDE, label: Lang.CHART.LABEL_POSITION_INSIDE},
	{value: PieLabelPosition.OUTSIDE, label: Lang.CHART.LABEL_POSITION_OUTSIDE},
	{value: PieLabelPosition.CENTER, label: Lang.CHART.LABEL_POSITION_CENTER}
];
export const PieLabelAlignToOptions: Array<DropdownOption> = [
	{value: PieLabelAlignTo.NONE, label: Lang.CHART.PIE_LABEL_ALIGN_TO_NONE},
	{value: PieLabelAlignTo.LABEL_LINE, label: Lang.CHART.PIE_LABEL_ALIGN_TO_LABEL_LINE},
	{value: PieLabelAlignTo.EDGE, label: Lang.CHART.PIE_LABEL_ALIGN_TO_EDGE}
];

export enum PieChartStylePropNames {
	POSITION_TOP = 'grid.position.top',
	POSITION_RIGHT = 'grid.position.right',
	POSITION_LEFT = 'grid.position.left',
	POSITION_BOTTOM = 'grid.position.bottom',

	CENTER_X = 'series.centerX',
	CENTER_Y = 'series.centerY',
	INSIDE_RADIUS = 'series.insideRadius',
	OUTSIDE_RADIUS = 'series.outsideRadius',
	ROSE_TYPE = 'series.roseType',
	SHOW_PERCENTAGE = 'series.showPercentage',

	BORDER_STYLE = 'series.border.style',
	BORDER_WIDTH = 'series.border.width',
	BORDER_COLOR = 'series.border.color',
	BORDER_RADIUS = 'series.border.radius',

	LABEL_SHOW = 'label.show',

	LABEL_POSITION = 'label.position',
	LABEL_ALIGN_TO = 'label.alignTo',
	LABEL_HORIZONTAL_ALIGN = 'label.horizontalAlign',
	LABEL_VERTICAL_ALIGN = 'label.verticalAlign',

	LABEL_ROTATE = 'label.rotate',
	LABEL_GAP = 'label.gap',
	LABEL_PADDING = 'label.padding',

	LABEL_FRACTION_DIGITS = 'label.fractionDigits',
	LABEL_FORMAT_USE_GROUPING = 'label.formatUseGrouping',
	LABEL_FORMAT_USE_PERCENTAGE = 'label.formatUsePercentage',
	LABEL_VALUE_AS_PERCENTAGE = 'label.valueAsPercentage',

	LABEL_BORDER_WIDTH = 'label.border.width',
	LABEL_BORDER_COLOR = 'label.border.color',
	LABEL_BORDER_STYLE = 'label.border.style',
	LABEL_BORDER_RADIUS = 'label.border.radius',
	LABEL_BACKGROUND_COLOR = 'label.backgroundColor',

	LABEL_FONT_FAMILY = 'label.font.family',
	LABEL_FONT_COLOR = 'label.font.color',
	LABEL_FONT_SIZE = 'label.font.size',
	LABEL_FONT_STYLE = 'label.font.style',
	LABEL_FONT_WEIGHT = 'label.font.weight'
}