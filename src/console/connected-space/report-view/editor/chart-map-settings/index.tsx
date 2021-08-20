import React from 'react';
import {Lang} from '../../../../../langs';
import {MapChartRegion} from '../../../../../services/tuples/chart-def/chart-map';
import {isMapChart} from '../../../../../services/tuples/chart-utils';
import {Report} from '../../../../../services/tuples/report-types';
import {onDropdownValueChange} from '../data-utils';
import {MapChartStylePropNames, MapRegionOptions} from '../prop-defs/chart-styles/map-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {DropdownValue} from '../settings-widgets/dropdown-value';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../dataset-and-palette/widget';

export const ChartMapSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isMapChart(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_MAP_STYLE_CHANGED, report);
	};

	return <TabBodySection>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_BASIC}</TabBodySectionTitle>
		<TabBodySectionBody>
			<DropdownValue label={Lang.CHART.MAP_REGION}
			               value={chart.settings?.series?.region} defaultValue={MapChartRegion.JAPAN_L1}
			               options={MapRegionOptions}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: MapChartStylePropNames.REGION,
				               done: onValueChange
			               })}/>
		</TabBodySectionBody>
	</TabBodySection>;
};