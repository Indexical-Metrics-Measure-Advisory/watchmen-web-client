import React from 'react';
import { Lang } from '../../../../../../../langs';
import { ECharts } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { EChartYAxisPropNames } from '../../data-utils';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { EChartsAxisSplitLineSettings, SettingsAxisSplitLinePropNames } from '../axis-split-line';

export const EChartsYAxisSplitLineSettings = (props: { report: Report, chart: ECharts }) => {
	const { report, chart } = props;

	const { fire } = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_YAXIS_CHANGED, report);
	};

	const getHolder = () => chart.settings?.yaxis;
	const getSplitLine = () => getHolder()?.splitLine;
	const propNames: SettingsAxisSplitLinePropNames = {
		show: EChartYAxisPropNames.SPLIT_LINE_SHOW,
		color: EChartYAxisPropNames.SPLIT_LINE_COLOR,
		width: EChartYAxisPropNames.SPLIT_LINE_WIDTH,
		style: EChartYAxisPropNames.SPLIT_LINE_STYLE
	};

	return <EChartsAxisSplitLineSettings report={report} chart={chart}
	                                     getHolder={getHolder} getSplitLine={getSplitLine}
	                                     title={Lang.CHART.SECTION_TITLE_ECHART_XAXIS_LINE}
	                                     defaultShow={true}
	                                     propNames={propNames}
	                                     onValueChange={onValueChange}/>;
};