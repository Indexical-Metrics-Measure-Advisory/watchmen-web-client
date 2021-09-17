import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {isANumberAndInRange, onBooleanChange, onColorChange, onNumberChange, validateNumber} from '../../data-utils';
import {TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {EChartsYAxisPropNames} from '../../prop-defs/echart-styles/echarts-yaxis-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {BooleanValue} from '../../settings-widgets/boolean-value';
import {ColorValue} from '../../settings-widgets/color-value';
import {NumberValue} from '../../settings-widgets/number-value';
import {AlignmentSettings, SettingsAlignmentPropNames} from '../alignment';
import {BorderSettings, SettingsBorderPropNames} from '../border';
import {FontSettings, SettingsFontPropNames} from '../font';

export const EChartsYAxisLabelSettings = (props: { report: Report, chart: ECharts }) => {
	const {report, chart} = props;

	const {fire} = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_YAXIS_CHANGED, report);
	};

	const yaxis = chart.settings?.yaxis;
	const label = yaxis?.label;
	const getNameHolder = () => label;
	const propNames = {
		font: {
			family: EChartsYAxisPropNames.LABEL_FONT_FAMILY,
			size: EChartsYAxisPropNames.LABEL_FONT_SIZE,
			weight: EChartsYAxisPropNames.LABEL_FONT_WEIGHT,
			color: EChartsYAxisPropNames.LABEL_FONT_COLOR,
			style: EChartsYAxisPropNames.LABEL_FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: EChartsYAxisPropNames.LABEL_BORDER_WIDTH,
			style: EChartsYAxisPropNames.LABEL_BORDER_STYLE,
			color: EChartsYAxisPropNames.LABEL_BORDER_COLOR,
			radius: EChartsYAxisPropNames.LABEL_BORDER_RADIUS
		} as SettingsBorderPropNames,
		alignment: {
			horizontalAlign: EChartsYAxisPropNames.LABEL_HORIZONTAL_ALIGN,
			verticalAlign: EChartsYAxisPropNames.LABEL_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
	};

	return <>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_LABEL}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BooleanValue label={Lang.CHART.SHOW}
			              value={label?.show} defaultValue={true}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsYAxisPropNames.LABEL_SHOW,
				              done: onValueChange
			              })}/>
			<BooleanValue label={Lang.CHART.AXIS_LABEL_INSIDE}
			              value={label?.inside} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsYAxisPropNames.LABEL_INSIDE,
				              done: onValueChange
			              })}/>
			<AlignmentSettings report={report} chart={chart}
			                   getHolder={getNameHolder}
			                   propNames={propNames.alignment}
			                   onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_LABEL_FONT}</TabBodySectionTitle>
		<TabBodySectionBody>
			<FontSettings report={report} chart={chart}
			              getHolder={getNameHolder}
			              propNames={propNames.font}
			              onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_LABEL_COLOR}</TabBodySectionTitle>
		<TabBodySectionBody>
			<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
			            value={label?.backgroundColor}
			            onValueChange={onColorChange({
				            report,
				            chart,
				            prop: EChartsYAxisPropNames.LABEL_BACKGROUND_COLOR,
				            done: onValueChange
			            })}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_LABEL_BORDER}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BorderSettings report={report} chart={chart}
			                getHolder={getNameHolder}
			                propNames={propNames.border}
			                onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_LABEL_GAP_AND_PADDING}</TabBodySectionTitle>
		<TabBodySectionBody>
			<NumberValue label={Lang.CHART.AXIS_NAME_GAP} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
			             value={label?.gap} defaultValue={0}
			             validate={validateNumber(3)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsYAxisPropNames.LABEL_GAP,
				             done: onValueChange
			             })}/>
			<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
			             value={label?.padding} defaultValue={0}
			             validate={validateNumber(4)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsYAxisPropNames.LABEL_PADDING,
				             done: onValueChange
			             })}/>
			<NumberValue label={Lang.CHART.AXIS_NAME_ROTATE} unitLabel={Lang.CHART.DEGREE} placeholder={'-90 - 90'}
			             value={label?.rotate}
			             validate={isANumberAndInRange(-90, 90)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsYAxisPropNames.LABEL_ROTATE,
				             done: onValueChange
			             })}/>
		</TabBodySectionBody>
	</>;
};