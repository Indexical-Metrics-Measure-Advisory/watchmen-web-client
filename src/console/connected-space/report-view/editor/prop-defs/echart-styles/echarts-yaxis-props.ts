import {EChartsYAxisNameLocation, EChartsYAxisPosition} from '@/services/data/tuples/echarts/echarts-yaxis-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const YAxisPositionOptions: Array<DropdownOption> = [
	{value: EChartsYAxisPosition.LEFT, label: Lang.CHART.POSITION_LEFT},
	{value: EChartsYAxisPosition.RIGHT, label: Lang.CHART.POSITION_RIGHT}
];
export const YAxisNameLocationOptions: Array<DropdownOption> = [
	{value: EChartsYAxisNameLocation.START, label: Lang.CHART.AXIS_NAME_LOCATION_START},
	{value: EChartsYAxisNameLocation.MIDDLE, label: Lang.CHART.AXIS_NAME_LOCATION_CENTER},
	{value: EChartsYAxisNameLocation.END, label: Lang.CHART.AXIS_NAME_LOCATION_END}
];

export enum EChartsYAxisPropNames {
	SHOW = 'yaxis.show',
	POSITION = 'yaxis.position',
	TYPE = 'yaxis.type',

	AUTO_MIN = 'yaxis.autoMin',
	MIN = 'yaxis.min',
	AUTO_MAX = 'yaxis.autoMax',
	MAX = 'yaxis.max',

	NAME_TEXT = 'yaxis.name.text',
	NAME_LOCATION = 'yaxis.name.location',
	NAME_BACKGROUND_COLOR = 'yaxis.name.backgroundColor',
	NAME_FONT_FAMILY = 'yaxis.name.font.family',
	NAME_FONT_SIZE = 'yaxis.name.font.size',
	NAME_FONT_WEIGHT = 'yaxis.name.font.weight',
	NAME_FONT_COLOR = 'yaxis.name.font.color',
	NAME_FONT_STYLE = 'yaxis.name.font.style',
	NAME_BORDER_WIDTH = 'yaxis.name.border.width',
	NAME_BORDER_STYLE = 'yaxis.name.border.style',
	NAME_BORDER_COLOR = 'yaxis.name.border.color',
	NAME_BORDER_RADIUS = 'yaxis.name.border.radius',
	NAME_HORIZONTAL_ALIGN = 'yaxis.name.horizontalAlign',
	NAME_VERTICAL_ALIGN = 'yaxis.name.verticalAlign',
	NAME_GAP = 'yaxis.name.gap',
	NAME_ROTATE = 'yaxis.name.rotate',
	NAME_PADDING = 'yaxis.name.padding',

	LABEL_SHOW = 'yaxis.label.show',
	LABEL_INSIDE = 'yaxis.label.inside',
	LABEL_BACKGROUND_COLOR = 'yaxis.label.backgroundColor',
	LABEL_FONT_FAMILY = 'yaxis.label.font.family',
	LABEL_FONT_SIZE = 'yaxis.label.font.size',
	LABEL_FONT_WEIGHT = 'yaxis.label.font.weight',
	LABEL_FONT_COLOR = 'yaxis.label.font.color',
	LABEL_FONT_STYLE = 'yaxis.label.font.style',
	LABEL_BORDER_WIDTH = 'yaxis.label.border.width',
	LABEL_BORDER_STYLE = 'yaxis.label.border.style',
	LABEL_BORDER_COLOR = 'yaxis.label.border.color',
	LABEL_BORDER_RADIUS = 'yaxis.label.border.radius',
	LABEL_HORIZONTAL_ALIGN = 'yaxis.label.horizontalAlign',
	LABEL_VERTICAL_ALIGN = 'yaxis.label.verticalAlign',
	LABEL_GAP = 'yaxis.label.gap',
	LABEL_ROTATE = 'yaxis.label.rotate',
	LABEL_PADDING = 'yaxis.label.padding',

	SPLIT_LINE_SHOW = 'yaxis.splitLine.show',
	SPLIT_LINE_COLOR = 'yaxis.splitLine.color',
	SPLIT_LINE_WIDTH = 'yaxis.splitLine.width',
	SPLIT_LINE_STYLE = 'yaxis.splitLine.style',

	MINOR_SPLIT_LINE_SHOW = 'yaxis.minorSplitLine.show',
	MINOR_SPLIT_LINE_COLOR = 'yaxis.minorSplitLine.color',
	MINOR_SPLIT_LINE_WIDTH = 'yaxis.minorSplitLine.width',
	MINOR_SPLIT_LINE_STYLE = 'yaxis.minorSplitLine.style',
}
