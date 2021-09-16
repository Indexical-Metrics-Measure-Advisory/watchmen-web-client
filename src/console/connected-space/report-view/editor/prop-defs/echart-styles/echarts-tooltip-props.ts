import {DropdownOption} from '@/basic-widgets/types';
import {Lang} from '@/langs';
import {EChartsToolboxOrient} from '@/services/tuples/echarts/echarts-toolbox-types';

export const ToolboxOrientOptions: Array<DropdownOption> = [
	{value: EChartsToolboxOrient.HORIZONTAL, label: Lang.CHART.TOOLBOX_ORIENT_HORIZONTAL},
	{value: EChartsToolboxOrient.VERTICAL, label: Lang.CHART.TOOLBOX_ORIENT_VERTICAL}
];

export enum EChartsTooltipPropNames {
	SHOW = 'toolbox.show',
	ORIENT = 'toolbox.orient',

	POSITION_TOP = 'toolbox.position.top',
	POSITION_RIGHT = 'toolbox.position.right',
	POSITION_LEFT = 'toolbox.position.left',
	POSITION_BOTTOM = 'toolbox.position.bottom',
}