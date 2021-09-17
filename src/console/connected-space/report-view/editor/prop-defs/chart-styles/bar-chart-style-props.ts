import {BarLabelPosition} from '@/services/data/tuples/chart-def/chart-bar';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const BarLabelPositionOptions: Array<DropdownOption> = [
	{value: BarLabelPosition.TOP, label: Lang.CHART.LABEL_POSITION_TOP},
	{value: BarLabelPosition.LEFT, label: Lang.CHART.LABEL_POSITION_LEFT},
	{value: BarLabelPosition.RIGHT, label: Lang.CHART.LABEL_POSITION_RIGHT},
	{value: BarLabelPosition.BOTTOM, label: Lang.CHART.LABEL_POSITION_BOTTOM},
	{value: BarLabelPosition.INSIDE, label: Lang.CHART.LABEL_POSITION_INSIDE},
	{value: BarLabelPosition.INSIDE_LEFT, label: Lang.CHART.LABEL_POSITION_INSIDE_LEFT},
	{value: BarLabelPosition.INSIDE_RIGHT, label: Lang.CHART.LABEL_POSITION_INSIDE_RIGHT},
	{value: BarLabelPosition.INSIDE_TOP, label: Lang.CHART.LABEL_POSITION_INSIDE_TOP},
	{value: BarLabelPosition.INSIDE_BOTTOM, label: Lang.CHART.LABEL_POSITION_INSIDE_BOTTOM},
	{value: BarLabelPosition.INSIDE_TOP_LEFT, label: Lang.CHART.LABEL_POSITION_INSIDE_TOP_LEFT},
	{value: BarLabelPosition.INSIDE_BOTTOM_LEFT, label: Lang.CHART.LABEL_POSITION_INSIDE_BOTTOM_LEFT},
	{value: BarLabelPosition.INSIDE_TOP_RIGHT, label: Lang.CHART.LABEL_POSITION_INSIDE_TOP_RIGHT},
	{value: BarLabelPosition.INSIDE_BOTTOM_RIGHT, label: Lang.CHART.LABEL_POSITION_INSIDE_BOTTOM_RIGHT}
];

export enum BarChartStylePropNames {
	TRANSFORM_AXIS = 'series.transformAxis',

	LABEL_SHOW = 'label.show',

	LABEL_POSITION = 'label.position',
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