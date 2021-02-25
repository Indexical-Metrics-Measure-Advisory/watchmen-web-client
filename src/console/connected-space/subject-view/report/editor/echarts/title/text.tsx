import React from 'react';
import { Lang } from '../../../../../../../langs';
import { EChart } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	EChartTitlePropNames,
	onColorChange,
	onNumberChange,
	onTextValueChange,
	validateNumber
} from '../../data-utils';
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

export const EChartsTitleTextSettings = (props: { report: Report, chart: EChart }) => {
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
		} as SettingsPositionPropNames,
		alignment: {
			align: EChartTitlePropNames.TEXT_ALIGN,
			verticalAlign: EChartTitlePropNames.TEXT_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
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
		            value={title?.backgroundColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: EChartTitlePropNames.TEXT_BACKGROUND_COLOR,
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
			             prop: EChartTitlePropNames.ITEM_GAP,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={title?.padding} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartTitlePropNames.PADDING,
			             done: onValueChange
		             })}/>
	</Section>;
};