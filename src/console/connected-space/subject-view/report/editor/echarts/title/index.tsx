import React from 'react';
import { isEChart } from '../../../../../../../services/tuples/chart-utils';
import { Report } from '../../../../../../../services/tuples/report-types';
import { useChartType } from '../../settings-effect/use-chart-type';
import { EChartsTitleSubtextSettings } from './subtext';
import { EChartsTitleTextSettings } from './text';

export const EChartsTitleSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	useChartType({ report });

	if (!isEChart(chart)) {
		return null;
	}

	return <>
		<EChartsTitleTextSettings report={report} chart={chart}/>
		<EChartsTitleSubtextSettings report={report} chart={chart}/>
	</>;
};