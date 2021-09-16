import React from 'react';
import {Lang} from '@/langs';
import {isTreemapChart} from '@/services/tuples/chart-utils';
import {Report} from '@/services/tuples/report-types';
import {onBooleanChange} from '../data-utils';
import {TreemapChartStylePropNames} from '../prop-defs/chart-styles/treemap-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {BooleanValue} from '../settings-widgets/boolean-value';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../dataset-and-palette/widget';

export const ChartTreemapSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isTreemapChart(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_TREEMAP_STYLE_CHANGED, report);
	};

	return <TabBodySection>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_BASIC}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BooleanValue label={Lang.CHART.ROAM}
			              value={chart.settings?.series?.roam} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: TreemapChartStylePropNames.ROAM,
				              done: onValueChange
			              })}/>
		</TabBodySectionBody>
	</TabBodySection>;
};