import React from 'react';
import { Lang } from '../../../../../../langs';
import { isPieChart } from '../../../../../../services/tuples/chart-utils';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { Section } from '../settings-widgets/section';

export const ChartPieSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();

	if (!isPieChart(chart)) {
		return null;
	}


	return <Section title={Lang.CHART.SECTION_TITLE_PIE_CHART}>
	</Section>;
};