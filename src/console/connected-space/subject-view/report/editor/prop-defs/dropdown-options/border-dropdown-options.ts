import {DropdownOption} from '../../../../../../../basic-widgets/types';
import {Lang} from '../../../../../../../langs';
import {ChartBorderStyle} from '../../../../../../../services/tuples/chart-types';

export const BorderStyleOptions: Array<DropdownOption> = [
	{value: ChartBorderStyle.NONE, label: Lang.CHART.BORDER_STYLE_NONE},
	{value: ChartBorderStyle.SOLID, label: Lang.CHART.BORDER_STYLE_SOLID},
	{value: ChartBorderStyle.DOTTED, label: Lang.CHART.BORDER_STYLE_DOTTED},
	{value: ChartBorderStyle.DASHED, label: Lang.CHART.BORDER_STYLE_DASHED}
];