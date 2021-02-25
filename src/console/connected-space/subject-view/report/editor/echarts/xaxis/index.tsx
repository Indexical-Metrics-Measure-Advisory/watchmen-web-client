import React from 'react';
import { Lang } from '../../../../../../../langs';
import { canUseXAxis, isEChart } from '../../../../../../../services/tuples/echarts/echarts-utils';
import {
	EChartsXAxisPosition,
	EChartsXAxisType
} from '../../../../../../../services/tuples/echarts/echarts-xaxis-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import {
	AxisTypeOptions,
	EChartXAxisPropNames,
	isANumber,
	onBooleanChange,
	onDropdownValueChange,
	onNumberChange,
	XAxisPositionOptions
} from '../../data-utils';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';
import { useChartType } from '../../settings-effect/use-chart-type';
import { BooleanValue } from '../../settings-widgets/boolean-value';
import { DropdownValue } from '../../settings-widgets/dropdown-value';
import { NumberValue } from '../../settings-widgets/number-value';
import { Section } from '../../settings-widgets/section';
import { EChartsXAxisLabelSettings } from './label';
import { EChartsXAxisMinorSplitLineSettings } from './minor-split-line';
import { EChartsXAxisNameSettings } from './name';
import { EChartsXAxisSplitLineSettings } from './split-line';

export const EChartsXAxisSettings = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();
	useChartType({ report });

	if (!isEChart(chart) || !canUseXAxis(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_XAXIS_CHANGED, report);
	};

	const xaxis = chart.settings?.xaxis;

	return <>
		<Section title={Lang.CHART.SECTION_TITLE_ECHART_XAXIS}>
			<BooleanValue label={Lang.CHART.SHOW}
			              value={xaxis?.show} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartXAxisPropNames.SHOW,
				              done: onValueChange
			              })}/>
			<DropdownValue label={Lang.CHART.POSITION}
			               value={xaxis?.position} defaultValue={EChartsXAxisPosition.BOTTOM}
			               options={XAxisPositionOptions}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: EChartXAxisPropNames.POSITION,
				               done: onValueChange
			               })}/>
			<DropdownValue label={Lang.CHART.AXIS_TYPE}
			               value={xaxis?.type} defaultValue={EChartsXAxisType.CATEGORY}
			               options={AxisTypeOptions}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: EChartXAxisPropNames.TYPE,
				               done: onValueChange
			               })}/>
		</Section>
		<Section title={Lang.CHART.SECTION_TITLE_ECHART_XAXIS_RANGE}>
			<BooleanValue label={Lang.CHART.AXIS_AUTO_MIN}
			              value={xaxis?.autoMin} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartXAxisPropNames.AUTO_MIN,
				              done: onValueChange
			              })}/>
			<NumberValue label={Lang.CHART.AXIS_MIN}
			             value={xaxis?.min}
			             validate={isANumber}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartXAxisPropNames.MIN,
				             done: onValueChange
			             })}/>
			<BooleanValue label={Lang.CHART.AXIS_AUTO_MAX}
			              value={xaxis?.autoMin} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartXAxisPropNames.AUTO_MAX,
				              done: onValueChange
			              })}/>
			<NumberValue label={Lang.CHART.AXIS_MAX}
			             value={xaxis?.min}
			             validate={isANumber}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartXAxisPropNames.MAX,
				             done: onValueChange
			             })}/>
		</Section>
		<EChartsXAxisNameSettings report={report} chart={chart}/>
		<EChartsXAxisLabelSettings report={report} chart={chart}/>
		<EChartsXAxisSplitLineSettings report={report} chart={chart}/>
		<EChartsXAxisMinorSplitLineSettings report={report} chart={chart}/>
	</>;
};