import { ChartHelper } from '../../../report/chart-utils';
import { Chart } from '../chart-types';
import { EChart } from './echarts-types';

export const isEChart = (chart: Chart): chart is EChart => {
	return true;
};

export const canHoldTitle = (chart: Chart): boolean => {
	return ChartHelper[chart.type].getDef().canHoldTitle;
};
export const canHoldLegend = (chart: Chart): boolean => {
	return ChartHelper[chart.type].getDef().canHoldLegend;
};
export const canUseGrid = (chart: Chart): boolean => {
	return ChartHelper[chart.type].getDef().canUseGrid;
};
export const canUseXAxis = (chart: Chart): boolean => {
	return ChartHelper[chart.type].getDef().canUseXAxis;
};
