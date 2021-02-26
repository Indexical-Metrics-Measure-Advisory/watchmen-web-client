import React from 'react';
import { Lang } from '../../../../../../../langs';
import { ECharts } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	EChartYAxisPropNames,
	isANumberAndInRange,
	onBooleanChange,
	onColorChange,
	onNumberChange,
	validateNumber
} from '../../data-utils';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { BooleanValue } from '../../settings-widgets/boolean-value';
import { ColorValue } from '../../settings-widgets/color-value';
import { NumberValue } from '../../settings-widgets/number-value';
import { Section } from '../../settings-widgets/section';
import { AlignmentSettings, SettingsAlignmentPropNames } from '../alignment';
import { BorderSettings, SettingsBorderPropNames } from '../border';
import { FontSettings, SettingsFontPropNames } from '../font';

export const EChartsYAxisLabelSettings = (props: { report: Report, chart: ECharts }) => {
	const { report, chart } = props;

	const { fire } = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_YAXIS_CHANGED, report);
	};

	const yaxis = chart.settings?.yaxis;
	const label = yaxis?.label;
	const getNameHolder = () => label;
	const propNames = {
		font: {
			family: EChartYAxisPropNames.LABEL_FONT_FAMILY,
			size: EChartYAxisPropNames.LABEL_FONT_SIZE,
			weight: EChartYAxisPropNames.LABEL_FONT_WEIGHT,
			color: EChartYAxisPropNames.LABEL_FONT_COLOR,
			style: EChartYAxisPropNames.LABEL_FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: EChartYAxisPropNames.LABEL_BORDER_WIDTH,
			style: EChartYAxisPropNames.LABEL_BORDER_STYLE,
			color: EChartYAxisPropNames.LABEL_BORDER_COLOR,
			radius: EChartYAxisPropNames.LABEL_BORDER_RADIUS
		} as SettingsBorderPropNames,
		alignment: {
			align: EChartYAxisPropNames.LABEL_HORIZONTAL_ALIGN,
			verticalAlign: EChartYAxisPropNames.LABEL_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
	};

	return <Section title={Lang.CHART.SECTION_TITLE_ECHART_YAXIS_LABEL}>
		<BooleanValue label={Lang.CHART.SHOW}
		              value={label?.show} defaultValue={true}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: EChartYAxisPropNames.LABEL_SHOW,
			              done: onValueChange
		              })}/>
		<BooleanValue label={Lang.CHART.AXIS_LABEL_INSIDE}
		              value={label?.inside} defaultValue={false}
		              onValueChange={onBooleanChange({
			              report,
			              chart,
			              prop: EChartYAxisPropNames.LABEL_INSIDE,
			              done: onValueChange
		              })}/>
		<FontSettings report={report} chart={chart}
		              getHolder={getNameHolder}
		              propNames={propNames.font}
		              onValueChange={onValueChange}/>
		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={label?.backgroundColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: EChartYAxisPropNames.LABEL_BACKGROUND_COLOR,
			            done: onValueChange
		            })}/>
		<AlignmentSettings report={report} chart={chart}
		                   getHolder={getNameHolder}
		                   propNames={propNames.alignment}
		                   onValueChange={onValueChange}/>
		<BorderSettings report={report} chart={chart}
		                getHolder={getNameHolder}
		                propNames={propNames.border}
		                onValueChange={onValueChange}/>
		<NumberValue label={Lang.CHART.AXIS_NAME_GAP} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
		             value={label?.gap} defaultValue={0}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartYAxisPropNames.LABEL_GAP,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.AXIS_NAME_ROTATE} unitLabel={Lang.CHART.DEGREE} placeholder={'-90 - 90'}
		             value={label?.rotate}
		             validate={isANumberAndInRange(-90, 90)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartYAxisPropNames.LABEL_ROTATE,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={label?.padding} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartYAxisPropNames.LABEL_PADDING,
			             done: onValueChange
		             })}/>
	</Section>;
};