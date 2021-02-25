import React from 'react';
import { Lang } from '../../../../../../../langs';
import { EChart } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { EChartXAxisPropNames } from '../../data-utils';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { EChartsAxisSplitLineSettings, SettingsAxisSplitLinePropNames } from '../axis-split-line';

export const EChartsXAxisMinorSplitLineSettings = (props: { report: Report, chart: EChart }) => {
	const { report, chart } = props;

	const { fire } = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_XAXIS_CHANGED, report);
	};

	const getHolder = () => chart.settings?.xaxis;
	const getSplitLine = () => getHolder()?.minorSplitLine;
	const propNames: SettingsAxisSplitLinePropNames = {
		show: EChartXAxisPropNames.MINOR_SPLIT_LINE_SHOW,
		color: EChartXAxisPropNames.MINOR_SPLIT_LINE_COLOR,
		width: EChartXAxisPropNames.MINOR_SPLIT_LINE_WIDTH,
		style: EChartXAxisPropNames.MINOR_SPLIT_LINE_STYLE
	};

	return <EChartsAxisSplitLineSettings report={report} chart={chart}
	                                     getHolder={getHolder} getSplitLine={getSplitLine}
	                                     title={Lang.CHART.SECTION_TITLE_ECHART_XAXIS_MINOR_LINE}
	                                     defaultShow={false}
	                                     propNames={propNames}
	                                     onValueChange={onValueChange}/>;
};