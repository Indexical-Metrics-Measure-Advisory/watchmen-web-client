import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {EChartsXAxisNameLocation} from '@/services/data/tuples/echarts/echarts-xaxis-types';
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
import {EChartsXAxisPropNames, XAxisNameLocationOptions} from '../../prop-defs/echart-styles/echarts-xaxis-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {ColorValue} from '../../settings-widgets/color-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';
import {TextValue} from '../../settings-widgets/text-value';
import {AlignmentSettings, SettingsAlignmentPropNames} from '../alignment';
import {BorderSettings, SettingsBorderPropNames} from '../border';
import {FontSettings, SettingsFontPropNames} from '../font';

export const EChartsXAxisNameSettings = (props: { report: Report, chart: ECharts }) => {
	const {report, chart} = props;

	const {fire} = useReportEditEventBus();

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
			horizontalAlign: EChartsXAxisPropNames.NAME_HORIZONTAL_ALIGN,
			verticalAlign: EChartsXAxisPropNames.NAME_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
	};

	return <>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_NAME}</TabBodySectionTitle>
		<TabBodySectionBody>
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
			<AlignmentSettings report={report} chart={chart}
			                   getHolder={getNameHolder}
			                   propNames={propNames.alignment}
			                   onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_NAME_FONT}</TabBodySectionTitle>
		<TabBodySectionBody>
			<FontSettings report={report} chart={chart}
			              getHolder={getNameHolder}
			              propNames={propNames.font}
			              onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_NAME_COLOR}</TabBodySectionTitle>
		<TabBodySectionBody>
			<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
			            value={name?.backgroundColor}
			            onValueChange={onColorChange({
				            report,
				            chart,
				            prop: EChartsXAxisPropNames.NAME_BACKGROUND_COLOR,
				            done: onValueChange
			            })}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_NAME_BORDER}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BorderSettings report={report} chart={chart}
			                getHolder={getNameHolder}
			                propNames={propNames.border}
			                onValueChange={onValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_NAME_GAP_AND_PADDING}</TabBodySectionTitle>
		<TabBodySectionBody>
			<NumberValue label={Lang.CHART.AXIS_NAME_GAP} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
			             value={name?.gap} defaultValue={0}
			             validate={validateNumber(3)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsXAxisPropNames.NAME_GAP,
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
			<NumberValue label={Lang.CHART.AXIS_NAME_ROTATE} unitLabel={Lang.CHART.DEGREE} placeholder={'-180 - 180'}
			             value={name?.rotate}
			             validate={isANumberAndInRange(-180, 180)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsXAxisPropNames.NAME_ROTATE,
				             done: onValueChange
			             })}/>
		</TabBodySectionBody>
	</>;
};