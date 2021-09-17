import {EChartsLegendOrient} from '@/services/data/tuples/echarts/echarts-legend-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const LegendOrientOptions: Array<DropdownOption> = [
	{value: EChartsLegendOrient.HORIZONTAL, label: Lang.CHART.LEGEND_ORIENT_HORIZONTAL},
	{value: EChartsLegendOrient.VERTICAL, label: Lang.CHART.LEGEND_ORIENT_VERTICAL}
];

export enum EChartsLegendPropNames {
	SHOW = 'legend.show',
	ORIENT = 'legend.orient',

	FONT_FAMILY = 'legend.font.family',
	FONT_COLOR = 'legend.font.color',
	FONT_SIZE = 'legend.font.size',
	FONT_STYLE = 'legend.font.style',
	FONT_WEIGHT = 'legend.font.weight',

	BORDER_WIDTH = 'legend.border.width',
	BORDER_COLOR = 'legend.border.color',
	BORDER_STYLE = 'legend.border.style',
	BORDER_RADIUS = 'legend.border.radius',
	BACKGROUND_COLOR = 'legend.backgroundColor',

	POSITION_TOP = 'legend.position.top',
	POSITION_RIGHT = 'legend.position.right',
	POSITION_LEFT = 'legend.position.left',
	POSITION_BOTTOM = 'legend.position.bottom',

	PADDING = 'legend.padding',
}
