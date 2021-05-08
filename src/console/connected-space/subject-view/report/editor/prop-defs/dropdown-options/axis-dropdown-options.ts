import {DropdownOption} from '../../../../../../../basic-widgets/types';
import {Lang} from '../../../../../../../langs';
import {EChartsAxisSplitLineStyle} from '../../../../../../../services/tuples/echarts/echarts-axis-split-line-types';
import {EChartsXAxisType} from '../../../../../../../services/tuples/echarts/echarts-xaxis-types';

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