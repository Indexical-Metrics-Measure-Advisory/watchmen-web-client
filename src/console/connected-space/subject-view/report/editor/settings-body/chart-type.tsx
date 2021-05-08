import React from 'react';
import {DropdownOption} from '../../../../../../basic-widgets/types';
import {Lang} from '../../../../../../langs';
import {ChartHelper} from '../../../../../../report/chart-utils';
import {ChartType} from '../../../../../../services/tuples/chart-types';
import {Report} from '../../../../../../services/tuples/report-types';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {DropdownValue} from '../settings-widgets/dropdown-value';

const ChartTypeOptions: Array<DropdownOption> = [
	{value: ChartType.COUNT, label: Lang.CHART.TYPES.COUNT},
	{value: ChartType.BAR, label: Lang.CHART.TYPES.BAR},
	{value: ChartType.LINE, label: Lang.CHART.TYPES.LINE},
	{value: ChartType.SCATTER, label: Lang.CHART.TYPES.SCATTER},
	{value: ChartType.PIE, label: Lang.CHART.TYPES.PIE},
	{value: ChartType.DOUGHNUT, label: Lang.CHART.TYPES.DOUGHNUT},
	{value: ChartType.NIGHTINGALE, label: Lang.CHART.TYPES.NIGHTINGALE},
	{value: ChartType.SUNBURST, label: Lang.CHART.TYPES.SUNBURST},
	{value: ChartType.TREE, label: Lang.CHART.TYPES.TREE},
	{value: ChartType.TREEMAP, label: Lang.CHART.TYPES.TREEMAP},
	{value: ChartType.MAP, label: Lang.CHART.TYPES.MAP}
];

export const ChartTypeEditor = (props: { report: Report }) => {
	const {report} = props;

	const {fire} = useReportEditEventBus();

	const onDropdownValueChange = (option: DropdownOption) => {
		const {value} = option;
		report.chart.type = value;
		// defend
		ChartHelper[report.chart.type].defend(report);
		fire(ReportEditEventTypes.CHART_TYPE_CHANGED, report);
	};

	return <DropdownValue label={Lang.CHART.TYPE} options={ChartTypeOptions}
	                      value={report.chart.type}
	                      onValueChange={onDropdownValueChange}/>;
};