import {ChartTruncation, ChartTruncationType} from '@/services/data/tuples/chart-def/truncation';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {onDropdownValueChange, onNumberChange, validateNumber} from '../../data-utils';
import {
	TruncationChartStylePropNames,
	TruncationTypeOptions
} from '../../prop-defs/chart-styles/truncation-chart-style-props';
import {useChartType} from '../../settings-effect/use-chart-type';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';

export interface SettingsTruncationPropNames {
	type: TruncationChartStylePropNames.TRUNCATION_TYPE;
	count: TruncationChartStylePropNames.TRUNCATION_COUNT;
}

export const TruncationSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => ChartTruncation | undefined;
	propNames: SettingsTruncationPropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			type: typePropName,
			count: countPropName
		},
		onValueChange
	} = props;

	useChartType({report});

	const holder = getHolder(chart);

	return <>
		<DropdownValue label={Lang.CHART.TRUNCATION_TYPE}
		               value={holder?.type} defaultValue={ChartTruncationType.NONE}
		               options={TruncationTypeOptions}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: typePropName,
			               done: onValueChange
		               })}/>
		<NumberValue label={Lang.CHART.TRUNCATION_COUNT} placeholder={'0 - 9999'}
		             value={holder?.count} defaultValue={20}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: countPropName,
			             done: onValueChange
		             })}/>
	</>;
};