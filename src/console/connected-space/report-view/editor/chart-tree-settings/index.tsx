import {isTreeChart} from '@/services/data/tuples/chart-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onBooleanChange, onDropdownValueChange} from '../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../dataset-and-palette/widget';
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

export const ChartTreeSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isTreeChart(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_TREE_STYLE_CHANGED, report);
	};

	return <TabBodySection>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_BASIC}</TabBodySectionTitle>
		<TabBodySectionBody>
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
		</TabBodySectionBody>
	</TabBodySection>;
};