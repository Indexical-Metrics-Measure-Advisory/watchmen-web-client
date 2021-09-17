import {isTreemapChart} from '@/services/data/tuples/chart-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onBooleanChange} from '../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../dataset-and-palette/widget';
import {TreemapChartStylePropNames} from '../prop-defs/chart-styles/treemap-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {BooleanValue} from '../settings-widgets/boolean-value';

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