import React from 'react';
import { Lang } from '../../../../../../../langs';
import {
	EChart,
	EChartAlign,
	EChartAlignment,
	EChartVerticalAlignment
} from '../../../../../../../services/tuples/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	AlignmentOptions,
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
	getHolder: (chart: EChart) => EChartAlign | undefined;
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
		<DropdownValue label={Lang.CHART.ALIGNMENT}
		               value={holder?.align} defaultValue={EChartAlignment.AUTO}
		               options={AlignmentOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: alignPropName,
			               done: onValueChange
		               })}/>
		<DropdownValue label={Lang.CHART.VERTICAL_ALIGNMENT}
		               value={holder?.align} defaultValue={EChartVerticalAlignment.AUTO}
		               options={VerticalAlignmentOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: verticalAlignPropName,
			               done: onValueChange
		               })}/>
	</>;
};