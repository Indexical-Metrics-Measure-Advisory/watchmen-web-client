import React from 'react';
import { Lang } from '../../../../../../langs';
import { isBarChart, isLineChart } from '../../../../../../services/tuples/chart-utils';
import { Report } from '../../../../../../services/tuples/report-types';
import { BarSettings, SettingsBarPropNames } from '../echarts/bar';
import { BarChartStylePropNames } from '../prop-defs/chart-styles/bar-chart-style-props';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { useChartType } from '../settings-effect/use-chart-type';
import { Section } from '../settings-widgets/section';

export const ChartBarSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();
	useChartType({ report });

	if (!isBarChart(chart) && !isLineChart(chart)) {
		return null;
	}

	const settings = chart.settings;
	const getSeriesHolder = () => settings?.series;
	const propNames = {
		series: {
			transformAxis: BarChartStylePropNames.TRANSFORM_AXIS
		} as SettingsBarPropNames
	};

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_BAR_STYLE_CHANGED, report);
	};

	return <>
		<Section title={Lang.CHART.SECTION_TITLE_BAR_CHART}>
			<BarSettings report={report} chart={chart}
			             getHolder={getSeriesHolder}
			             propNames={propNames.series}
			             onValueChange={onValueChange}/>
		</Section>
	</>;
};