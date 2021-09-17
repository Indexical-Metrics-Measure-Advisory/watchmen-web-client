import {EChartsXAxisNameLocation, EChartsXAxisPosition} from '@/services/data/tuples/echarts/echarts-xaxis-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const XAxisPositionOptions: Array<DropdownOption> = [
	{value: EChartsXAxisPosition.TOP, label: Lang.CHART.POSITION_TOP},
	{value: EChartsXAxisPosition.BOTTOM, label: Lang.CHART.POSITION_BOTTOM}
];
export const XAxisNameLocationOptions: Array<DropdownOption> = [
	{value: EChartsXAxisNameLocation.START, label: Lang.CHART.AXIS_NAME_LOCATION_START},
	{value: EChartsXAxisNameLocation.CENTER, label: Lang.CHART.AXIS_NAME_LOCATION_CENTER},
	{value: EChartsXAxisNameLocation.END, label: Lang.CHART.AXIS_NAME_LOCATION_END}
];

export enum EChartsXAxisPropNames {
	SHOW = 'xaxis.show',
	POSITION = 'xaxis.position',
	TYPE = 'xaxis.type',

	AUTO_MIN = 'xaxis.autoMin',
	MIN = 'xaxis.min',
	AUTO_MAX = 'xaxis.autoMax',
	MAX = 'xaxis.max',

	NAME_TEXT = 'xaxis.name.text',
	NAME_LOCATION = 'xaxis.name.location',
	NAME_BACKGROUND_COLOR = 'xaxis.name.backgroundColor',
	NAME_FONT_FAMILY = 'xaxis.name.font.family',
	NAME_FONT_SIZE = 'xaxis.name.font.size',
	NAME_FONT_WEIGHT = 'xaxis.name.font.weight',
	NAME_FONT_COLOR = 'xaxis.name.font.color',
	NAME_FONT_STYLE = 'xaxis.name.font.style',
	NAME_BORDER_WIDTH = 'xaxis.name.border.width',
	NAME_BORDER_STYLE = 'xaxis.name.border.style',
	NAME_BORDER_COLOR = 'xaxis.name.border.color',
	NAME_BORDER_RADIUS = 'xaxis.name.border.radius',
	NAME_HORIZONTAL_ALIGN = 'xaxis.name.horizontalAlign',
	NAME_VERTICAL_ALIGN = 'xaxis.name.verticalAlign',
	NAME_GAP = 'xaxis.name.gap',
	NAME_ROTATE = 'xaxis.name.rotate',
	NAME_PADDING = 'xaxis.name.padding',

	LABEL_SHOW = 'xaxis.label.show',
	LABEL_INSIDE = 'xaxis.label.inside',
	LABEL_BACKGROUND_COLOR = 'xaxis.label.backgroundColor',
	LABEL_FONT_FAMILY = 'xaxis.label.font.family',
	LABEL_FONT_SIZE = 'xaxis.label.font.size',
	LABEL_FONT_WEIGHT = 'xaxis.label.font.weight',
	LABEL_FONT_COLOR = 'xaxis.label.font.color',
	LABEL_FONT_STYLE = 'xaxis.label.font.style',
	LABEL_BORDER_WIDTH = 'xaxis.label.border.width',
	LABEL_BORDER_STYLE = 'xaxis.label.border.style',
	LABEL_BORDER_COLOR = 'xaxis.label.border.color',
	LABEL_BORDER_RADIUS = 'xaxis.label.border.radius',
	LABEL_HORIZONTAL_ALIGN = 'xaxis.label.horizontalAlign',
	LABEL_VERTICAL_ALIGN = 'xaxis.label.verticalAlign',
	LABEL_GAP = 'xaxis.label.gap',
	LABEL_ROTATE = 'xaxis.label.rotate',
	LABEL_PADDING = 'xaxis.label.padding',

	SPLIT_LINE_SHOW = 'xaxis.splitLine.show',
	SPLIT_LINE_COLOR = 'xaxis.splitLine.color',
	SPLIT_LINE_WIDTH = 'xaxis.splitLine.width',
	SPLIT_LINE_STYLE = 'xaxis.splitLine.style',

	MINOR_SPLIT_LINE_SHOW = 'xaxis.minorSplitLine.show',
	MINOR_SPLIT_LINE_COLOR = 'xaxis.minorSplitLine.color',
	MINOR_SPLIT_LINE_WIDTH = 'xaxis.minorSplitLine.width',
	MINOR_SPLIT_LINE_STYLE = 'xaxis.minorSplitLine.style',
}
