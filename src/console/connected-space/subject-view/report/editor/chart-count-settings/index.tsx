import React from 'react';
import { Lang } from '../../../../../../langs';
import { isCountChart } from '../../../../../../services/tuples/chart-utils';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { BooleanValue } from '../settings-widgets/boolean-value';
import { Section } from '../settings-widgets/section';

export const ChartCountSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();

	if (!isCountChart(chart)) {
		return null;
	}

	const onBooleanChange = (value: boolean) => {
		if (!chart.settings) {
			chart.settings = {};
		}
		chart.settings.formatUseGrouping = value;
		fire(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, report);
	};

	return <Section title={Lang.CHART.SECTION_TITLE_COUNT_CHART}>
		<BooleanValue label={Lang.CHART.COUNT.FORMAT_USING_GROUP}
		              value={chart.settings?.formatUseGrouping} defaultValue={false}
		              onValueChange={onBooleanChange}/>
	</Section>;
};