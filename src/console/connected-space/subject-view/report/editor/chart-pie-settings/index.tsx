import React from 'react';
import {Lang} from '../../../../../../langs';
import {PieLabelAlignTo, PieRoseType} from '../../../../../../services/tuples/chart-def/chart-pie';
import {
	isDoughnutChart,
	isNightingaleChart,
	isPieChart,
	isSunburstChart
} from '../../../../../../services/tuples/chart-utils';
import {Report} from '../../../../../../services/tuples/report-types';
import {
	isANumberAndInRange,
	onBooleanChange,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	validateNumber
} from '../data-utils';
import {AlignmentSettings, SettingsAlignmentPropNames} from '../echarts/alignment';
import {BorderSettings, SettingsBorderPropNames} from '../echarts/border';
import {FontSettings, SettingsFontPropNames} from '../echarts/font';
import {PieSettings, SettingsPiePropNames} from '../echarts/pie';
import {PositionSettings, SettingsPositionPropNames} from '../echarts/position';
import {
	PieChartStylePropNames,
	PieLabelAlignToOptions,
	PieLabelPositionOptions
} from '../prop-defs/chart-styles/pie-chart-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {BooleanValue} from '../settings-widgets/boolean-value';
import {ColorValue} from '../settings-widgets/color-value';
import {DropdownValue} from '../settings-widgets/dropdown-value';
import {NumberValue} from '../settings-widgets/number-value';
import {Section} from '../settings-widgets/section';

