import {EChartsAxisSplitLineStyle} from '@/services/data/tuples/echarts/echarts-axis-split-line-types';
import {EChartsXAxisType} from '@/services/data/tuples/echarts/echarts-xaxis-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';

export const AxisTypeOptions: Array<DropdownOption> = [
	{value: EChartsXAxisType.CATEGORY, label: Lang.CHART.AXIS_TYPE_CATEGORY},
	{value: EChartsXAxisType.VALUE, label: Lang.CHART.AXIS_TYPE_VALUE},
	{value: EChartsXAxisType.TIME, label: Lang.CHART.AXIS_TYPE_TIME}
];
export const AxisSplitLineStyleOptions: Array<DropdownOption> = [
	{value: EChartsAxisSplitLineStyle.SOLID, label: Lang.CHART.BORDER_STYLE_SOLID},
	{value: EChartsAxisSplitLineStyle.DASHED, label: Lang.CHART.BORDER_STYLE_DASHED},
	{value: EChartsAxisSplitLineStyle.DOTTED, label: Lang.CHART.BORDER_STYLE_DOTTED}
];