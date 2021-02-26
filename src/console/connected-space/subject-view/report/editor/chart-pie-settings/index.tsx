import React from 'react';
import { Lang } from '../../../../../../langs';
import { PieRoseType } from '../../../../../../services/tuples/chart-def/chart-pie';
import { isPieChart } from '../../../../../../services/tuples/chart-utils';
import { Report } from '../../../../../../services/tuples/report-types';
import { BorderSettings, SettingsBorderPropNames } from '../echarts/border';
import { PieSettings, SettingsPiePropNames } from '../echarts/pie';
import { PositionSettings, SettingsPositionPropNames } from '../echarts/position';
import { PieChartStylePropNames } from '../prop-defs/chart-styles/pie-chart-style-props';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { useChartType } from '../settings-effect/use-chart-type';
import { Section } from '../settings-widgets/section';

export const ChartPieSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();
	useChartType({ report });

	if (!isPieChart(chart)) {
		return null;
	}

	const settings = chart.settings;
	const getSeriesHolder = () => settings?.series;
	const getGridHolder = () => settings?.grid;
	const propNames = {
		series: {
			centerX: PieChartStylePropNames.CENTER_X,
			centerY: PieChartStylePropNames.CENTER_Y,
			insideRadius: PieChartStylePropNames.INSIDE_RADIUS,
			outsideRadius: PieChartStylePropNames.OUTSIDE_RADIUS,
			roseType: PieChartStylePropNames.ROSE_TYPE
		} as SettingsPiePropNames,
		position: {
			top: PieChartStylePropNames.POSITION_TOP,
			right: PieChartStylePropNames.POSITION_RIGHT,
			left: PieChartStylePropNames.POSITION_LEFT,
			bottom: PieChartStylePropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames,
		border: {
			width: PieChartStylePropNames.BORDER_WIDTH,
			style: PieChartStylePropNames.BORDER_STYLE,
			color: PieChartStylePropNames.BORDER_COLOR,
			radius: PieChartStylePropNames.BORDER_RADIUS
		} as SettingsBorderPropNames
	};

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, report);
	};
	const onGridChanged = () => {
		fire(ReportEditEventTypes.ECHART_GRID_CHANGED, report);
	};

	return <>
		<Section title={Lang.CHART.SECTION_TITLE_PIE_CHART}>
			<PieSettings report={report} chart={chart}
			             getHolder={getSeriesHolder}
			             propNames={propNames.series}
			             defaultRoseType={PieRoseType.NONE}
			             onValueChange={onValueChange}/>
			<BorderSettings report={report} chart={chart}
			                getHolder={getSeriesHolder}
			                propNames={propNames.border}
			                onValueChange={onValueChange}/>
		</Section>
		<Section title={Lang.CHART.SECTION_TITLE_ECHART_GRID}>
			<PositionSettings report={report} chart={chart}
			                  getHolder={getGridHolder}
			                  propNames={propNames.position}
			                  onValueChange={onGridChanged}/>
		</Section>
	</>;
};