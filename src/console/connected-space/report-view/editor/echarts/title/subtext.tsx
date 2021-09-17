import {canHoldTitle, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onTextValueChange} from '../../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {EChartsTitlePropNames} from '../../prop-defs/echart-styles/echarts-title-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';
import {TextValue} from '../../settings-widgets/text-value';
import {FontSettings, SettingsFontPropNames} from '../font';

export const EChartsTitleSubtextSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isEChart(chart) || !canHoldTitle(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_TITLE_CHANGED, report);
	};

	const text = chart.settings?.title?.subtext;
	const getHolder = () => text;
	const propNames = {
		font: {
			family: EChartsTitlePropNames.SUBTEXT_FONT_FAMILY,
			size: EChartsTitlePropNames.SUBTEXT_FONT_SIZE,
			weight: EChartsTitlePropNames.SUBTEXT_FONT_WEIGHT,
			color: EChartsTitlePropNames.SUBTEXT_FONT_COLOR,
			style: EChartsTitlePropNames.SUBTEXT_FONT_STYLE
		} as SettingsFontPropNames
	};

	return <TabBodySection>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_TITLE}</TabBodySectionTitle>
		<TabBodySectionBody>
			<TextValue label={Lang.CHART.ECHART.TEXT}
			           value={text?.text}
			           onValueChange={onTextValueChange({
				           report,
				           chart,
				           prop: EChartsTitlePropNames.SUBTEXT,
				           done: onValueChange
			           })}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_FONT}</TabBodySectionTitle>
		<TabBodySectionBody>
			<FontSettings report={report} chart={chart}
			              getHolder={getHolder}
			              propNames={propNames.font}
			              onValueChange={onValueChange}/>
		</TabBodySectionBody>
	</TabBodySection>;
};