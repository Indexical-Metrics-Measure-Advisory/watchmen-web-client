import { ChartType } from '../chart-types';

export interface ChartDef {
	type: ChartType;
	minDimensionCount?: number;
	maxDimensionCount?: number;
	minIndicatorCount?: number;
	maxIndicatorCount?: number;
}