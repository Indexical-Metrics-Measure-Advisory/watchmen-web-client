import {canUseXAxis, isEChart} from '@/services/data/tuples/echarts/echarts-utils';
import {EChartsXAxisPosition} from '@/services/data/tuples/echarts/echarts-xaxis-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {isANumber, onBooleanChange, onDropdownValueChange, onNumberChange} from '../../data-utils';
import {TabBodySection, TabBodySectionBody, TabBodySectionTitle} from '../../dataset-and-palette/widget';
import {EChartsXAxisPropNames, XAxisPositionOptions} from '../../prop-defs/echart-styles/echarts-xaxis-props';
import {useReportEditEventBus} from '../../report-edit-event-bus';
import {ReportEditEventTypes} from '../../report-edit-event-bus-types';
import {useChartType} from '../../settings-effect/use-chart-type';
import {BooleanValue} from '../../settings-widgets/boolean-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';
import {EChartsXAxisLabelSettings} from './label';
import {EChartsXAxisMinorSplitLineSettings} from './minor-split-line';
import {EChartsXAxisNameSettings} from './name';
import {EChartsXAxisSplitLineSettings} from './split-line';

export const EChartsXAxisSettings = (props: { report: Report }) => {
	const {report} = props;
	const {chart} = report;

	const {fire} = useReportEditEventBus();
	useChartType({report});

	if (!isEChart(chart) || !canUseXAxis(chart)) {
		return null;
	}

	const onValueChange = () => {
		fire(ReportEditEventTypes.ECHART_XAXIS_CHANGED, report);
	};

	const xaxis = chart.settings?.xaxis;

	return <TabBodySection>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_BASIC}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BooleanValue label={Lang.CHART.SHOW}
			              value={xaxis?.show} defaultValue={true}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsXAxisPropNames.SHOW,
				              done: onValueChange
			              })}/>
			<DropdownValue label={Lang.CHART.POSITION}
			               value={xaxis?.position} defaultValue={EChartsXAxisPosition.BOTTOM}
			               options={XAxisPositionOptions}
			               onValueChange={onDropdownValueChange({
				               report,
				               chart,
				               prop: EChartsXAxisPropNames.POSITION,
				               done: onValueChange
			               })}/>
			{/*<DropdownValue label={Lang.CHART.AXIS_TYPE}*/}
			{/*               value={xaxis?.type} defaultValue={EChartsXAxisType.CATEGORY}*/}
			{/*               options={AxisTypeOptions}*/}
			{/*               onValueChange={onDropdownValueChange({*/}
			{/*	               report,*/}
			{/*	               chart,*/}
			{/*	               prop: EChartsXAxisPropNames.TYPE,*/}
			{/*	               done: onValueChange*/}
			{/*               })}/>*/}
		</TabBodySectionBody>
		<TabBodySectionTitle>{Lang.CHART.SECTION_TITLE_ECHART_XAXIS_RANGE}</TabBodySectionTitle>
		<TabBodySectionBody>
			<BooleanValue label={Lang.CHART.AXIS_AUTO_MIN}
			              value={xaxis?.autoMin} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsXAxisPropNames.AUTO_MIN,
				              done: onValueChange
			              })}/>
			<NumberValue label={Lang.CHART.AXIS_MIN}
			             value={xaxis?.min}
			             validate={isANumber}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsXAxisPropNames.MIN,
				             done: onValueChange
			             })}/>
			<BooleanValue label={Lang.CHART.AXIS_AUTO_MAX}
			              value={xaxis?.autoMin} defaultValue={false}
			              onValueChange={onBooleanChange({
				              report,
				              chart,
				              prop: EChartsXAxisPropNames.AUTO_MAX,
				              done: onValueChange
			              })}/>
			<NumberValue label={Lang.CHART.AXIS_MAX}
			             value={xaxis?.min}
			             validate={isANumber}
			             onValueChange={onNumberChange({
				             report,
				             chart,
				             prop: EChartsXAxisPropNames.MAX,
				             done: onValueChange
			             })}/>
		</TabBodySectionBody>
		<EChartsXAxisNameSettings report={report} chart={chart}/>
		<EChartsXAxisLabelSettings report={report} chart={chart}/>
		<EChartsXAxisSplitLineSettings report={report} chart={chart}/>
		<EChartsXAxisMinorSplitLineSettings report={report} chart={chart}/>
	</TabBodySection>;
};