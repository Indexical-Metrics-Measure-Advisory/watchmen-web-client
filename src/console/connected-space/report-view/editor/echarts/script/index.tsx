import {canUseScript, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import MonacoEditor from '@monaco-editor/react';
import React from 'react';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';

export const EChartsScriptSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isEChart(chart) || !canUseScript(chart)) {
		return null;
	}

	const onValueChange = (value?: string) => {
		if (!chart.settings) {
			chart.settings = {};
		}
		chart.settings.script = value;
		fire(ReportEditEventTypes.ECHART_SCRIPT_CHANGED, report);
	};

	const script = chart.settings?.script;

	return <MonacoEditor language="javascript"
	                     value={script}
	                     onChange={onValueChange}
	                     theme="light"
	                     loading={Lang.PLAIN.LOADING}/>;
};