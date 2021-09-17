import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {EChartsXAxisPropNames} from '../../prop-defs/echart-styles/echarts-xaxis-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {EChartsAxisSplitLineSettings, SettingsAxisSplitLinePropNames} from '../axis-split-line';

export const EChartsXAxisMinorSplitLineSettings = (props: { report: Report, chart: ECharts }) => {
	const {report, chart} = props;

	const {fire} = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_XAXIS_CHANGED, report);
	};

	const getHolder = () => chart.settings?.xaxis;
	const getSplitLine = () => getHolder()?.minorSplitLine;
	const propNames: SettingsAxisSplitLinePropNames = {
		show: EChartsXAxisPropNames.MINOR_SPLIT_LINE_SHOW,
		color: EChartsXAxisPropNames.MINOR_SPLIT_LINE_COLOR,
		width: EChartsXAxisPropNames.MINOR_SPLIT_LINE_WIDTH,
		style: EChartsXAxisPropNames.MINOR_SPLIT_LINE_STYLE
	};

	return <EChartsAxisSplitLineSettings report={report} chart={chart}
	                                     getHolder={getHolder} getSplitLine={getSplitLine}
	                                     title={Lang.CHART.SECTION_TITLE_ECHART_XAXIS_MINOR_LINE}
	                                     defaultShow={false}
	                                     propNames={propNames}
	                                     onValueChange={onValueChange}/>;
};