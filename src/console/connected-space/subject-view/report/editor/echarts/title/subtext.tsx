import React from 'react';
import {Lang} from '../../../../../../../langs';
import {ECharts} from '../../../../../../../services/tuples/echarts/echarts-types';
import {Report} from '../../../../../../../services/tuples/report-types';
import {onTextValueChange} from '../../data-utils';
import {EChartsTitlePropNames} from '../../prop-defs/echart-styles/echarts-title-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {SecondarySection} from '../../settings-widgets/secondary-section';
import {TextValue} from '../../settings-widgets/text-value';
import {FontSettings, SettingsFontPropNames} from '../font';

export const EChartsTitleSubtextSettings = (props: { report: Report, chart: ECharts }) => {
	const {report, chart} = props;

	const {fire} = useReportEditEventBus();

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

	return <SecondarySection title={Lang.CHART.SECTION_TITLE_ECHART_SUBTITLE}>
		<TextValue label={Lang.CHART.ECHART.TEXT}
		           value={text?.text}
		           onValueChange={onTextValueChange({
			           report,
			           chart,
			           prop: EChartsTitlePropNames.SUBTEXT,
			           done: onValueChange
		           })}/>
		<FontSettings report={report} chart={chart}
		              getHolder={getHolder}
		              propNames={propNames.font}
		              onValueChange={onValueChange}/>
	</SecondarySection>;
};