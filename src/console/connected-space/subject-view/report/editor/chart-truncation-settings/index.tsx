import React from 'react';
import {Lang} from '../../../../../../langs';
import {
    isBarChart,
    isDoughnutChart,
    isLineChart,
    isNightingaleChart,
    isPieChart,
    isSunburstChart
} from '../../../../../../services/tuples/chart-utils';
import {Report} from '../../../../../../services/tuples/report-types';
import {SettingsTruncationPropNames, TruncationSettings} from '../echarts/truncation';
import {TruncationChartStylePropNames} from '../prop-defs/chart-styles/truncation-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {Section} from '../settings-widgets/section';

export const ChartTruncationSettings = (props: { report: Report }) => {
    const {report} = props;
    const {chart} = report;

    const {fire} = useReportEditEventBus();
    useChartType({report});

    if (!isBarChart(chart)
        && !isLineChart(chart)
        && !isPieChart(chart)
        && !isDoughnutChart(chart)
        && !isNightingaleChart(chart)
        && !isSunburstChart(chart)) {
        return null;
    }

    const settings = chart.settings;
    const getTruncationHolder = () => settings?.truncation;
    const propNames = {
        truncation: {
            type: TruncationChartStylePropNames.TRUNCATION_TYPE,
            count: TruncationChartStylePropNames.TRUNCATION_COUNT
        } as SettingsTruncationPropNames
    };

    const onValueChange = () => {
        fire(ReportEditEventTypes.CHART_PIE_STYLE_CHANGED, report);
    };

    return <>
        <Section title={Lang.CHART.SECTION_TITLE_TRUNCATION}>
            <TruncationSettings report={report} chart={chart}
                                getHolder={getTruncationHolder}
                                propNames={propNames.truncation}
                                onValueChange={onValueChange}/>
        </Section>
    </>;
};