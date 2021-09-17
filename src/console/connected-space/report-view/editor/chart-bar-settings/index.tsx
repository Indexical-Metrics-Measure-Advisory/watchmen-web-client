import {BarLabelPosition} from '@/services/data/tuples/chart-def/chart-bar';
import {isBarChart, isLineChart} from '@/services/data/tuples/chart-utils';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {
	isANumberAndInRange,
	onBooleanChange,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	validateNumber
} from '../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../dataset-and-palette/widget';
import {AlignmentSettings, SettingsAlignmentPropNames} from '../echarts/alignment';
import {BarSettings, SettingsBarPropNames} from '../echarts/bar';
import {BorderSettings, SettingsBorderPropNames} from '../echarts/border';
import {FontSettings, SettingsFontPropNames} from '../echarts/font';
import {LineSettings, SettingsLinePropNames} from '../echarts/line';
import {BarChartStylePropNames, BarLabelPositionOptions} from '../prop-defs/chart-styles/bar-chart-style-props';
import {LineChartStylePropNames} from '../prop-defs/chart-styles/line-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {BooleanValue} from '../settings-widgets/boolean-value';
import {ColorValue} from '../settings-widgets/color-value';
import {DropdownValue} from '../settings-widgets/dropdown-value';
import {NumberValue} from '../settings-widgets/number-value';

export const ChartBarSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isBarChart(chart) && !isLineChart(chart)) {
		return null;
	}

	const settings = chart.settings;
	const label = settings?.label;
	const getSeriesHolder = () => settings?.series;
	const getLabelHolder = () => label;
	const propNames = {
		series: {
			transformAxis: BarChartStylePropNames.TRANSFORM_AXIS,
			smooth: LineChartStylePropNames.SMOOTH
		} as SettingsBarPropNames & SettingsLinePropNames,
		font: {
			family: BarChartStylePropNames.LABEL_FONT_FAMILY,
			size: BarChartStylePropNames.LABEL_FONT_SIZE,
			weight: BarChartStylePropNames.LABEL_FONT_WEIGHT,
			color: BarChartStylePropNames.LABEL_FONT_COLOR,
			style: BarChartStylePropNames.LABEL_FONT_STYLE
		} as SettingsFontPropNames,
		border: {
			width: BarChartStylePropNames.LABEL_BORDER_WIDTH,
			style: BarChartStylePropNames.LABEL_BORDER_STYLE,
			color: BarChartStylePropNames.LABEL_BORDER_COLOR,
			radius: BarChartStylePropNames.LABEL_BORDER_RADIUS
		} as SettingsBorderPropNames,
		alignment: {
			horizontalAlign: BarChartStylePropNames.LABEL_HORIZONTAL_ALIGN,
			verticalAlign: BarChartStylePropNames.LABEL_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
	};

	const onValueChange = () => fire(ReportEditEventTypes.CHART_BAR_STYLE_CHANGED, report);
	const onLabelValueChange = () => fire(ReportEditEventTypes.ECHART_LABEL_CHANGED, report);

	return <TabBodySection>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_BASIC}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BarSettings report={report} chart={chart}
			             getHolder={getSeriesHolder}
			             propNames={propNames.series}
			             onValueChange={onValueChange}/>
			<LineSettings report={report} chart={chart}
			              getHolder={getSeriesHolder}
			              propNames={propNames.series}
			              onValueChange={onValueChange}/>
			<BooleanValue label={Lang.CHART.SERIES_TEXT_SHOW}
			              value={label?.show} defaultValue={true}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: BarChartStylePropNames.LABEL_SHOW,
				              done: onLabelValueChange
			              })}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_VALUE_FORMAT}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BooleanValue label={Lang.CHART.LABEL_FORMAT_USING_GROUP}
			              value={label?.formatUseGrouping} defaultValue={true}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: BarChartStylePropNames.LABEL_FORMAT_USE_GROUPING,
				              done: onLabelValueChange
			              })}/>
			<BooleanValue label={Lang.CHART.LABEL_FORMAT_USING_PERCENTAGE}
			              value={label?.formatUsePercentage} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: BarChartStylePropNames.LABEL_FORMAT_USE_PERCENTAGE,
				              done: onLabelValueChange
			              })}/>
			<BooleanValue label={Lang.CHART.LABEL_VALUE_AS_PERCENTAGE}
			              value={label?.valueAsPercentage} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: BarChartStylePropNames.LABEL_VALUE_AS_PERCENTAGE,
				              done: onLabelValueChange
			              })}/>
			<NumberValue label={Lang.CHART.LABEL_FRACTION_DIGITS} placeholder={'0 - 4'}
			             value={label?.fractionDigits} defaultValue={0}
			             validate={validateNumber(1)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: BarChartStylePropNames.LABEL_FRACTION_DIGITS,
				             done: onLabelValueChange
			             })}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SERIES_TEXT_POSITION}</TabBodySectionTitle>
		<TabBodySectionBody>
			<DropdownValue label={Lang.CHART.POSITION} options={BarLabelPositionOptions}
			               value={label?.position} defaultValue={BarLabelPosition.INSIDE_TOP}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: BarChartStylePropNames.LABEL_POSITION,
				               done: onLabelValueChange
			               })}/>
			<AlignmentSettings report={report} chart={chart}
			                   getHolder={getLabelHolder}
			                   propNames={propNames.alignment}
			                   onValueChange={onLabelValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SERIES_TEXT_FONT}</TabBodySectionTitle>
		<TabBodySectionBody>
			<FontSettings report={report} chart={chart}
			              getHolder={getLabelHolder}
			              propNames={propNames.font}
			              onValueChange={onLabelValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SERIES_TEXT_COLOR}</TabBodySectionTitle>
		<TabBodySectionBody>
			<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
			            value={label?.backgroundColor}
			            onValueChange={onColorChange({
				            report,
				            chart,
				            prop: BarChartStylePropNames.LABEL_BACKGROUND_COLOR,
				            done: onLabelValueChange
			            })}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SERIES_TEXT_BORDER}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BorderSettings report={report} chart={chart}
			                getHolder={getLabelHolder}
			                propNames={propNames.border}
			                onValueChange={onLabelValueChange}/>
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SERIES_TEXT_GAP_AND_PADDING}</TabBodySectionTitle>
		<TabBodySectionBody>
			<NumberValue label={Lang.CHART.LABEL_GAP} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
			             value={label?.gap} defaultValue={15}
			             validate={validateNumber(3)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: BarChartStylePropNames.LABEL_GAP,
				             done: onLabelValueChange
			             })}/>
			<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
			             value={label?.padding} defaultValue={0}
			             validate={validateNumber(4)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: BarChartStylePropNames.LABEL_PADDING,
				             done: onLabelValueChange
			             })}/>
			<NumberValue label={Lang.CHART.LABEL_ROTATE} unitLabel={Lang.CHART.DEGREE} placeholder={'-90 - 90'}
			             value={label?.rotate}
			             validate={isANumberAndInRange(-90, 90)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: BarChartStylePropNames.LABEL_ROTATE,
				             done: onLabelValueChange
			             })}/>
		</TabBodySectionBody>
	</TabBodySection>;
};