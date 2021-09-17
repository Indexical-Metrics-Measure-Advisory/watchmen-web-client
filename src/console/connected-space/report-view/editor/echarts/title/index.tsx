import {canHoldTitle, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {Report} from '@/services/data/tuples/report-types';
import React from 'react';
import {useChartType} from '../../settings-effect/use-chart-type';
import {EChartsTitleTextSettings} from './text';

export const EChartsTitleSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	useChartType({report});

	if (!isEChart(chart) || !canHoldTitle(chart)) {
		return null;
	}

	return <EChartsTitleTextSettings report={report} chart={chart}/>;
};