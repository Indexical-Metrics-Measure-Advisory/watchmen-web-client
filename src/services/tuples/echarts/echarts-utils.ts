import { Chart } from '../chart-types';
import { EChart } from './echarts-types';

/**
 * any chart is echart now. 2020/02/25
 */
export const isEChart = (chart: Chart): chart is EChart => {
	return true;
};