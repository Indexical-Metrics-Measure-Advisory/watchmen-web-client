import {ChartBorder} from '../chart-types';

export interface EChartsBorder extends ChartBorder {
}

export interface EChartsBorderHolder {
	border?: EChartsBorder;
}

export interface EChartsBorderHolderNoRadius {
	border?: Omit<EChartsBorder, 'radius'>;
}
