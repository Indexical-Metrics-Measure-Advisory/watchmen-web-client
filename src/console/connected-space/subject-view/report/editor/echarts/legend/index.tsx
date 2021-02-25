import React from 'react';
import { canHoldLegend } from '../../../../../../../services/tuples/echarts/echarts-utils';
import { Report } from '../../../../../../../services/tuples/report-types';
import { useChartType } from '../../settings-effect/use-chart-type';

export const EChartsLegendSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	useChartType({ report });

	if (!canHoldLegend(chart)) {
		return null;
	}

	return <>
	</>;
};