import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {EChartsYAxisNameLocation} from '@/services/data/tuples/echarts/echarts-yaxis-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {
	isANumberAndInRange,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	onTextValueChange,
	validateNumber
} from '../../data-utils';
import {TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {EChartsYAxisPropNames, YAxisNameLocationOptions} from '../../prop-defs/echart-styles/echarts-yaxis-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {ColorValue} from '../../settings-widgets/color-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';
import {TextValue} from '../../settings-widgets/text-value';
import {AlignmentSettings, SettingsAlignmentPropNames} from '../alignment';
import {BorderSettings, SettingsBorderPropNames} from '../border';
import {FontSettings, SettingsFontPropNames} from '../font';

export const EChartsYAxisNameSettings = (props: { report: Report, chart: ECharts }) => {
	const {report, chart} = props;

	const {fire} = useReportEditEventBus();

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_YAXIS_CHANGED, report);
	};

	const yaxis = chart.settings?.yaxis;
	const name = yaxis?.name;
	const getNameHolder = () => name;
	const propNames = {
		font: {
			family: EChartsYAxisPropNames.NAME_FONT_FAMILY,
			size: EChartsYAxisPropNames.NAME_FONT_SIZE,
			weight: EChartsYAxisPropNames.NAME_FONT_WEIGHT,
			color: EChartsYAxisPropNames.NAME_FONT_COLOR,
			style: EChartsYAxisPropNames.NAME_FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: EChartsYAxisPropNames.NAME_BORDER_WIDTH,
			style: EChartsYAxisPropNames.NAME_BORDER_STYLE,
			color: EChartsYAxisPropNames.NAME_BORDER_COLOR,
			radius: EChartsYAxisPropNames.NAME_BORDER_RADIUS
		} as SettingsBorderPropNames,
		alignment: {
			horizontalAlign: EChartsYAxisPropNames.NAME_HORIZONTAL_ALIGN,
			verticalAlign: EChartsYAxisPropNames.NAME_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
	};

	return <>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_NAME}</TabBodySectionTitle>
		<TabBodySectionBody>
			<TextValue label={Lang.CHART.ECHART.TEXT}
			           value={name?.text}
			           onValueChange={onTextValueChange({
				           report,
				           chart,
				           prop: EChartsYAxisPropNames.NAME_TEXT,
				           done: onValueChange
			           })}/>
			<DropdownValue label={Lang.CHART.AXIS_NAME_LOCATION}
			               value={name?.location} defaultValue={EChartsYAxisNameLocation.END}
			               options={YAxisNameLocationOptions}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: EChartsYAxisPropNames.NAME_LOCATION,
				               done: onValueChange
			               })}/>
			<AlignmentSettings report={report} chart={chart}
			                   getHolder={getNameHolder}
			                   propNames={propNames.alignment}
			                   onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_NAME_FONT}</TabBodySectionTitle>
		<TabBodySectionBody>
			<FontSettings report={report} chart={chart}
			              getHolder={getNameHolder}
			              propNames={propNames.font}
			              onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_NAME_COLOR}</TabBodySectionTitle>
		<TabBodySectionBody>
			<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
			            value={name?.backgroundColor}
			            onValueChange={onColorChange({
				            report,
				            chart,
				            prop: EChartsYAxisPropNames.NAME_BACKGROUND_COLOR,
				            done: onValueChange
			            })}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_NAME_BORDER}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BorderSettings report={report} chart={chart}
			                getHolder={getNameHolder}
			                propNames={propNames.border}
			                onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_NAME_GAP_AND_PADDING}</TabBodySectionTitle>
		<TabBodySectionBody>
			<NumberValue label={Lang.CHART.AXIS_NAME_GAP} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
			             value={name?.gap} defaultValue={0}
			             validate={validateNumber(3)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsYAxisPropNames.NAME_GAP,
				             done: onValueChange
			             })}/>
			<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
			             value={name?.padding} defaultValue={0}
			             validate={validateNumber(4)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsYAxisPropNames.NAME_PADDING,
				             done: onValueChange
			             })}/>
			<NumberValue label={Lang.CHART.AXIS_NAME_ROTATE} unitLabel={Lang.CHART.DEGREE}
			             placeholder={'-180 - 180'}
			             value={name?.rotate}
			             validate={isANumberAndInRange(-180, 180)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsYAxisPropNames.NAME_ROTATE,
				             done: onValueChange
			             })}/>
		</TabBodySectionBody>
	</>;
};