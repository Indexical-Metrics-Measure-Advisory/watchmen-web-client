import React from 'react';
import { Lang } from '../../../../../../../langs';
import { EChartsSizeHolder } from '../../../../../../../services/tuples/echarts/echarts-size-types';
import { EChart } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { EChartTitlePropNames, onNumberChange, validateNumber } from '../../data-utils';
import { NumberValue } from '../../settings-widgets/number-value';

// TODO position-bottom is placeholder
export interface SettingsSizePropNames {
	width: EChartTitlePropNames.POSITION_BOTTOM;
	height: EChartTitlePropNames.POSITION_BOTTOM;
}

export const SizeSettings = (props: {
	report: Report;
	chart: EChart;
	getHolder: (chart: EChart) => EChartsSizeHolder | undefined;
	propNames: SettingsSizePropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			width: widthPropName,
			height: heightPropName
		},
		onValueChange
	} = props;

	const holder = getHolder(chart);

	const editors = [
		{ label: Lang.CHART.WIDTH, name: widthPropName, value: holder?.size?.width },
		{ label: Lang.CHART.HEIGHT, name: heightPropName, value: holder?.size?.height }
	];

	return <>
		{editors.map(({ name, label, value }) => {
			return <NumberValue label={label} unitLabel={Lang.CHART.PIXEL} placeholder={'0 - 9999'}
			                    value={value}
			                    validate={validateNumber(4)}
			                    onValueChange={onNumberChange({
				                    report,
				                    chart,
				                    prop: name,
				                    done: onValueChange
			                    })}
			                    key={name}/>;

		})}
	</>;
};