import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {EChartsXAxisPropNames} from '../../prop-defs/echart-styles/echarts-xaxis-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {EChartsAxisSplitLineSettings, SettingsAxisSplitLinePropNames} from '../axis-split-line';

export const EChartsXAxisSplitLineSettings = (props: { report: Report, chart: ECharts }) => {
	const {report, chart} = props;

	const {fire} = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_XAXIS_CHANGED, report);
	};

	const getHolder = () => chart.settings?.xaxis;
	const getSplitLine = () => getHolder()?.splitLine;
	const propNames: SettingsAxisSplitLinePropNames = {
		show: EChartsXAxisPropNames.SPLIT_LINE_SHOW,
		color: EChartsXAxisPropNames.SPLIT_LINE_COLOR,
		width: EChartsXAxisPropNames.SPLIT_LINE_WIDTH,
		style: EChartsXAxisPropNames.SPLIT_LINE_STYLE
	};

	return <EChartsAxisSplitLineSettings report={report} chart={chart}
	                                     getHolder={getHolder} getSplitLine={getSplitLine}
	                                     title={Lang.CHART.SECTION_TITLE_ECHART_XAXIS_LINE}
	                                     defaultShow={true}
	                                     propNames={propNames}
	                                     onValueChange={onValueChange}/>;
};