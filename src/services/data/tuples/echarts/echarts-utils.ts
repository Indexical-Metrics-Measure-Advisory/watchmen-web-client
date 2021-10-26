import {ChartHelper} from '@/widgets/report/chart-utils';
import {Chart} from '../chart-types';
import {ECharts} from './echarts-types';

export const isEChart = (chart: Chart): chart is ECharts => {
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
export const canUseYAxis = (chart: Chart): boolean => {
	return ChartHelper[chart.type].getDef().canUseYAxis;
};
export const canUseScript = (chart: Chart): boolean => {
	return ChartHelper[chart.type].getDef().canUseScript;
};
export const canModifyScript = (chart: Chart): boolean => {
	return ChartHelper[chart.type].getDef().canModifyScript;
};