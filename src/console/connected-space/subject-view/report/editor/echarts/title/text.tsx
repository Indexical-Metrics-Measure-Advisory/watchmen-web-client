import React from 'react';
import { Lang } from '../../../../../../../langs';
import { EChart } from '../../../../../../../services/tuples/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { EChartTitlePropNames, onColorChange, onTextValueChange } from '../../data-utils';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { ColorValue } from '../../settings-widgets/color-value';
import { Section } from '../../settings-widgets/section';
import { TextValue } from '../../settings-widgets/text-value';
import { BorderSettings, SettingsBorderPropNames } from '../border';
import { FontSettings, SettingsFontPropNames } from '../font';
import { PositionSettings, SettingsPositionPropNames } from '../position';

export const EChartsTitleTextSettings = (props: { report: Report, chart: EChart }) => {
	const { report, chart } = props;

	const { fire } = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_TITLE_CHANGED, report);
	};

	const text = chart.settings?.title?.text;
	const getTitleHolder = () => chart.settings?.title;
	const getTextHolder = () => text;
	const propNames = {
		font: {
			family: EChartTitlePropNames.TEXT_FONT_FAMILY,
			size: EChartTitlePropNames.TEXT_FONT_SIZE,
			weight: EChartTitlePropNames.TEXT_FONT_WEIGHT,
			color: EChartTitlePropNames.TEXT_FONT_COLOR,
			style: EChartTitlePropNames.TEXT_FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: EChartTitlePropNames.TEXT_BORDER_WIDTH,
			style: EChartTitlePropNames.TEXT_BORDER_STYLE,
			color: EChartTitlePropNames.TEXT_BORDER_COLOR,
			radius: EChartTitlePropNames.TEXT_BORDER_RADIUS
		} as SettingsBorderPropNames,
		position: {
			top: EChartTitlePropNames.POSITION_TOP,
			right: EChartTitlePropNames.POSITION_RIGHT,
			left: EChartTitlePropNames.POSITION_LEFT,
			bottom: EChartTitlePropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames
	};

	return <Section title={Lang.CHART.SECTION_TITLE_ECHART_TITLE}>
		<TextValue label={Lang.CHART.ECHART.TEXT}
		           value={text?.text}
		           onValueChange={onTextValueChange({
			           report,
			           chart,
			           prop: EChartTitlePropNames.TEXT,
			           done: onValueChange
		           })}/>
		<FontSettings report={report} chart={chart}
		              getHolder={getTextHolder}
		              propNames={propNames.font}
		              onValueChange={onValueChange}/>
		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={chart.settings?.title?.backgroundColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: EChartTitlePropNames.TEXT_BACKGROUND_COLOR,
			            done: onValueChange
		            })}/>
		<BorderSettings report={report} chart={chart}
		                getHolder={getTitleHolder}
		                propNames={propNames.border}
		                onValueChange={onValueChange}/>
		<PositionSettings report={report} chart={chart}
		                  getHolder={getTitleHolder}
		                  propNames={propNames.position}
		                  onValueChange={onValueChange}/>
	</Section>;
};