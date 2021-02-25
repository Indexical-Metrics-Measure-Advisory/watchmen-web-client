import React from 'react';
import { Lang } from '../../../../../../../langs';
import {
	EChartsAlignmentHolder,
	EChartsHorizontalAlignment,
	EChartsVerticalAlignment
} from '../../../../../../../services/tuples/echarts/echarts-alignment-types';
import { ECharts } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	EChartTitlePropNames,
	EChartXAxisPropNames,
	HorizontalAlignmentOptions,
	onDropdownValueChange,
	VerticalAlignmentOptions
} from '../../data-utils';
import { DropdownValue } from '../../settings-widgets/dropdown-value';

export interface SettingsAlignmentPropNames {
	align: EChartTitlePropNames.TEXT_HORIZONTAL_ALIGN
		| EChartXAxisPropNames.NAME_HORIZONTAL_ALIGN
		| EChartXAxisPropNames.LABEL_HORIZONTAL_ALIGN;
	verticalAlign: EChartTitlePropNames.TEXT_VERTICAL_ALIGN
		| EChartXAxisPropNames.NAME_VERTICAL_ALIGN
		| EChartXAxisPropNames.LABEL_VERTICAL_ALIGN;
}

export const AlignmentSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => EChartsAlignmentHolder | undefined;
	propNames: SettingsAlignmentPropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			align: alignPropName,
			verticalAlign: verticalAlignPropName
		},
		onValueChange
	} = props;

	const holder = getHolder(chart);

	return <>
		<DropdownValue label={Lang.CHART.HORIZONTAL_ALIGNMENT}
		               value={holder?.horizontalAlign} defaultValue={EChartsHorizontalAlignment.AUTO}
		               options={HorizontalAlignmentOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: alignPropName,
			               done: onValueChange
		               })}/>
		<DropdownValue label={Lang.CHART.VERTICAL_ALIGNMENT}
		               value={holder?.horizontalAlign} defaultValue={EChartsVerticalAlignment.AUTO}
		               options={VerticalAlignmentOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: verticalAlignPropName,
			               done: onValueChange
		               })}/>
	</>;
};