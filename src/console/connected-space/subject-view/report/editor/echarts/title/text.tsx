import React from 'react';
import { Lang } from '../../../../../../../langs';
import { ECharts } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	onColorChange,
	onNumberChange,
	onTextValueChange,
	validateNumber
} from '../../data-utils';
import { EChartsTitlePropNames } from '../../prop-defs/echart-styles/echarts-title-props';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { ColorValue } from '../../settings-widgets/color-value';
import { NumberValue } from '../../settings-widgets/number-value';
import { Section } from '../../settings-widgets/section';
import { TextValue } from '../../settings-widgets/text-value';
import { AlignmentSettings, SettingsAlignmentPropNames } from '../alignment';
import { BorderSettings, SettingsBorderPropNames } from '../border';
import { FontSettings, SettingsFontPropNames } from '../font';
import { PositionSettings, SettingsPositionPropNames } from '../position';
import { EChartsTitleSubtextSettings } from './subtext';

export const EChartsTitleTextSettings = (props: { report: Report, chart: ECharts }) => {
	const { report, chart } = props;

	const { fire } = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_TITLE_CHANGED, report);
	};

	const title = chart.settings?.title;
	const text = title?.text;
	const getTitleHolder = () => title;
	const getTextHolder = () => text;
	const propNames = {
		font: {
			family: EChartsTitlePropNames.TEXT_FONT_FAMILY,
			size: EChartsTitlePropNames.TEXT_FONT_SIZE,
			weight: EChartsTitlePropNames.TEXT_FONT_WEIGHT,
			color: EChartsTitlePropNames.TEXT_FONT_COLOR,
			style: EChartsTitlePropNames.TEXT_FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: EChartsTitlePropNames.TEXT_BORDER_WIDTH,
			style: EChartsTitlePropNames.TEXT_BORDER_STYLE,
			color: EChartsTitlePropNames.TEXT_BORDER_COLOR,
			radius: EChartsTitlePropNames.TEXT_BORDER_RADIUS
		} as SettingsBorderPropNames,
		position: {
			top: EChartsTitlePropNames.POSITION_TOP,
			right: EChartsTitlePropNames.POSITION_RIGHT,
			left: EChartsTitlePropNames.POSITION_LEFT,
			bottom: EChartsTitlePropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames,
		alignment: {
			align: EChartsTitlePropNames.TEXT_HORIZONTAL_ALIGN,
			verticalAlign: EChartsTitlePropNames.TEXT_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
	};

	return <Section title={Lang.CHART.SECTION_TITLE_ECHART_TITLE}>
		<TextValue label={Lang.CHART.ECHART.TEXT}
		           value={text?.text}
		           onValueChange={onTextValueChange({
			           report,
			           chart,
			           prop: EChartsTitlePropNames.TEXT,
			           done: onValueChange
		           })}/>
		<FontSettings report={report} chart={chart}
		              getHolder={getTextHolder}
		              propNames={propNames.font}
		              onValueChange={onValueChange}/>
		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={title?.backgroundColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: EChartsTitlePropNames.TEXT_BACKGROUND_COLOR,
			            done: onValueChange
		            })}/>
		<PositionSettings report={report} chart={chart}
		                  getHolder={getTitleHolder}
		                  propNames={propNames.position}
		                  onValueChange={onValueChange}/>
		<AlignmentSettings report={report} chart={chart}
		                   getHolder={getTitleHolder}
		                   propNames={propNames.alignment}
		                   onValueChange={onValueChange}/>
		<BorderSettings report={report} chart={chart}
		                getHolder={getTitleHolder}
		                propNames={propNames.border}
		                onValueChange={onValueChange}/>
		<NumberValue label={Lang.CHART.TITLE_TEXT_ITEM_GAP} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
		             value={title?.itemGap} defaultValue={0}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartsTitlePropNames.ITEM_GAP,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={title?.padding} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartsTitlePropNames.PADDING,
			             done: onValueChange
		             })}/>
		<EChartsTitleSubtextSettings report={report} chart={chart}/>
	</Section>;
};