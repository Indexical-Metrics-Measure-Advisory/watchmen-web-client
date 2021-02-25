import React from 'react';
import { Lang } from '../../../../../../../langs';
import { EChart } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { EChartTitlePropNames, onTextValueChange } from '../../data-utils';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { Section } from '../../settings-widgets/section';
import { TextValue } from '../../settings-widgets/text-value';
import { FontSettings, SettingsFontPropNames } from '../font';

export const EChartsTitleSubtextSettings = (props: { report: Report, chart: EChart }) => {
	const { report, chart } = props;

	const { fire } = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_TITLE_CHANGED, report);
	};

	const text = chart.settings?.title?.subtext;
	const getHolder = () => text;
	const propNames = {
		font: {
			family: EChartTitlePropNames.SUBTEXT_FONT_FAMILY,
			size: EChartTitlePropNames.SUBTEXT_FONT_SIZE,
			weight: EChartTitlePropNames.SUBTEXT_FONT_WEIGHT,
			color: EChartTitlePropNames.SUBTEXT_FONT_COLOR,
			style: EChartTitlePropNames.SUBTEXT_FONT_STYLE
		} as SettingsFontPropNames
	};

	return <Section title={Lang.CHART.SECTION_TITLE_ECHART_SUBTITLE}>
		<TextValue label={Lang.CHART.ECHART.TEXT}
		           value={text?.text}
		           onValueChange={onTextValueChange({
			           report,
			           chart,
			           prop: EChartTitlePropNames.SUBTEXT,
			           done: onValueChange
		           })}/>
		<FontSettings report={report} chart={chart}
		              getHolder={getHolder}
		              propNames={propNames.font}
		              onValueChange={onValueChange}/>
	</Section>;
};