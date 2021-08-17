import {DropdownOption} from '../../../../../../basic-widgets/types';
import {Lang} from '../../../../../../langs';
import {
	EChartsHorizontalAlignment,
	EChartsVerticalAlignment
} from '../../../../../../services/tuples/echarts/echarts-alignment-types';

export const HorizontalAlignmentOptions: Array<DropdownOption> = [
	{value: EChartsHorizontalAlignment.AUTO, label: Lang.CHART.HORIZONTAL_ALIGNMENT_AUTO},
	{value: EChartsHorizontalAlignment.LEFT, label: Lang.CHART.HORIZONTAL_ALIGNMENT_LEFT},
	{value: EChartsHorizontalAlignment.CENTER, label: Lang.CHART.HORIZONTAL_ALIGNMENT_CENTER},
	{value: EChartsHorizontalAlignment.RIGHT, label: Lang.CHART.HORIZONTAL_ALIGNMENT_RIGHT}
];
export const VerticalAlignmentOptions: Array<DropdownOption> = [
	{value: EChartsVerticalAlignment.AUTO, label: Lang.CHART.VERTICAL_ALIGNMENT_AUTO},
	{value: EChartsVerticalAlignment.TOP, label: Lang.CHART.VERTICAL_ALIGNMENT_TOP},
	{value: EChartsVerticalAlignment.MIDDLE, label: Lang.CHART.VERTICAL_ALIGNMENT_MIDDLE},
	{value: EChartsVerticalAlignment.BOTTOM, label: Lang.CHART.VERTICAL_ALIGNMENT_BOTTOM}
];