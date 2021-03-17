import { DropdownOption } from '../../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../../langs';
import { PieRoseType } from '../../../../../../../services/tuples/chart-def/chart-pie';

export const PieRoseTypeOptions: Array<DropdownOption> = [
	{ value: PieRoseType.NONE, label: Lang.CHART.PIE_ROSE_TYPE_NONE },
	{ value: PieRoseType.RADIUS, label: Lang.CHART.PIE_ROSE_TYPE_RADIUS },
	{ value: PieRoseType.AREA, label: Lang.CHART.PIE_ROSE_TYPE_AREA }
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
	BORDER_RADIUS = 'series.border.radius'
}