import {TreeLayout, TreeOrient} from '@/services/data/tuples/chart-def/chart-tree';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const TreeLayoutOptions: Array<DropdownOption> = [
	{value: TreeLayout.ORTHOGONAL, label: Lang.CHART.TREE_LAYOUT_ORTHOGONAL},
	{value: TreeLayout.RADIAL, label: Lang.CHART.TREE_LAYOUT_RADIAL}
];

export const TreeOrientOptions: Array<DropdownOption> = [
	{value: TreeOrient.LEFT_RIGHT, label: Lang.CHART.TREE_ORIENT_LEFT_RIGHT},
	{value: TreeOrient.RIGHT_LEFT, label: Lang.CHART.TREE_ORIENT_RIGHT_LEFT},
	{value: TreeOrient.TOP_BOTTOM, label: Lang.CHART.TREE_ORIENT_TOP_BOTTOM},
	{value: TreeOrient.BOTTOM_TOP, label: Lang.CHART.TREE_ORIENT_BOTTOM_TOP}
];

export enum TreeChartStylePropNames {
	POSITION_TOP = 'grid.position.top',
	POSITION_RIGHT = 'grid.position..right',
	POSITION_LEFT = 'grid.position.left',
	POSITION_BOTTOM = 'grid.position.bottom',
	ROAM = 'series.roam',
	LAYOUT = 'series.layout',
	ORIENT = 'series.orient'
}