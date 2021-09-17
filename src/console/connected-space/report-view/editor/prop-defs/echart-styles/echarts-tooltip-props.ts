import {EChartsToolboxOrient} from '@/services/data/tuples/echarts/echarts-toolbox-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

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