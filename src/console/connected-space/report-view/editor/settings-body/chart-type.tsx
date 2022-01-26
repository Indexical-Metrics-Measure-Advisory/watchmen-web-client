import {isChartScriptInConsoleEnabled} from '@/feature-switch';
import {ChartType} from '@/services/data/tuples/chart-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {ChartHelper} from '@/widgets/report/chart-utils';
import React from 'react';
import {isTemplateConnectedSpace} from '../../../utils';
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
	{value: ChartType.MAP, label: Lang.CHART.TYPES.MAP},
	{value: ChartType.CUSTOMIZED, label: Lang.CHART.TYPES.CUSTOMIZED}
];

export const ChartTypeEditor = (props: { connectedSpace: ConnectedSpace; report: Report }) => {
	const {connectedSpace, report} = props;

	const {fire} = useReportEditEventBus();

	const onDropdownValueChange = (option: DropdownOption) => {
		const {value} = option;
		report.chart.type = value;
		// defend
		ChartHelper[report.chart.type].defend(report);
		fire(ReportEditEventTypes.CHART_TYPE_CHANGED, report);
	};

	let options = ChartTypeOptions;
	if (!isChartScriptInConsoleEnabled() && !isTemplateConnectedSpace(connectedSpace)) {
		// script not opened to console,
		// and it is not a template connected space
		if (report.chart.type === ChartType.CUSTOMIZED) {
			// when chart type is given, and it is customized, can not be changed
			options = [{value: ChartType.CUSTOMIZED, label: Lang.CHART.TYPES.CUSTOMIZED}];
		} else {
			// type is not customized, then customized is not an option to change
			options = options.filter(option => option.value !== ChartType.CUSTOMIZED);
		}
	}

	return <DropdownValue label={Lang.CHART.TYPE} options={options}
	                      value={report.chart.type}
	                      onValueChange={onDropdownValueChange}/>;
};