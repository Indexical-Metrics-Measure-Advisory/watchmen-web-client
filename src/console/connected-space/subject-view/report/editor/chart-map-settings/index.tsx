import React from 'react';
import {Lang} from '../../../../../../langs';
import {MapChartRegion} from '../../../../../../services/tuples/chart-def/chart-map';
import {isMapChart} from '../../../../../../services/tuples/chart-utils';
import {Report} from '../../../../../../services/tuples/report-types';
import {onDropdownValueChange} from '../data-utils';
import {PositionSettings, SettingsPositionPropNames} from '../echarts/position';
import {MapChartStylePropNames, MapRegionOptions} from '../prop-defs/chart-styles/map-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {DropdownValue} from '../settings-widgets/dropdown-value';
import {Section} from '../settings-widgets/section';

export const ChartMapSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isMapChart(chart)) {
		return null;
	}

	const settings = chart.settings;
	const getGridHolder = () => settings?.grid;
	const propNames = {
		position: {
			top: MapChartStylePropNames.POSITION_TOP,
			right: MapChartStylePropNames.POSITION_RIGHT,
			left: MapChartStylePropNames.POSITION_LEFT,
			bottom: MapChartStylePropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames
	};

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_MAP_STYLE_CHANGED, report);
	};
	const onGridChanged = () => {
		fire(ReportEditEventTypes.ECHART_GRID_CHANGED, report);
	};

	return <>
		<Section title={Lang.CHART.SECTION_TITLE_MAP_CHART}>
			<DropdownValue label={Lang.CHART.MAP_REGION}
			               value={chart.settings?.series?.region} defaultValue={MapChartRegion.JAPAN_L1}
			               options={MapRegionOptions}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: MapChartStylePropNames.REGION,
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