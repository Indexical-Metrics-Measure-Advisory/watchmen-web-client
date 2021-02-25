import React from 'react';
import { Lang } from '../../../../../../../langs';
import {
	EChartAlignmentHolder,
	EChartHorizontalAlignment,
	EChartVerticalAlignment
} from '../../../../../../../services/tuples/echarts/echarts-alignment-types';
import { EChart } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	HorizontalAlignmentOptions,
	EChartTitlePropNames,
	onDropdownValueChange,
	VerticalAlignmentOptions
} from '../../data-utils';
import { DropdownValue } from '../../settings-widgets/dropdown-value';

export interface SettingsAlignmentPropNames {
	align: EChartTitlePropNames.TEXT_ALIGN;
	verticalAlign: EChartTitlePropNames.TEXT_VERTICAL_ALIGN;
}

export const AlignmentSettings = (props: {
	report: Report;
	chart: EChart;
	getHolder: (chart: EChart) => EChartAlignmentHolder | undefined;
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
		               value={holder?.horizontalAlign} defaultValue={EChartHorizontalAlignment.AUTO}
		               options={HorizontalAlignmentOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: alignPropName,
			               done: onValueChange
		               })}/>
		<DropdownValue label={Lang.CHART.VERTICAL_ALIGNMENT}
		               value={holder?.horizontalAlign} defaultValue={EChartVerticalAlignment.AUTO}
		               options={VerticalAlignmentOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: verticalAlignPropName,
			               done: onValueChange
		               })}/>
	</>;
};