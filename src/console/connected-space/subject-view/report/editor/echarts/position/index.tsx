import React from 'react';
import { Lang } from '../../../../../../../langs';
import { EChartsPositionHolder } from '../../../../../../../services/tuples/echarts/echarts-position-types';
import { EChart } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { EChartTitlePropNames, onNumberChange, validateNumber } from '../../data-utils';
import { NumberValue } from '../../settings-widgets/number-value';

export interface SettingsPositionPropNames {
	top: EChartTitlePropNames.POSITION_TOP;
	right: EChartTitlePropNames.POSITION_RIGHT;
	left: EChartTitlePropNames.POSITION_LEFT;
	bottom: EChartTitlePropNames.POSITION_BOTTOM;
}

export const PositionSettings = (props: {
	report: Report;
	chart: EChart;
	getHolder: (chart: EChart) => EChartsPositionHolder | undefined;
	propNames: SettingsPositionPropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			top: posTopPropName,
			right: posRightPropName,
			left: posLeftPropName,
			bottom: posBottomPropName
		},
		onValueChange
	} = props;

	const holder = getHolder(chart);

	const editors = [
		{ label: Lang.CHART.POSITION_TOP, name: posTopPropName, value: holder?.position?.top },
		{ label: Lang.CHART.POSITION_LEFT, name: posLeftPropName, value: holder?.position?.left },
		{ label: Lang.CHART.POSITION_RIGHT, name: posRightPropName, value: holder?.position?.right },
		{ label: Lang.CHART.POSITION_BOTTOM, name: posBottomPropName, value: holder?.position?.bottom }
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