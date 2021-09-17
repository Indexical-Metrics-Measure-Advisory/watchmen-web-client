import {ChartBorderStyle} from '@/services/data/tuples/chart-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const BorderStyleOptions: Array<DropdownOption> = [
	{value: ChartBorderStyle.NONE, label: Lang.CHART.BORDER_STYLE_NONE},
	{value: ChartBorderStyle.SOLID, label: Lang.CHART.BORDER_STYLE_SOLID},
	{value: ChartBorderStyle.DOTTED, label: Lang.CHART.BORDER_STYLE_DOTTED},
	{value: ChartBorderStyle.DASHED, label: Lang.CHART.BORDER_STYLE_DASHED}
];