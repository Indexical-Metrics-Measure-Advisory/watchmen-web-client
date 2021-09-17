import {isCountChart} from '@/services/data/tuples/chart-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onBooleanChange} from '../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../dataset-and-palette/widget';
import {FontSettings, SettingsFontPropNames} from '../echarts/font';
import {CountChartStylePropNames} from '../prop-defs/chart-styles/count-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {BooleanValue} from '../settings-widgets/boolean-value';

export const ChartCountSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isCountChart(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.CHART_COUNT_STYLE_CHANGED, report);
	};

	const getHolder = () => chart.settings?.countText;
	const propNames: SettingsFontPropNames = {
		family: CountChartStylePropNames.TEXT_FONT_FAMILY,
		color: CountChartStylePropNames.TEXT_FONT_COLOR,
		weight: CountChartStylePropNames.TEXT_FONT_WEIGHT,
		size: CountChartStylePropNames.TEXT_FONT_SIZE,
		style: CountChartStylePropNames.TEXT_FONT_STYLE
	};

	return <TabBodySection>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_BASIC}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BooleanValue label={Lang.CHART.COUNT.FORMAT_USING_GROUP}
			              value={chart.settings?.countText?.formatUseGrouping} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: CountChartStylePropNames.TEXT_FORMAT_USE_GROUPING,
				              done: onValueChange
			              })}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_FONT}</TabBodySectionTitle>
		<TabBodySectionBody>
			<FontSettings report={report} chart={chart} getHolder={getHolder} propNames={propNames}
			              onValueChange={onValueChange}/>
		</TabBodySectionBody>
	</TabBodySection>;
};