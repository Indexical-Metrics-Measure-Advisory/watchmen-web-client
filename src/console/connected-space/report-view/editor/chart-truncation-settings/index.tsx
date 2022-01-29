import {ChartTruncationHolder} from '@/services/data/tuples/chart-def/truncation';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import {ChartHelper} from '@/widgets/report/chart-utils';
import React from 'react';
import {SettingsTruncationPropNames, TruncationSettings} from '../echarts/truncation';
import {TruncationChartStylePropNames} from '../prop-defs/chart-styles/truncation-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {Section} from '../settings-widgets/section';

export const ChartTruncationSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;
	const {chart: {type}} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	/** defend */
	const chartUtils = ChartHelper[type];

	if (!chartUtils.shouldHasDimension()) {
		return null;
	}

	const settings = chart.settings as ChartTruncationHolder;
	const getTruncationHolder = () => settings?.truncation;
	const propNames = {
		truncation: {
			type: TruncationChartStylePropNames.TRUNCATION_TYPE,
			count: TruncationChartStylePropNames.TRUNCATION_COUNT
		} as SettingsTruncationPropNames
	};

	const onValueChange = () => {
		fire(ReportEditEventTypes.TRUNCATE_CHANGED, report);
	};

	return <Section title={Lang.CHART.SECTION_TITLE_TRUNCATION} defaultExpanded={true}>
		<TruncationSettings report={report} chart={chart}
		                    getHolder={getTruncationHolder}
		                    propNames={propNames.truncation}
		                    onValueChange={onValueChange}/>
	</Section>;
};