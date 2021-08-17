import React from 'react';
import {Lang} from '../../../../../langs';
import {isTreeChart} from '../../../../../services/tuples/chart-utils';
import {Report} from '../../../../../services/tuples/report-types';
import {onBooleanChange, onDropdownValueChange} from '../data-utils';
import {PositionSettings, SettingsPositionPropNames} from '../echarts/position';
import {
	TreeChartStylePropNames,
	TreeLayoutOptions,
	TreeOrientOptions
} from '../prop-defs/chart-styles/tree-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {BooleanValue} from '../settings-widgets/boolean-value';
import {DropdownValue} from '../settings-widgets/dropdown-value';
import {Section} from '../settings-widgets/section';

export const ChartTreeSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isTreeChart(chart)) {
		return null;
	}

	const settings = chart.settings;
	const getGridHolder = () => settings?.grid;
	const propNames = {
		position: {
			top: TreeChartStylePropNames.POSITION_TOP,
			right: TreeChartStylePropNames.POSITION_RIGHT,
			left: TreeChartStylePropNames.POSITION_LEFT,
			bottom: TreeChartStylePropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames
	};

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, report);
	};
	const onGridChanged = () => {
		fire(ReportEditEventTypes.ECHART_GRID_CHANGED, report);
	};

	return <>
		<Section title={Lang.CHART.SECTION_TITLE_TREE_CHART}>
			<BooleanValue label={Lang.CHART.ROAM}
			              value={chart.settings?.series?.roam} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: TreeChartStylePropNames.ROAM,
				              done: onValueChange
			              })}/>
			<DropdownValue label={Lang.CHART.TREE_LAYOUT} options={TreeLayoutOptions}
			               value={chart.settings?.series?.layout}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: TreeChartStylePropNames.LAYOUT,
				               done: onValueChange
			               })}/>
			<DropdownValue label={Lang.CHART.TREE_ORIENT} options={TreeOrientOptions}
			               value={chart.settings?.series?.orient}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: TreeChartStylePropNames.ORIENT,
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