export const ChartPieSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isPieChart(chart) && !isDoughnutChart(chart) && !isNightingaleChart(chart) && !isSunburstChart(chart)) {
		return null;
	}

	const settings = chart.settings;
	const label = settings?.label;
	const getSeriesHolder = () => settings?.series;
	const getGridHolder = () => settings?.grid;
	const getLabelHolder = () => label;
	const propNames = {
		series: {
			centerX: PieChartStylePropNames.CENTER_X,
			centerY: PieChartStylePropNames.CENTER_Y,
			insideRadius: PieChartStylePropNames.INSIDE_RADIUS,
			outsideRadius: PieChartStylePropNames.OUTSIDE_RADIUS,
			roseType: PieChartStylePropNames.ROSE_TYPE,
			showPercentage: PieChartStylePropNames.SHOW_PERCENTAGE
		} as SettingsPiePropNames,
		position: {
			top: PieChartStylePropNames.POSITION_TOP,
			right: PieChartStylePropNames.POSITION_RIGHT,
			left: PieChartStylePropNames.POSITION_LEFT,
			bottom: PieChartStylePropNames.POSITION_BOTTOM
		} as SettingsPositionPropNames,
		border: {
			width: PieChartStylePropNames.BORDER_WIDTH,
			style: PieChartStylePropNames.BORDER_STYLE,
			color: PieChartStylePropNames.BORDER_COLOR,
			radius: PieChartStylePropNames.BORDER_RADIUS
		} as SettingsBorderPropNames,
		labelFont: {
			family: PieChartStylePropNames.LABEL_FONT_FAMILY,
			size: PieChartStylePropNames.LABEL_FONT_SIZE,
			weight: PieChartStylePropNames.LABEL_FONT_WEIGHT,
			color: PieChartStylePropNames.LABEL_FONT_COLOR,
			style: PieChartStylePropNames.LABEL_FONT_STYLE
		} as SettingsFontPropNames,
		labelBorder: {
			width: PieChartStylePropNames.LABEL_BORDER_WIDTH,
			style: PieChartStylePropNames.LABEL_BORDER_STYLE,
			color: PieChartStylePropNames.LABEL_BORDER_COLOR,
			radius: PieChartStylePropNames.LABEL_BORDER_RADIUS
		} as SettingsBorderPropNames,
		labelAlignment: {
			horizontalAlign: PieChartStylePropNames.LABEL_HORIZONTAL_ALIGN,
			verticalAlign: PieChartStylePropNames.LABEL_VERTICAL_ALIGN
		} as SettingsAlignmentPropNames
	};

	const onValueChange = () => fire(ReportEditEventTypes.CHART_PIE_STYLE_CHANGED, report);
	const onGridChanged = () => fire(ReportEditEventTypes.ECHART_GRID_CHANGED, report);
	const onLabelValueChange = () => fire(ReportEditEventTypes.ECHART_LABEL_CHANGED, report);

	return <>
		<Section title={Lang.CHART.SECTION_TITLE_PIE_CHART}>
			<PieSettings report={report} chart={chart}
			             getHolder={getSeriesHolder}
			             propNames={propNames.series}
			             defaultRoseType={PieRoseType.NONE}
			             onValueChange={onValueChange}/>
			<BooleanValue label={Lang.CHART.LABEL_FORMAT_USING_GROUP}
			              value={label?.formatUseGrouping} defaultValue={true}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: PieChartStylePropNames.LABEL_FORMAT_USE_GROUPING,
				              done: onLabelValueChange
			              })}/>
			<BooleanValue label={Lang.CHART.LABEL_FORMAT_USING_PERCENTAGE}
			              value={label?.formatUsePercentage} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: PieChartStylePropNames.LABEL_FORMAT_USE_PERCENTAGE,
				              done: onLabelValueChange
			              })}/>
			<BooleanValue label={Lang.CHART.LABEL_VALUE_AS_PERCENTAGE}
			              value={label?.valueAsPercentage} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: PieChartStylePropNames.LABEL_VALUE_AS_PERCENTAGE,
				              done: onLabelValueChange
			              })}/>
			<NumberValue label={Lang.CHART.LABEL_FRACTION_DIGITS} placeholder={'0 - 4'}
			             value={label?.fractionDigits} defaultValue={0}
			             validate={validateNumber(1)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: PieChartStylePropNames.LABEL_FRACTION_DIGITS,
				             done: onLabelValueChange
			             })}/>
			<BorderSettings report={report} chart={chart}
			                getHolder={getSeriesHolder}
			                propNames={propNames.border}
			                onValueChange={onValueChange}/>
		</Section>
		<Section title={Lang.CHART.SECTION_TITLE_ECHART_SERIES_LABEL}>
			<BooleanValue label={Lang.CHART.SHOW}
			              value={label?.show} defaultValue={true}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: PieChartStylePropNames.LABEL_SHOW,
				              done: onLabelValueChange
			              })}/>
			<DropdownValue label={Lang.CHART.POSITION} options={PieLabelPositionOptions}
			               value={label?.position}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: PieChartStylePropNames.LABEL_POSITION,
				               done: onLabelValueChange
			               })}/>
			<DropdownValue label={Lang.CHART.POSITION} options={PieLabelAlignToOptions}
			               value={label?.alignTo} defaultValue={PieLabelAlignTo.NONE}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: PieChartStylePropNames.LABEL_ALIGN_TO,
				               done: onLabelValueChange
			               })}/>
			<AlignmentSettings report={report} chart={chart}
			                   getHolder={getLabelHolder}
			                   propNames={propNames.labelAlignment}
			                   onValueChange={onLabelValueChange}/>
			<FontSettings report={report} chart={chart}
			              getHolder={getLabelHolder}
			              propNames={propNames.labelFont}
			              onValueChange={onLabelValueChange}/>
			<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
			            value={label?.backgroundColor}
			            onValueChange={onColorChange({
				            report,
				            chart,
				            prop: PieChartStylePropNames.LABEL_BACKGROUND_COLOR,
				            done: onLabelValueChange
			            })}/>
			<BorderSettings report={report} chart={chart}
			                getHolder={getLabelHolder}
			                propNames={propNames.labelBorder}
			                onValueChange={onLabelValueChange}/>
			<NumberValue label={Lang.CHART.LABEL_GAP} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 999'}
			             value={label?.gap} defaultValue={15}
			             validate={validateNumber(3)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: PieChartStylePropNames.LABEL_GAP,
				             done: onLabelValueChange
			             })}/>
			<NumberValue label={Lang.CHART.LABEL_ROTATE} unitLabel={Lang.CHART.DEGREE} placeholder={'-90 - 90'}
			             value={label?.rotate}
			             validate={isANumberAndInRange(-90, 90)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: PieChartStylePropNames.LABEL_ROTATE,
				             done: onLabelValueChange
			             })}/>
			<NumberValue label={Lang.CHART.PADDING} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
			             value={label?.padding} defaultValue={0}
			             validate={validateNumber(4)}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: PieChartStylePropNames.LABEL_PADDING,
				             done: onLabelValueChange
			             })}/>
		</Section>
		<Section title={Lang.CHART.SECTION_TITLE_ECHART_GRID}>
			<PositionSettings report={report} chart={chart}
			                  getHolder={getGridHolder}
			                  propNames={propNames.position}
			                  onValueChange={onGridChanged}/>
		</Section>
	</>;
};