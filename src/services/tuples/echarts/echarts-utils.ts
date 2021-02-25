import { ChartHelper } from '../../../report/chart-utils';
import { Chart } from '../chart-types';

export const canHoldTitle = (chart: Chart): boolean => {
	return ChartHelper[chart.type].getDef().canHoldTitle;
};
export const canHoldLegend = (chart: Chart): boolean => {
	return ChartHelper[chart.type].getDef().canHoldLegend;
};