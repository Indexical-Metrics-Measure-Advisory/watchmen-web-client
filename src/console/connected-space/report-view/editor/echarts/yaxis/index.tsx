import {canUseYAxis, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {EChartsYAxisPosition} from '@/services/data/tuples/echarts/echarts-yaxis-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {isANumber, onBooleanChange, onDropdownValueChange, onNumberChange} from '../../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {EChartsYAxisPropNames, YAxisPositionOptions} from '../../prop-defs/echart-styles/echarts-yaxis-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';
import {BooleanValue} from '../../settings-widgets/boolean-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';
import {EChartsYAxisLabelSettings} from './label';
import {EChartsYAxisMinorSplitLineSettings} from './minor-split-line';
import {EChartsYAxisNameSettings} from './name';
import {EChartsYAxisSplitLineSettings} from './split-line';

export const EChartsYAxisSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isEChart(chart) || !canUseYAxis(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_YAXIS_CHANGED, report);
	};

	const yaxis = chart.settings?.yaxis;

	return <TabBodySection>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_BASIC}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BooleanValue label={Lang.CHART.SHOW}
			              value={yaxis?.show} defaultValue={true}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsYAxisPropNames.SHOW,
				              done: onValueChange
			              })}/>
			<DropdownValue label={Lang.CHART.POSITION}
			               value={yaxis?.position} defaultValue={EChartsYAxisPosition.LEFT}
			               options={YAxisPositionOptions}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: EChartsYAxisPropNames.POSITION,
				               done: onValueChange
			               })}/>
			{/*<DropdownValue label={Lang.CHART.AXIS_TYPE}*/}
			{/*               value={yaxis?.type} defaultValue={EChartsYAxisType.VALUE}*/}
			{/*               options={AxisTypeOptions}*/}
			{/*               onValueChange={onDropdownValueChange({*/}
			{/*	               report,*/}
			{/*	               chart,*/}
			{/*	               prop: EChartsYAxisPropNames.TYPE,*/}
			{/*	               done: onValueChange*/}
			{/*               })}/>*/}
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_YAXIS_RANGE}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BooleanValue label={Lang.CHART.AXIS_AUTO_MIN}
			              value={yaxis?.autoMin} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsYAxisPropNames.AUTO_MIN,
				              done: onValueChange
			              })}/>
			<NumberValue label={Lang.CHART.AXIS_MIN}
			             value={yaxis?.min}
			             validate={isANumber}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsYAxisPropNames.MIN,
				             done: onValueChange
			             })}/>
			<BooleanValue label={Lang.CHART.AXIS_AUTO_MAX}
			              value={yaxis?.autoMin} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsYAxisPropNames.AUTO_MAX,
				              done: onValueChange
			              })}/>
			<NumberValue label={Lang.CHART.AXIS_MAX}
			             value={yaxis?.min}
			             validate={isANumber}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsYAxisPropNames.MAX,
				             done: onValueChange
			             })}/>
		</TabBodySectionBody>
		<EChartsYAxisNameSettings report={report} chart={chart}/>
		<EChartsYAxisLabelSettings report={report} chart={chart}/>
		<EChartsYAxisSplitLineSettings report={report} chart={chart}/>
		<EChartsYAxisMinorSplitLineSettings report={report} chart={chart}/>
	</TabBodySection>;
};