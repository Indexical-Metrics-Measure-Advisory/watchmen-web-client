import React from 'react';
import { Lang } from '../../../../../../../langs';
import { ECharts } from '../../../../../../../services/tuples/echarts/echarts-types';
import { EChartsXAxisNameLocation } from '../../../../../../../services/tuples/echarts/echarts-xaxis-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	isANumberAndInRange,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	onTextValueChange,
	validateNumber
} from '../../data-utils';
import { EChartsXAxisPropNames, XAxisNameLocationOptions } from '../../prop-defs/echart-styles/echarts-xaxis-props';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { ColorValue } from '../../settings-widgets/color-value';
import { DropdownValue } from '../../settings-widgets/dropdown-value';
import { NumberValue } from '../../settings-widgets/number-value';
import { Section } from '../../settings-widgets/section';
import { TextValue } from '../../settings-widgets/text-value';
import { AlignmentSettings, SettingsAlignmentPropNames } from '../alignment';
import { BorderSettings, SettingsBorderPropNames } from '../border';
import { FontSettings, SettingsFontPropNames } from '../font';

export const EChartsXAxisNameSettings = (props: { report: Report, chart: ECharts }) => {
	const { report, chart } = props;

	const { fire } = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_XAXIS_CHANGED, report);
	};

	const xaxis = chart.settings?.xaxis;
	const name = xaxis?.name;
	const getNameHolder = () => name;
	const propNames = {
		font: {
			family: EChartsXAxisPropNames.NAME_FONT_FAMILY,
			size: EChartsXAxisPropNames.NAME_FONT_SIZE,
			weight: EChartsXAxisPropNames.NAME_FONT_WEIGHT,
			color: EChartsXAxisPropNames.NAME_FONT_COLOR,
			style: EChartsXAxisPropNames.NAME_FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: EChartsXAxisPropNames.NAME_BORDER_WIDTH,
			style: EChartsXAxisPropNames.NAME_BORDER_STYLE,
			color: EChartsXAxisPropNames.NAME_BORDER_COLOR,
			radius: EChartsXAxisPropNames.NAME_BORDER_RADIUS
		} as SettingsBorderPropNames,
		alignment: {
			align: EChartsXAxisPropNames.NAME_HORIZONTAL_ALIGN,
			verticalAlign: EChartsXAxisPropNames.NAME_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
	};

	return <Section title={Lang.CHART.SECTION_TITLE_ECHART_XAXIS_NAME}>
		<TextValue label={Lang.CHART.ECHART.TEXT}
		           value={name?.text}
		           onValueChange={onTextValueChange({
			           report,
			           chart,
			           prop: EChartsXAxisPropNames.NAME_TEXT,
			           done: onValueChange
		           })}/>
		<DropdownValue label={Lang.CHART.AXIS_NAME_LOCATION}
		               value={name?.location} defaultValue={EChartsXAxisNameLocation.END}
		               options={XAxisNameLocationOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: EChartsXAxisPropNames.NAME_LOCATION,
			               done: onValueChange
		               })}/>
		<FontSettings report={report} chart={chart}
		              getHolder={getNameHolder}
		              propNames={propNames.font}
		              onValueChange={onValueChange}/>
		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={name?.backgroundColor}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: EChartsXAxisPropNames.NAME_BACKGROUND_COLOR,
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
		             value={name?.gap} defaultValue={0}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartsXAxisPropNames.NAME_GAP,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.AXIS_NAME_ROTATE} unitLabel={Lang.CHART.DEGREE} placeholder={'-180 - 180'}
		             value={name?.rotate}
		             validate={isANumberAndInRange(-180, 180)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartsXAxisPropNames.NAME_ROTATE,
			             done: onValueChange
		             })}/>
		<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
		             value={name?.padding} defaultValue={0}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: EChartsXAxisPropNames.NAME_PADDING,
			             done: onValueChange
		             })}/>
	</Section>;
};