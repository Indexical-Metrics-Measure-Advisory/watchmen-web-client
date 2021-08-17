import React from 'react';
import {Lang} from '../../../../../langs';
import {isTreemapChart} from '../../../../../services/tuples/chart-utils';
import {Report} from '../../../../../services/tuples/report-types';
import {onBooleanChange} from '../data-utils';
import {PositionSettings, SettingsPositionPropNames} from '../echarts/position';
import {TreemapChartStylePropNames} from '../prop-defs/chart-styles/treemap-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {BooleanValue} from '../settings-widgets/boolean-value';
import {Section} from '../settings-widgets/section';

export const ChartTreemapSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isTreemapChart(chart)) {
		return null;
	}

	const settings = chart.settings;
	const getGridHolder = () => settings?.grid;
	const propNames = {
		position: {
			top: TreemapChartStylePropNames.POSITION_TOP,
			right: TreemapChartStylePropNames.POSITION_RIGHT,
			left: TreemapChartStylePropNames.POSITION_LEFT,
			bottom: TreemapChartStylePropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames
	};

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, report);
	};
	const onGridChanged = () => {
		fire(ReportEditEventTypes.ECHART_GRID_CHANGED, report);
	};

	return <>
		<Section title={Lang.CHART.SECTION_TITLE_TREEMAP_CHART}>
			<BooleanValue label={Lang.CHART.ROAM}
			              value={chart.settings?.series?.roam} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: TreemapChartStylePropNames.ROAM,
				              done: onValueChange
			              })}/>
		</Section>
		<Section title={Lang.CHART.SECTION_TITLE_ECHART_GRID}>
			<PositionSettings report={report} chart={chart}
			                  getHolder={getGridHolder}
			                  propNames={propNames.position}
			                  onValueChange={onGridChanged}/>
		</Section>
	</>;
};