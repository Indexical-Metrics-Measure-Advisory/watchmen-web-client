import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {isANumberAndInRange, onBooleanChange, onColorChange, onNumberChange, validateNumber} from '../../data-utils';
import {TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {EChartsXAxisPropNames} from '../../prop-defs/echart-styles/echarts-xaxis-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {BooleanValue} from '../../settings-widgets/boolean-value';
import {ColorValue} from '../../settings-widgets/color-value';
import {NumberValue} from '../../settings-widgets/number-value';
import {AlignmentSettings, SettingsAlignmentPropNames} from '../alignment';
import {BorderSettings, SettingsBorderPropNames} from '../border';
import {FontSettings, SettingsFontPropNames} from '../font';

export const EChartsXAxisLabelSettings = (props: { report: Report, chart: ECharts }) => {
	const {report, chart} = props;

	const {fire} = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_XAXIS_CHANGED, report);
	};

	const xaxis = chart.settings?.xaxis;
	const label = xaxis?.label;
	const getNameHolder = () => label;
	const propNames = {
		font: {
			family: EChartsXAxisPropNames.LABEL_FONT_FAMILY,
			size: EChartsXAxisPropNames.LABEL_FONT_SIZE,
			weight: EChartsXAxisPropNames.LABEL_FONT_WEIGHT,
			color: EChartsXAxisPropNames.LABEL_FONT_COLOR,
			style: EChartsXAxisPropNames.LABEL_FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: EChartsXAxisPropNames.LABEL_BORDER_WIDTH,
			style: EChartsXAxisPropNames.LABEL_BORDER_STYLE,
			color: EChartsXAxisPropNames.LABEL_BORDER_COLOR,
			radius: EChartsXAxisPropNames.LABEL_BORDER_RADIUS
		} as SettingsBorderPropNames,
		alignment: {
			horizontalAlign: EChartsXAxisPropNames.LABEL_HORIZONTAL_ALIGN,
			verticalAlign: EChartsXAxisPropNames.LABEL_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
	};

	return <>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_LABEL}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BooleanValue label={Lang.CHART.SHOW}
			              value={label?.show} defaultValue={true}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsXAxisPropNames.LABEL_SHOW,
				              done: onValueChange
			              })}/>
			<BooleanValue label={Lang.CHART.AXIS_LABEL_INSIDE}
			              value={label?.inside} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsXAxisPropNames.LABEL_INSIDE,
				              done: onValueChange
			              })}/>
			<AlignmentSettings report={report} chart={chart}
			                   getHolder={getNameHolder}
			                   propNames={propNames.alignment}
			                   onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_LABEL_FONT}</TabBodySectionTitle>
		<TabBodySectionBody>
			<FontSettings report={report} chart={chart}
			              getHolder={getNameHolder}
			              propNames={propNames.font}
			              onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_LABEL_COLOR}</TabBodySectionTitle>
		<TabBodySectionBody>
			<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
			            value={label?.backgroundColor}
			            onValueChange={onColorChange({
				            report,
				            chart,
				            prop: EChartsXAxisPropNames.LABEL_BACKGROUND_COLOR,
				            done: onValueChange
			            })}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_LABEL_BORDER}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BorderSettings report={report} chart={chart}
			                getHolder={getNameHolder}
			                propNames={propNames.border}
			                onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_LABEL_GAP_AND_PADDING}</TabBodySectionTitle>
		<TabBodySectionBody>
			<NumberValue label={Lang.CHART.AXIS_NAME_GAP} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
			             value={label?.gap} defaultValue={0}
			             validate={validateNumber(3)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsXAxisPropNames.LABEL_GAP,
				             done: onValueChange
			             })}/>
			<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
			             value={label?.padding} defaultValue={0}
			             validate={validateNumber(4)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsXAxisPropNames.LABEL_PADDING,
				             done: onValueChange
			             })}/>
			<NumberValue label={Lang.CHART.AXIS_NAME_ROTATE} unitLabel={Lang.CHART.DEGREE} placeholder={'-90 - 90'}
			             value={label?.rotate}
			             validate={isANumberAndInRange(-90, 90)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsXAxisPropNames.LABEL_ROTATE,
				             done: onValueChange
			             })}/>
		</TabBodySectionBody>
	</>;
};